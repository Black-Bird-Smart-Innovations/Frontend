/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, checkRedirectResult } from '../firebase';
import { setUnauthorizedHandler } from '../lib/api';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://blackbird-backend-hfrticvala-ue.a.run.app';

const AuthContext = createContext();

async function syncWithBackend(firebaseUser) {
  const idToken = await firebaseUser.getIdToken();
  const res = await fetch(`${BACKEND_URL}/api/auth/oauth/firebase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ firebase_token: idToken }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Backend sync failed');
  }

  return res.json();
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendUser, setBackendUser] = useState(null);
  const [backendToken, setBackendToken] = useState(null);
  const [backendLoading, setBackendLoading] = useState(true);
  const [backendError, setBackendError] = useState(null);
  const syncPromiseRef = useRef(null);
  const syncedUserRef = useRef(null);
  const backendTokenRef = useRef(null);
  const backendUserRef = useRef(null);

  const clearBackendSession = useCallback(() => {
    backendTokenRef.current = null;
    backendUserRef.current = null;
    syncedUserRef.current = null;
    setBackendUser(null);
    setBackendToken(null);
    localStorage.removeItem('bb_token');
  }, []);

  const syncBackend = useCallback(async (firebaseUser, options = {}) => {
    if (!firebaseUser) {
      clearBackendSession();
      setBackendLoading(false);
      return null;
    }

    if (!options.force && syncedUserRef.current === firebaseUser.uid && backendTokenRef.current) {
      return {
        data: backendUserRef.current,
        bearer_token: backendTokenRef.current,
      };
    }

    setBackendLoading(true);
    setBackendError(null);

    if (!syncPromiseRef.current) {
      syncPromiseRef.current = syncWithBackend(firebaseUser)
        .then((data) => {
          backendUserRef.current = data.data;
          backendTokenRef.current = data.bearer_token;
          syncedUserRef.current = firebaseUser.uid;
          setBackendUser(data.data);
          setBackendToken(data.bearer_token);
          localStorage.setItem('bb_token', data.bearer_token);
          return data;
        })
        .catch((err) => {
          console.error('Backend sync error:', err);
          clearBackendSession();
          setBackendError(err.message);
          throw err;
        })
        .finally(() => {
          syncPromiseRef.current = null;
          setBackendLoading(false);
        });
    }

    try {
      return await syncPromiseRef.current;
    } catch (err) {
      if (options.throwOnError) {
        throw err;
      }
      return null;
    }
  }, [clearBackendSession]);

  useEffect(() => setUnauthorizedHandler(async () => {
    if (!auth.currentUser) {
      clearBackendSession();
      return null;
    }

    const data = await syncBackend(auth.currentUser, { force: true, throwOnError: true });
    return data?.bearer_token || null;
  }), [clearBackendSession, syncBackend]);

  // Handle redirect result on page load (for OAuth redirect fallback)
  useEffect(() => {
    checkRedirectResult().then((result) => {
      if (result?.user) {
        syncBackend(result.user);
      }
    });
  }, [syncBackend]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        syncBackend(firebaseUser);
      } else {
        clearBackendSession();
        setBackendLoading(false);
      }
    });
    return unsubscribe;
  }, [clearBackendSession, syncBackend]);

  const logout = async () => {
    await signOut(auth);
    clearBackendSession();
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      backendUser,
      backendToken,
      backendLoading,
      backendError,
      syncBackend,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
