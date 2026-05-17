import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

const collectionToArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
};

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

const emptyMedicalCondition = () => ({
  id: '',
  medical_condition: '',
  treatment: '',
  primary_care_dr_name: '',
  primary_care_dr_phone: '',
});

const emptySibling = () => ({ id: '', sibiling_name: '' });
const emptySafeguard = () => ({ id: '', other_important_safeguards: '' });
const EMPTY_USER = {};

const hasProfileContent = (profile) => {
  if (!profile || Array.isArray(profile)) return false;
  return Object.values(profile).some((value) => clean(String(value ?? '')).length > 0);
};

const makeDraft = (profileUser, fallbackName = '', fallbackEmail = '') => {
  const profile = profileUser?.user_protective_profile || {};
  const medical = collectionToArray(profileUser?.medical_condition);
  const siblings = collectionToArray(profileUser?.sibiling);
  const safeguards = collectionToArray(profileUser?.other_important_safeguards);

  return {
    name: clean(profile.name) || clean(profileUser?.full_name) || fallbackName,
    age: clean(String(profile.age ?? '')),
    email: clean(profileUser?.email) || fallbackEmail,
    phone: clean(profileUser?.phone),
    emergency_person_name: clean(profile.emergency_person_name),
    emergency_person_phone: clean(profile.emergency_person_phone),
    parents_name: clean(profile.parents_name),
    child_name: clean(profile.child_name),
    child_school_name: clean(profile.child_school_name),
    spouse_name: clean(profile.spouse_name),
    school_address: clean(profile.school_address),
    medicalConditions: medical.length ? medical.map((item) => ({
      id: item.id || '',
      medical_condition: clean(item.medical_condition),
      treatment: clean(item.treatment),
      primary_care_dr_name: clean(item.primary_care_dr_name),
      primary_care_dr_phone: clean(item.primary_care_dr_phone),
    })) : [emptyMedicalCondition()],
    siblings: siblings.length ? siblings.map((item) => ({
      id: item.id || '',
      sibiling_name: clean(item.sibiling_name),
    })) : [emptySibling()],
    safeguards: safeguards.length ? safeguards.map((item) => ({
      id: item.id || '',
      other_important_safeguards: clean(item.other_important_safeguards),
    })) : [emptySafeguard()],
  };
};

const getInitials = (name, email) => {
  if (name) {
    const parts = name.trim().split(' ').filter(Boolean);
    return parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }

  return email ? email[0].toUpperCase() : '?';
};

const fallback = (value, empty = 'Not provided') => clean(String(value ?? '')) || empty;

function TextField({ label, value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <label className="profile-form-field">
      <span>{label}{required && <em>*</em>}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <label className="profile-form-field profile-form-field-full">
      <span>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
      />
    </label>
  );
}

function DetailTile({ label, value }) {
  return (
    <div className="profile-info-tile">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const {
    user,
    logout,
    backendUser,
    backendToken,
    backendLoading,
    backendError,
    syncBackend,
  } = useAuth();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [deviceOverview, setDeviceOverview] = useState(null);
  const [deviceLoading, setDeviceLoading] = useState(false);
  const [deviceError, setDeviceError] = useState('');
  const [protectiveUser, setProtectiveUser] = useState(null);
  const [protectiveLoading, setProtectiveLoading] = useState(false);
  const [protectiveError, setProtectiveError] = useState('');
  const [profileEditing, setProfileEditing] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const sourceUser = protectiveUser || backendUser || EMPTY_USER;
  const protectiveProfile = sourceUser?.user_protective_profile || {};
  const profileName = protectiveProfile?.name || sourceUser?.full_name || user?.displayName || 'User';

  useEffect(() => {
    setDisplayName(user?.displayName || backendUser?.full_name || '');
  }, [backendUser?.full_name, user?.displayName]);

  const refreshProtectiveProfile = useCallback(async () => {
    if (!backendToken) {
      setProtectiveUser(null);
      return;
    }

    let response;
    setProtectiveLoading(true);
    setProtectiveError('');

    try {
      response = await apiFetch('/user/protective/profile/view', { token: backendToken });
      setProtectiveUser(response.data);
    } catch (error) {
      setProtectiveError(error.message || 'Unable to load protective profile.');
    } finally {
      setProtectiveLoading(false);
    }
  }, [backendToken]);

  useEffect(() => {
    refreshProtectiveProfile();
  }, [refreshProtectiveProfile]);

  useEffect(() => {
    if (!backendToken) {
      setDeviceOverview(null);
      return;
    }

    let isActive = true;
    setDeviceLoading(true);
    setDeviceError('');

    apiFetch('/user/device-overview', { token: backendToken })
      .then((response) => {
        if (isActive) {
          setDeviceOverview(response.data);
        }
      })
      .catch((error) => {
        if (isActive) {
          setDeviceError(error.message || 'Unable to load devices.');
        }
      })
      .finally(() => {
        if (isActive) {
          setDeviceLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [backendToken]);

  const [profileDraft, setProfileDraft] = useState(() => makeDraft(sourceUser, user?.displayName, user?.email));

  useEffect(() => {
    if (!profileEditing) {
      setProfileDraft(makeDraft(sourceUser, profileName, user?.email));
      setProfilePhotoFile(null);
    }
  }, [profileEditing, profileName, sourceUser, user?.email]);

  useEffect(() => {
    if (!profilePhotoFile) {
      setProfilePhotoPreview('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(profilePhotoFile);
    setProfilePhotoPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePhotoFile]);

  const isPasswordUser = user?.providerData?.some(p => p.providerId === 'password');
  const isGoogleUser = user?.providerData?.some(p => p.providerId === 'google.com');
  const isDefaultProfilePhoto = (url) => {
    if (!url) return true;
    const normalized = url.toLowerCase();
    return normalized.includes('/default_images/')
      || normalized.includes('default_images/')
      || normalized.includes('customer.jpg')
      || normalized.includes('user-profile.png')
      || normalized.includes('profileplaceholder');
  };
  const backendProfilePhoto = sourceUser?.profile_picture || backendUser?.profile_picture;
  const profilePhoto = profilePhotoPreview || (backendProfilePhoto && !isDefaultProfilePhoto(backendProfilePhoto)
    ? backendProfilePhoto
    : user?.photoURL);
  const devices = deviceOverview?.devices || [];
  const metrics = deviceOverview?.metrics || {};
  const medicalConditions = collectionToArray(sourceUser?.medical_condition)
    .filter((item) => clean(item.medical_condition) || clean(item.treatment) || clean(item.primary_care_dr_name));
  const safeguards = collectionToArray(sourceUser?.other_important_safeguards)
    .filter((item) => clean(item.other_important_safeguards));
  const siblings = collectionToArray(sourceUser?.sibiling).filter((item) => clean(item.sibiling_name));
  const hasProtectiveProfile = hasProfileContent(protectiveProfile);
  const linkedDevices = devices.filter((device) => clean(device.ownership?.identifier)).length;
  const activeDevices = metrics.active_devices ?? devices.filter((device) => (
    ['online', 'paired', 'configured'].includes(device.status)
  )).length;
  const registeredDevices = metrics.total_devices ?? devices.length;
  const latestPendantBattery = metrics.latest_pendant_battery || '--';
  const readinessItems = [
    { label: 'Backend synced', done: Boolean(backendToken) },
    { label: 'Protective profile', done: hasProtectiveProfile },
    { label: 'Emergency contact', done: Boolean(clean(protectiveProfile?.emergency_person_name) && clean(protectiveProfile?.emergency_person_phone)) },
    { label: 'Device ownership', done: linkedDevices > 0 },
  ];
  const readinessScore = Math.round((readinessItems.filter((item) => item.done).length / readinessItems.length) * 100);

  const accountCreated = useMemo(() => {
    if (!user?.metadata?.creationTime) {
      return 'N/A';
    }

    return new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [user?.metadata?.creationTime]);

  if (!user) {
    return null;
  }

  const handleSaveName = async () => {
    if (!displayName.trim()) return;
    setSaving(true);
    setMessage('');

    try {
      await updateProfile(user, { displayName: displayName.trim() });
      setMessage('Name updated successfully.');
      setEditing(false);
    } catch {
      setMessage('Failed to update name.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const updateDraft = (field, value) => {
    setProfileDraft((draft) => ({ ...draft, [field]: value }));
  };

  const updateMedical = (index, field, value) => {
    setProfileDraft((draft) => ({
      ...draft,
      medicalConditions: draft.medicalConditions.map((item, itemIndex) => (
        itemIndex === index ? { ...item, [field]: value } : item
      )),
    }));
  };

  const updateSibling = (index, value) => {
    setProfileDraft((draft) => ({
      ...draft,
      siblings: draft.siblings.map((item, itemIndex) => (
        itemIndex === index ? { ...item, sibiling_name: value } : item
      )),
    }));
  };

  const updateSafeguard = (index, value) => {
    setProfileDraft((draft) => ({
      ...draft,
      safeguards: draft.safeguards.map((item, itemIndex) => (
        itemIndex === index ? { ...item, other_important_safeguards: value } : item
      )),
    }));
  };

  const addMedical = () => {
    setProfileDraft((draft) => ({
      ...draft,
      medicalConditions: [...draft.medicalConditions, emptyMedicalCondition()],
    }));
  };

  const addSibling = () => {
    setProfileDraft((draft) => ({ ...draft, siblings: [...draft.siblings, emptySibling()] }));
  };

  const addSafeguard = () => {
    setProfileDraft((draft) => ({ ...draft, safeguards: [...draft.safeguards, emptySafeguard()] }));
  };

  const removeMedical = (index) => {
    setProfileDraft((draft) => ({
      ...draft,
      medicalConditions: draft.medicalConditions.length === 1
        ? [emptyMedicalCondition()]
        : draft.medicalConditions.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const removeSibling = (index) => {
    setProfileDraft((draft) => ({
      ...draft,
      siblings: draft.siblings.length === 1
        ? [emptySibling()]
        : draft.siblings.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const removeSafeguard = (index) => {
    setProfileDraft((draft) => ({
      ...draft,
      safeguards: draft.safeguards.length === 1
        ? [emptySafeguard()]
        : draft.safeguards.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const buildProtectiveForm = () => {
    const formData = new FormData();
    const medicalPayload = profileDraft.medicalConditions
      .filter((item) => clean(item.medical_condition) || clean(item.treatment) || clean(item.primary_care_dr_name) || clean(item.primary_care_dr_phone))
      .map((item) => ({
        id: item.id || undefined,
        medical_condition: clean(item.medical_condition),
        treatment: clean(item.treatment),
        primary_care_dr_name: clean(item.primary_care_dr_name),
        primary_care_dr_phone: clean(item.primary_care_dr_phone),
      }));
    const siblingPayload = profileDraft.siblings
      .filter((item) => clean(item.sibiling_name))
      .map((item) => ({ id: item.id || undefined, sibiling_name: clean(item.sibiling_name) }));
    const safeguardPayload = profileDraft.safeguards
      .filter((item) => clean(item.other_important_safeguards))
      .map((item) => ({
        id: item.id || undefined,
        other_important_safeguards: clean(item.other_important_safeguards),
      }));

    formData.append('name', clean(profileDraft.name));
    formData.append('age', clean(profileDraft.age));
    formData.append('email', clean(profileDraft.email) || user.email || '');
    formData.append('phone', clean(profileDraft.phone));
    formData.append('emergency_person_name', clean(profileDraft.emergency_person_name));
    formData.append('emergency_person_phone', clean(profileDraft.emergency_person_phone));
    formData.append('parents_name', clean(profileDraft.parents_name));
    formData.append('child_name', clean(profileDraft.child_name));
    formData.append('child_school_name', clean(profileDraft.child_school_name));
    formData.append('spouse_name', clean(profileDraft.spouse_name));
    formData.append('school_address', clean(profileDraft.school_address));
    formData.append('medical_condition', JSON.stringify({
      medical_condition: medicalPayload.length ? medicalPayload : [{
        medical_condition: 'No known medical conditions',
        treatment: 'N/A',
        primary_care_dr_name: '',
        primary_care_dr_phone: '',
      }],
    }));
    formData.append('sibiling', siblingPayload.length ? JSON.stringify({ sibiling: siblingPayload }) : '');
    formData.append('other_important_safeguards', JSON.stringify({
      other_important_safeguards: safeguardPayload,
    }));
    if (profilePhotoFile) {
      formData.append('profile_picture', profilePhotoFile);
    }

    return formData;
  };

  const handleSaveProtectiveProfile = async () => {
    if (!backendToken) return;
    setProfileMessage('');

    const requiredFields = [
      ['name', 'Protected person name is required.'],
      ['age', 'Age is required.'],
      ['emergency_person_name', 'Emergency contact name is required.'],
      ['emergency_person_phone', 'Emergency contact phone is required.'],
    ];
    const failed = requiredFields.find(([field]) => !clean(profileDraft[field]));
    if (failed) {
      setProfileMessage(failed[1]);
      return;
    }

    setProfileSaving(true);
    try {
      const response = await apiFetch(
        hasProtectiveProfile ? '/user/protective/profile/update' : '/user/protective/profile/add',
        {
          token: backendToken,
          method: 'POST',
          body: buildProtectiveForm(),
        },
      );

      if (response.status === false) {
        throw new Error(response.message || 'Unable to save protective profile.');
      }

      if (response.data) {
        setProtectiveUser(response.data);
      }
      if (user) {
        await syncBackend(user);
      }
      await refreshProtectiveProfile();
      setProfileEditing(false);
      setProfilePhotoFile(null);
      setProfileMessage('Protective profile updated.');
    } catch (error) {
      setProfileMessage(error.message || 'Unable to save protective profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  const statusTone = (status) => {
    if (['online', 'paired', 'configured'].includes(status)) return 'good';
    if (['offline', 'not_paired', 'not_linked', 'not_configured'].includes(status)) return 'muted';
    return 'warn';
  };

  const visibleMetrics = (device) => (device.metrics || [])
    .filter((metric) => metric.display)
    .slice(0, 4);

  return (
    <div className="profile-page">
      <div className="profile-container profile-container-wide">
        <section className="profile-hero-card">
          <div className="profile-hero-glow" />
          <div className="profile-hero-identity">
            <div className="profile-avatar-xl">
              {profilePhoto ? (
                <img src={profilePhoto} alt="" className="profile-avatar-img" referrerPolicy="no-referrer" />
              ) : (
                <span className="profile-avatar-initials">{getInitials(profileName, user.email)}</span>
              )}
            </div>
            <div className="profile-hero-copy">
              <p className="profile-eyebrow">BlackBird Account</p>
              {editing ? (
                <div className="profile-edit-name">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="profile-name-input"
                    autoFocus
                  />
                  <div className="profile-edit-actions">
                    <button className="btn btn-primary btn-sm" onClick={handleSaveName} disabled={saving}>
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => { setEditing(false); setDisplayName(profileName); }}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="profile-name">{profileName}</h1>
                  <button className="profile-edit-btn" onClick={() => setEditing(true)}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 1.5L12.5 3.5L4 12H2V10L10.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                    Edit name
                  </button>
                </>
              )}
              <p className="profile-email">{sourceUser?.email || backendUser?.email || user.email}</p>
              <div className="profile-hero-badges">
                <span className={`profile-status-pill ${backendToken ? 'good' : 'warn'}`}>
                  <span />
                  {backendLoading ? 'Syncing backend' : backendToken ? 'Backend synced' : 'Backend needs sync'}
                </span>
                <span className={`profile-status-pill ${hasProtectiveProfile ? 'good' : 'muted'}`}>
                  <span />
                  {hasProtectiveProfile ? 'Protective profile active' : 'Profile incomplete'}
                </span>
              </div>
            </div>
          </div>
          <div className="profile-hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                setProfileMessage('');
                setProfileEditing(true);
              }}
              disabled={!backendToken || protectiveLoading}
            >
              {hasProtectiveProfile ? 'Edit Protective Profile' : 'Create Protective Profile'}
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/addresses')}>
              Manage Addresses
            </button>
          </div>
        </section>

        {message && (
          <div className={`profile-message${message.includes('Failed') ? ' error' : ''}`}>{message}</div>
        )}

        {backendError && (
          <div className="profile-message error">Backend account sync needs attention: {backendError}</div>
        )}

        {protectiveError && (
          <div className="profile-message error">Protective profile needs attention: {protectiveError}</div>
        )}

        <div className="profile-dashboard-layout">
          <aside className="profile-side-stack">
            <section className="profile-panel profile-readiness-card">
              <div className="profile-readiness-top">
                <div>
                  <p className="profile-eyebrow">Protection Readiness</p>
                  <h2>{readinessScore}%</h2>
                </div>
                <div className="profile-readiness-ring" style={{ '--score': readinessScore }}>
                  <span>{readinessScore}</span>
                </div>
              </div>
              <div className="profile-readiness-list">
                {readinessItems.map((item) => (
                  <div className="profile-readiness-item" key={item.label}>
                    <span className={item.done ? 'done' : ''} />
                    <strong>{item.label}</strong>
                    <small>{item.done ? 'Ready' : 'Needs attention'}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="profile-panel profile-side-card">
              <p className="profile-eyebrow">Account Details</p>
              <div className="profile-details">
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Email</span>
                  <span className="profile-detail-value">{sourceUser?.email || backendUser?.email || user.email}</span>
                </div>
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Sign-in method</span>
                  <span className="profile-detail-value">
                    {isGoogleUser && (
                      <span className="profile-provider-badge google">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12.72 5.86H12.25V5.84H7V8.17H10.23C9.74 9.52 8.49 10.5 7 10.5C5.07 10.5 3.5 8.93 3.5 7C3.5 5.07 5.07 3.5 7 3.5C7.89 3.5 8.7 3.84 9.32 4.39L10.97 2.74C9.93 1.77 8.54 1.17 7 1.17C3.78 1.17 1.17 3.78 1.17 7C1.17 10.22 3.78 12.83 7 12.83C10.22 12.83 12.83 10.22 12.83 7C12.83 6.61 12.79 6.23 12.72 5.86Z" fill="#FFC107"/><path d="M1.84 4.28L3.76 5.69C4.27 4.41 5.53 3.5 7 3.5C7.89 3.5 8.7 3.84 9.32 4.39L10.97 2.74C9.93 1.77 8.54 1.17 7 1.17C4.76 1.17 2.82 2.43 1.84 4.28Z" fill="#FF3D00"/><path d="M7 12.83C8.51 12.83 9.88 12.26 10.91 11.32L9.11 9.79C8.51 10.25 7.77 10.5 7 10.5C5.53 10.5 4.28 9.53 3.78 8.18L1.81 9.65C2.77 11.54 4.73 12.83 7 12.83Z" fill="#4CAF50"/><path d="M12.72 5.86H12.25V5.83H7V8.17H10.23C10 8.81 9.57 9.38 9.01 9.79L10.91 11.32C10.78 11.43 12.83 9.92 12.83 7C12.83 6.61 12.79 6.23 12.72 5.86Z" fill="#1976D2"/></svg>
                        Google
                      </span>
                    )}
                    {isPasswordUser && <span className="profile-provider-badge email">Email &amp; Password</span>}
                  </span>
                </div>
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Account created</span>
                  <span className="profile-detail-value">{accountCreated}</span>
                </div>
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Backend account</span>
                  <span className="profile-detail-value">
                    <span className={`profile-provider-badge ${backendToken ? 'synced' : 'email'}`}>
                      {backendLoading ? 'Syncing' : backendToken ? 'Synced' : 'Not synced'}
                    </span>
                  </span>
                </div>
              </div>
            </section>

            <section className="profile-panel profile-side-card">
              <p className="profile-eyebrow">Quick Actions</p>
              <div className="profile-quick-actions">
                <button onClick={() => setProfileEditing(true)}>Edit protective profile</button>
                <button onClick={() => navigate('/orders')}>View orders</button>
                <button onClick={() => navigate('/addresses')}>Saved addresses</button>
                <button onClick={() => navigate('/notifications')}>Notification settings</button>
              </div>
            </section>
          </aside>

          <main className="profile-main-stack">
            <section className="profile-panel profile-metrics-panel">
              <div className="profile-section-heading-row">
                <div>
                  <p className="profile-eyebrow">Device Ownership</p>
                  <h2 className="profile-panel-title">Your BlackBird network</h2>
                </div>
                {deviceOverview?.last_updated_at && (
                  <span className="profile-updated-at">Updated {new Date(deviceOverview.last_updated_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
                )}
              </div>

              <div className="profile-metrics-strip">
                <div className="profile-metric-card">
                  <span className="profile-metric-label">Registered</span>
                  <strong>{registeredDevices}</strong>
                  <small>devices connected to this account</small>
                </div>
                <div className="profile-metric-card">
                  <span className="profile-metric-label">Active</span>
                  <strong>{activeDevices ?? '--'}</strong>
                  <small>currently reporting or configured</small>
                </div>
                <div className="profile-metric-card">
                  <span className="profile-metric-label">Pendant Battery</span>
                  <strong>{latestPendantBattery}</strong>
                  <small>latest protective pendant reading</small>
                </div>
              </div>

              {deviceLoading && <div className="profile-device-empty">Loading device ownership from BlackBird...</div>}
              {deviceError && <div className="profile-message error">Unable to load device metrics: {deviceError}</div>}
              {!deviceLoading && !deviceError && !backendToken && (
                <div className="profile-device-empty">Sign in through BlackBird backend sync to see your devices.</div>
              )}

              {!deviceLoading && !deviceError && devices.length > 0 && (
                <div className="profile-device-grid">
                  {devices.map((device) => (
                    <article className="profile-device-card" key={`${device.type}-${device.ownership?.identifier || device.label}`}>
                      <div className="profile-device-topline">
                        <div>
                          <p className="profile-device-type">{device.label}</p>
                          <h3>{device.model}</h3>
                        </div>
                        <span className={`profile-status-pill ${statusTone(device.status)}`}>
                          <span />
                          {device.status_label}
                        </span>
                      </div>

                      <div className="profile-device-id">
                        {device.ownership?.identifier || 'No device identifier linked yet'}
                      </div>

                      <div className="profile-device-metrics">
                        {visibleMetrics(device).map((metric) => (
                          <div className="profile-device-metric" key={`${device.type}-${metric.label}`}>
                            <span>{metric.label}</span>
                            <strong>{metric.display}</strong>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="profile-panel profile-protective-panel">
            <div className="profile-section-heading-row">
              <div>
                  <p className="profile-eyebrow">Protective Profile</p>
                  <h2 className="profile-panel-title">Responder-ready details</h2>
                  <p className="profile-section-subtitle">Medical, emergency, and family details used by BlackBird responders.</p>
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setProfileMessage('');
                  setProfileEditing((value) => !value);
                }}
                disabled={!backendToken || protectiveLoading}
              >
                {profileEditing ? 'Close editor' : hasProtectiveProfile ? 'Edit profile' : 'Create profile'}
              </button>
            </div>

            {profileMessage && (
              <div className={`profile-message${profileMessage.includes('required') || profileMessage.includes('Unable') ? ' error' : ''}`}>
                {profileMessage}
              </div>
            )}

            {protectiveLoading && <div className="profile-device-empty">Loading protective profile...</div>}
            {!protectiveLoading && !backendToken && (
              <div className="profile-device-empty">Backend account sync is required before profile editing is available.</div>
            )}

            {!protectiveLoading && backendToken && !profileEditing && (
              <div className="profile-protective-overview">
                <div className="profile-summary-card">
                  <span className="profile-summary-icon red">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 10.75C12.0711 10.75 13.75 9.07107 13.75 7C13.75 4.92893 12.0711 3.25 10 3.25C7.92893 3.25 6.25 4.92893 6.25 7C6.25 9.07107 7.92893 10.75 10 10.75Z" stroke="currentColor" strokeWidth="1.5"/><path d="M3.75 17C4.5 14.75 6.5 13.5 10 13.5C13.5 13.5 15.5 14.75 16.25 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </span>
                  <div>
                    <p>Protected Person</p>
                    <strong>{fallback(protectiveProfile?.name || profileName)}</strong>
                    <small>{protectiveProfile?.age ? `${protectiveProfile.age} years old` : 'Age not provided'}</small>
                  </div>
                </div>
                <div className="profile-summary-card">
                  <span className="profile-summary-icon gold">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.5 8.5C5.5 5.9 7.45 4 10 4C12.55 4 14.5 5.9 14.5 8.5V11L16 13V14H4V13L5.5 11V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8.5 15.5C9 16.15 11 16.15 11.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </span>
                  <div>
                    <p>Emergency Contact</p>
                    <strong>{fallback(protectiveProfile?.emergency_person_name)}</strong>
                    <small>{fallback(protectiveProfile?.emergency_person_phone, 'Phone not provided')}</small>
                  </div>
                </div>
                <div className="profile-summary-card">
                  <span className="profile-summary-icon blue">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 4H12.5V7.5H16V12.5H12.5V16H7.5V12.5H4V7.5H7.5V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                  </span>
                  <div>
                    <p>Medical Snapshot</p>
                    <strong>{medicalConditions.length || 0}</strong>
                    <small>{medicalConditions.length === 1 ? 'condition on file' : 'conditions on file'}</small>
                  </div>
                </div>
              </div>
            )}

            {!protectiveLoading && backendToken && !profileEditing && (
              <div className="profile-record-grid">
                <div className="profile-record-card">
                  <h3>Medical Snapshot</h3>
                  {medicalConditions.length ? medicalConditions.map((condition) => (
                    <div className="profile-record-item" key={condition.id || `${condition.medical_condition}-${condition.treatment}`}>
                      <strong>{fallback(condition.medical_condition)}</strong>
                      <span>{fallback(condition.treatment, 'No treatment listed')}</span>
                      {(condition.primary_care_dr_name || condition.primary_care_dr_phone) && (
                        <small>{fallback(condition.primary_care_dr_name, 'Primary care')} {condition.primary_care_dr_phone ? `- ${condition.primary_care_dr_phone}` : ''}</small>
                      )}
                    </div>
                  )) : <p className="profile-record-empty">No medical conditions listed.</p>}
                </div>

                <div className="profile-record-card">
                  <h3>Safety Notes</h3>
                  {safeguards.length ? safeguards.map((item) => (
                    <div className="profile-record-item" key={item.id || item.other_important_safeguards}>
                      <span>{item.other_important_safeguards}</span>
                    </div>
                  )) : <p className="profile-record-empty">No safety notes listed.</p>}
                </div>

                <div className="profile-record-card profile-record-card-wide">
                  <h3>Family &amp; Community</h3>
                  <div className="profile-info-grid">
                    <DetailTile label="Parent/guardian" value={fallback(protectiveProfile?.parents_name)} />
                    <DetailTile label="Spouse" value={fallback(protectiveProfile?.spouse_name)} />
                    <DetailTile label="Child" value={fallback(protectiveProfile?.child_name)} />
                    <DetailTile label="School" value={fallback(protectiveProfile?.child_school_name)} />
                    <DetailTile label="School/work location" value={fallback(protectiveProfile?.school_address)} />
                    <DetailTile label="Sibling" value={siblings.length ? siblings.map((item) => item.sibiling_name).join(', ') : 'Not provided'} />
                  </div>
                </div>
              </div>
            )}

            {backendToken && profileEditing && (
              <div className="profile-editor">
                <div className="profile-editor-card">
                  <div className="profile-editor-heading">
                    <div>
                      <h3>Protected Person</h3>
                      <p>Core identity and contact details for the protective link.</p>
                    </div>
                    <label className="profile-photo-edit">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="" referrerPolicy="no-referrer" />
                      ) : (
                        <span>{getInitials(profileDraft.name, profileDraft.email)}</span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => setProfilePhotoFile(event.target.files?.[0] || null)}
                      />
                      <small>Change photo</small>
                    </label>
                  </div>
                  <div className="profile-form-grid">
                    <TextField label="Name" value={profileDraft.name} onChange={(value) => updateDraft('name', value)} placeholder="Protected person's name" required />
                    <TextField label="Age" type="number" value={profileDraft.age} onChange={(value) => updateDraft('age', value)} placeholder="Age" required />
                    <TextField label="Email" type="email" value={profileDraft.email} onChange={(value) => updateDraft('email', value)} placeholder="Email address" />
                    <TextField label="Phone" value={profileDraft.phone} onChange={(value) => updateDraft('phone', value)} placeholder="Phone number" />
                  </div>
                </div>

                <div className="profile-editor-card">
                  <div className="profile-editor-heading">
                    <div>
                      <h3>Emergency Contact</h3>
                      <p>The first person to contact during an emergency event.</p>
                    </div>
                  </div>
                  <div className="profile-form-grid">
                    <TextField label="Contact name" value={profileDraft.emergency_person_name} onChange={(value) => updateDraft('emergency_person_name', value)} placeholder="Maria Cruz" required />
                    <TextField label="Contact phone" value={profileDraft.emergency_person_phone} onChange={(value) => updateDraft('emergency_person_phone', value)} placeholder="+1 555 123 4567" required />
                  </div>
                </div>

                <div className="profile-editor-card">
                  <div className="profile-editor-heading">
                    <div>
                      <h3>Medical Snapshot</h3>
                      <p>Optional medical context responders and trusted contacts should know.</p>
                    </div>
                    <button className="profile-inline-action" onClick={addMedical}>Add condition</button>
                  </div>
                  {profileDraft.medicalConditions.map((condition, index) => (
                    <div className="profile-repeat-group" key={`medical-${condition.id || index}`}>
                      <div className="profile-repeat-heading">
                        <span>Condition {index + 1}</span>
                        <button onClick={() => removeMedical(index)}>Remove</button>
                      </div>
                      <div className="profile-form-grid">
                        <TextField label="Medical condition" value={condition.medical_condition} onChange={(value) => updateMedical(index, 'medical_condition', value)} placeholder="Condition, allergy, or note" />
                        <TextField label="Treatment" value={condition.treatment} onChange={(value) => updateMedical(index, 'treatment', value)} placeholder="Medication or treatment" />
                        <TextField label="Primary care" value={condition.primary_care_dr_name} onChange={(value) => updateMedical(index, 'primary_care_dr_name', value)} placeholder="Doctor name" />
                        <TextField label="Primary care phone" value={condition.primary_care_dr_phone} onChange={(value) => updateMedical(index, 'primary_care_dr_phone', value)} placeholder="Doctor phone" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="profile-editor-card">
                  <div className="profile-editor-heading">
                    <div>
                      <h3>Safety Notes</h3>
                      <p>Important safeguards, routines, or access instructions.</p>
                    </div>
                    <button className="profile-inline-action" onClick={addSafeguard}>Add note</button>
                  </div>
                  {profileDraft.safeguards.map((item, index) => (
                    <div className="profile-repeat-group" key={`safeguard-${item.id || index}`}>
                      <div className="profile-repeat-heading">
                        <span>Safety note {index + 1}</span>
                        <button onClick={() => removeSafeguard(index)}>Remove</button>
                      </div>
                      <TextAreaField
                        label="Note"
                        value={item.other_important_safeguards}
                        onChange={(value) => updateSafeguard(index, value)}
                        placeholder="Anything responders or trusted contacts should know."
                      />
                    </div>
                  ))}
                </div>

                <div className="profile-editor-card">
                  <div className="profile-editor-heading">
                    <div>
                      <h3>Family &amp; Community</h3>
                      <p>Optional people and places that help complete the protective profile.</p>
                    </div>
                    <button className="profile-inline-action" onClick={addSibling}>Add sibling</button>
                  </div>
                  <div className="profile-form-grid">
                    <TextField label="Parent/guardian" value={profileDraft.parents_name} onChange={(value) => updateDraft('parents_name', value)} placeholder="Parent or guardian name" />
                    <TextField label="Spouse" value={profileDraft.spouse_name} onChange={(value) => updateDraft('spouse_name', value)} placeholder="Spouse name" />
                    <TextField label="Child" value={profileDraft.child_name} onChange={(value) => updateDraft('child_name', value)} placeholder="Child name" />
                    <TextField label="Child school" value={profileDraft.child_school_name} onChange={(value) => updateDraft('child_school_name', value)} placeholder="School name" />
                    <TextField label="School/work location" value={profileDraft.school_address} onChange={(value) => updateDraft('school_address', value)} placeholder="Address or location" />
                  </div>
                  <div className="profile-repeat-list">
                    {profileDraft.siblings.map((sibling, index) => (
                      <div className="profile-sibling-row" key={`sibling-${sibling.id || index}`}>
                        <TextField label={`Sibling ${index + 1}`} value={sibling.sibiling_name} onChange={(value) => updateSibling(index, value)} placeholder="Sibling name" />
                        <button onClick={() => removeSibling(index)}>Remove</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="profile-editor-actions">
                  <button className="btn btn-outline" onClick={() => setProfileEditing(false)} disabled={profileSaving}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSaveProtectiveProfile} disabled={profileSaving}>
                    {profileSaving ? 'Saving...' : 'Save protective profile'}
                  </button>
                </div>
              </div>
            )}
            </section>
          </main>
        </div>

        <div className="profile-actions profile-footer-actions">
          <button className="btn btn-outline btn-full" onClick={handleLogout}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.75 2.25H4.5C3.25736 2.25 2.25 3.25736 2.25 4.5V13.5C2.25 14.7426 3.25736 15.75 4.5 15.75H6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11.8125 12.375L15.75 9L11.8125 5.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.75 9H6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
