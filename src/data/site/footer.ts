import { ROUTES } from '@/constants/routes';
import type { FooterDocument } from '@/types';

export const footerData: FooterDocument = {
  _id: 'site-footer',
  _type: 'footer',
  tagline: 'Premium, double-filtered coconut oil. Crafted with care. Trusted by families across India.',
  socialLabelTemplate: 'Hydrops on {platform}',
  labels: { contact: 'Contact', hours: 'Hours', maps: 'Open in Maps', legalLinks: 'Legal links', emailUnavailable: 'Email coming soon' },
  contact: { phone: '7012123505', whatsapp: '7012123505', email: null },
  address: { company: 'Calicut Trading Company', street: 'Housing Colony Road', city: 'Perinthalmanna', state: 'Malappuram, Kerala', postalCode: '629322', country: 'India', mapsUrl: 'https://maps.app.goo.gl/1YmUeEqpdqK7J5sN6' },
  workingHours: { weekdays: 'Monday – Saturday', hours: '7:00 AM – 5:00 PM', closedDay: 'Sunday', closedLabel: 'Closed' },
  legalLinks: [{ label: 'Privacy Policy', href: ROUTES.PRIVACY_POLICY }, { label: 'Terms of Service', href: ROUTES.TERMS }],
  copyright: `© ${new Date().getFullYear()} Hydrops. All rights reserved.`,
};
