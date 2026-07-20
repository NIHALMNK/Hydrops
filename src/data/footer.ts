import { FooterData } from '@/types';
import { ROUTES } from '@/constants/routes';

export const footerData: FooterData = {
  tagline:
    'Premium, double-filtered coconut oil. Crafted with care. Trusted by families across India.',

  contact: {
    phone: '7012123505',
    whatsapp: '7012123505',
    /**
     * Set to a valid email address when one is available.
     * null → the component will render an appropriate placeholder.
     */
    email: null,
  },

  address: {
    company: 'Calicut Trading Company',
    street: 'Housing Colony Road',
    city: 'Perinthalmanna',
    state: 'Malappuram, Kerala',
    postalCode: '629322',
    country: 'India',
    mapsUrl: 'https://maps.app.goo.gl/1YmUeEqpdqK7J5sN6',
  },

  workingHours: {
    weekdays: 'Monday – Saturday',
    hours: '7:00 AM – 5:00 PM',
    closedDay: 'Sunday',
    closedLabel: 'Closed',
  },

  legalLinks: [
    { name: 'Privacy Policy', href: ROUTES.PRIVACY_POLICY },
    { name: 'Terms of Service', href: ROUTES.TERMS },
  ],

  copyright: `© ${new Date().getFullYear()} Hydrops India. All rights reserved.`,
};
