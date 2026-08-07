import type { CompanyDocument } from '@/types';

export const companyData: CompanyDocument = {
  _id: 'company',
  _type: 'company',
  name: 'Hydrops',
  displayName: 'Hydrops Coconut Oil',
  countryLabel: 'Pure Coconut Oil · India',
  legalName: 'Hydrops India Pvt. Ltd.',
  description: 'Hydrops delivers crystal-clear, double-filtered virgin coconut oil crafted with precision in India. Naturally pure. Carefully refined.',
  url: 'https://hydropsindia.com',
  foundingYear: 2024,
  contact: {
    email: 'hydropsindia@gmail.com',
    phone: '+91 7012123505',
    address: {
      street: 'Housing Colony Road',
      city: 'Perinthalmanna',
      state: 'Malappuram, Kerala',
      postalCode: '679322',
      country: 'India',
    },
  },
};

