import { ROUTES } from './routes';

export const MAIN_NAVIGATION = [
  { name: 'Home',    href: ROUTES.HOME },
  { name: 'About',   href: ROUTES.ABOUT },
  { name: 'Products', href: ROUTES.PRODUCTS },
  { name: 'Contact', href: ROUTES.CONTACT },
  { name: 'Enquire', href: ROUTES.CONTACT, isCta: true },
];

export const FOOTER_NAVIGATION = {
  legal: [
    { name: 'Privacy Policy', href: ROUTES.PRIVACY_POLICY },
    { name: 'Terms of Service', href: ROUTES.TERMS },
  ],
  company: [
    { name: 'About Us', href: ROUTES.ABOUT },
    { name: 'Contact', href: ROUTES.CONTACT },
  ],
};
