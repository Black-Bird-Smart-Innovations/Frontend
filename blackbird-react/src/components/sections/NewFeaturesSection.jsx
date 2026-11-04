import '../../css/new-features.css';

// "New in Black Bird": features that are built and coming with the next app update.
// Plain words, and only what the apps really do. No monitoring center, response times or certifications.

const icon = (children) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const ICONS = {
  sos: icon(<><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12.5M12 16H12.01" /></>),
  family: icon(<><circle cx="9" cy="8" r="3" /><path d="M3.5 19C4.2 15.8 6.3 14 9 14C11.7 14 13.8 15.8 14.5 19" /><circle cx="17" cy="9" r="2.3" /><path d="M16 14.2C18.4 14.4 20 16 20.5 18.5" /></>),
  phone: icon(<path d="M5 4H9L11 9L8.5 10.5C9.6 12.8 11.2 14.4 13.5 15.5L15 13L20 15V19C20 19.6 19.6 20 19 20C10.7 20 4 13.3 4 5C4 4.4 4.4 4 5 4Z" />),
  fall: icon(<><circle cx="14" cy="5" r="2" /><path d="M12.5 9L8 12L10 15L7 20M12.5 9L16 12.5L19 12M10 15H14L16 20" /></>),
  voice: icon(<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11C5.5 14.6 8.4 17.5 12 17.5C15.6 17.5 18.5 14.6 18.5 11M12 17.5V21" /></>),
  portal: icon(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M12 9V15M9 12H15" /></>),
  id: icon(<><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2.2" /><path d="M5.8 16C6.4 14.6 7.6 14 9 14C10.4 14 11.6 14.6 12.2 16M14.5 10H18M14.5 13.5H17" /></>),
  link: icon(<><path d="M10 14L14 10" /><path d="M8.5 11.5L6.8 13.2C5.3 14.7 5.3 17.2 6.8 18.7C8.3 20.2 10.8 20.2 12.3 18.7L14 17" /><path d="M15.5 12.5L17.2 10.8C18.7 9.3 18.7 6.8 17.2 5.3C15.7 3.8 13.2 3.8 11.7 5.3L10 7" /></>),
  pill: icon(<><rect x="3.5" y="9" width="17" height="6.5" rx="3.25" transform="rotate(-35 12 12.25)" /><path d="M9.5 8.3L14.5 15.4" /></>),
  checkin: icon(<><path d="M12 20C12 20 4 15.2 4 9.5C4 7 6 5 8.4 5C10 5 11.3 5.8 12 7C12.7 5.8 14 5 15.6 5C18 5 20 7 20 9.5C20 15.2 12 20 12 20Z" /></>),
  checklist: icon(<><path d="M9 6H20M9 12H20M9 18H20" /><path d="M4 6L5 7L7 5M4 12L5 13L7 11M4 18L5 19L7 17" /></>),
  settings: icon(<><path d="M20 14.5C19 17.8 15.9 20 12.5 20C8.4 20 5 16.6 5 12.5C5 9.1 7.2 6 10.5 5C9.9 6 9.5 7.2 9.5 8.5C9.5 12.4 12.6 15.5 16.5 15.5C17.8 15.5 19 15.1 20 14.5Z" /></>),
  ping: icon(<><circle cx="12" cy="12" r="2" /><path d="M8.5 8.5C6.6 10.4 6.6 13.6 8.5 15.5M15.5 8.5C17.4 10.4 17.4 13.6 15.5 15.5M5.6 5.6C2.1 9.1 2.1 14.9 5.6 18.4M18.4 5.6C21.9 9.1 21.9 14.9 18.4 18.4" /></>),
  globe: icon(<><circle cx="12" cy="12" r="9" /><path d="M3 12H21M12 3C14.5 5.5 15.5 8.7 15.5 12C15.5 15.3 14.5 18.5 12 21C9.5 18.5 8.5 15.3 8.5 12C8.5 8.7 9.5 5.5 12 3Z" /></>),
};

const GROUPS = [
  {
    title: 'When you need help',
    items: [
      {
        icon: 'sos',
        title: 'SOS that always goes out',
        text: "Your SOS is sent even when GPS is weak, with your last known location and how long ago it was found. With no signal, it keeps trying, and the screen tells you clearly if it was not sent, with a Call 911 button.",
      },
      {
        icon: 'family',
        title: 'Help is on the way',
        text: "Family can tap \"I'm on my way\", and you see who is coming. Tap \"I'm safe\" when you're OK and everyone is told.",
      },
      {
        icon: 'phone',
        title: 'If nobody answers',
        text: 'If no one responds within a few minutes, Black Bird alerts everyone again, then phones your emergency contacts one at a time.',
      },
      {
        icon: 'fall',
        title: 'Fall countdown you can see and hear',
        text: "After a hard fall, a full-screen countdown with a loud alarm starts. Tap the big \"I'm OK\" button to cancel, or let it alert your Care Team.",
      },
      {
        icon: 'voice',
        title: 'Hands-free SOS',
        text: 'Start an SOS with Siri, the iPhone Action button or Control Center, or from Android Quick Settings and a Home screen widget.',
      },
    ],
  },
  {
    title: 'For EMS and hospital staff',
    items: [
      {
        icon: 'portal',
        title: 'Medical Professional Portal',
        text: 'EMS and hospital staff with a professional access code see what you chose to share: allergies, medicines, conditions, who to call and recent alerts. You can hide parts, like your live location.',
      },
      {
        icon: 'id',
        title: 'Medical ID and medical QR',
        text: 'See who opened your Medical ID and when. Lock it any time, or replace the QR code if a card is lost.',
      },
      {
        icon: 'link',
        title: 'One-time hospital summary',
        text: 'Send the hospital a printable summary through a one-time link that expires after it is used.',
      },
    ],
  },
  {
    title: 'Every day',
    items: [
      {
        icon: 'pill',
        title: 'Medicine reminders',
        text: 'Answer each reminder with Took it, Snooze or Skip. If a dose is missed, your family can be told.',
      },
      {
        icon: 'checkin',
        title: 'Daily check-ins',
        text: 'Tell your family how you feel each day. If you pick chest pain or trouble breathing, Black Bird suggests calling 911 right away.',
      },
      {
        icon: 'checklist',
        title: 'Setup checklist and test alerts',
        text: 'A checklist shows what is left to set up. Send a test alert, clearly marked TEST, so everyone knows what a real one looks like.',
      },
    ],
  },
  {
    title: 'For family and helpers',
    items: [
      {
        icon: 'settings',
        title: 'Family alert settings',
        text: 'Each family member can set quiet hours and get check-ins as a daily summary. SOS and fall alerts always come through. You choose what each person can see.',
      },
      {
        icon: 'ping',
        title: 'Nearby Ping',
        text: 'Send a quick ping to Black Bird helpers within 5 ft of you who have turned on Nearby Ping. You see when someone has received it.',
      },
      {
        icon: 'globe',
        title: '47 languages',
        text: 'Use the Black Bird app in 47 languages on iPhone and Android.',
      },
    ],
  },
];

export default function NewFeaturesSection() {
  return (
    <section className="nf-section" id="new-features">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">New in Black Bird</span>
          <h2 className="section-title">Coming in the next app update</h2>
          <p className="section-description">
            These features are built and on their way to iPhone and Android with the next update of the Black Bird app.
          </p>
        </div>

        {GROUPS.map((group) => (
          <div className="nf-group" key={group.title}>
            <h3 className="nf-group-title">{group.title}</h3>
            <div className="nf-grid">
              {group.items.map((item) => (
                <div className="feature-card nf-card" key={item.title}>
                  <div className="feature-icon nf-icon">{ICONS[item.icon]}</div>
                  <h4 className="feature-title nf-title">{item.title}</h4>
                  <p className="feature-description">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="nf-note" role="note">
          <strong>Good to know</strong>
          <p>
            Black Bird alerts the people you choose. It is not a monitoring center and it does not call 911 for you.
            In a life-threatening emergency, call 911. The app has a one-tap Call 911 button.
          </p>
        </div>
      </div>
    </section>
  );
}
