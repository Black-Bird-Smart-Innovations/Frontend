// The Black Bird Collection, shown to everyone (signed in or not).
// Ids match the backend's resources/data/shop_products.json so a waitlist sign-up
// (POST /api/shop/waitlist) is accepted for the same product.
//
// action:
//   'quote'    - not sold online to everyone yet: "Email us for a quote" + "Join the waitlist"
//   'waitlist' - not available yet: "Join the waitlist"
// Keep every line here true. No ratings, counts or certifications.

export const SHOP_EMAIL = 'blackbird_tech@yahoo.com';
export const SHOP_PHONE = '917-977-0949';

export const COLLECTION = [
  {
    id: 'security',
    name: 'Black Bird Security Systems',
    description: 'Protection and peace of mind for your home.',
    image: '/images/collection/security.png',
    action: 'waitlist',
    highlights: [],
  },
  {
    id: 'buttons',
    name: 'Black Bird Buttons',
    description: 'Protective Button: emergency information, close at hand.',
    image: '/images/Button.PNG',
    action: 'quote',
    highlights: [
      'Opens your emergency information when someone taps it with a phone or scans it',
      'Links to the Medical ID you keep up to date in the Black Bird app',
      'Discreet design that goes with everyday clothes',
    ],
  },
  {
    id: 'watches',
    name: 'Black Bird Watches',
    description: 'S5 and X5 bands for connected everyday care.',
    image: '/images/products/x5-wristband.png',
    action: 'quote',
    highlights: [
      'Fall detection that alerts your Care Team',
      'SOS button on the band',
      'Health readings in the Black Bird app',
      'Pairs with iPhone and Android over Bluetooth. Keep your phone nearby for fall alerts.',
    ],
  },
  {
    id: 'pendant',
    name: 'Black Bird Watch-to-Pendant',
    description: 'V45: a watch that converts into a pendant.',
    image: '/images/products/pendant-v45.png',
    action: 'quote',
    highlights: [
      'LTE cellular with a Nano SIM',
      'GPS location',
      'SOS button and touchscreen',
      'Works with SpeedTalk (T-Mobile network)',
    ],
  },
  {
    id: 'stuffies',
    name: 'Black Bird Stuffies',
    description: 'Comforting plush friends, including the Black Bird plush bird.',
    image: '/images/plush-gigapixel-standard v2-2x.jpeg',
    action: 'waitlist',
    highlights: ['Soft and cuddly', 'Kid friendly'],
  },
  {
    id: 'bags',
    name: 'Black Bird Book Bags',
    description: 'Everyday essentials, thoughtfully carried.',
    image: '/images/collection/bags.png',
    action: 'waitlist',
    highlights: [],
  },
  {
    id: 'more',
    name: 'More coming soon',
    description: 'Be first to hear about the next Black Bird collection.',
    image: '/images/collection/more.png',
    action: 'waitlist',
    highlights: [],
  },
];

export function findCollectionItem(id) {
  return COLLECTION.find((item) => item.id === id) || null;
}

export function quoteMailto(itemName) {
  const subject = encodeURIComponent(`Quote request: ${itemName}`);
  const body = encodeURIComponent(`Hello Black Bird,\n\nI'd like a quote for: ${itemName}\n\nName:\nPhone:\nCity and state:\n`);
  return `mailto:${SHOP_EMAIL}?subject=${subject}&body=${body}`;
}

export function waitlistMailto(itemName, contact = '') {
  const subject = encodeURIComponent(`Waitlist: ${itemName}`);
  const body = encodeURIComponent(`Hello Black Bird,\n\nPlease add me to the waitlist for: ${itemName}\n\nHow to reach me: ${contact}\n`);
  return `mailto:${SHOP_EMAIL}?subject=${subject}&body=${body}`;
}
