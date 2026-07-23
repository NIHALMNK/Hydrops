import { ROUTES } from '@/constants/routes';
import type { NavigationDocument } from '@/types';

export const navigationData: NavigationDocument = {
  _id: 'primary-navigation',
  _type: 'navigation',
  ariaLabel: 'Primary navigation',
  homeLabel: 'Hydrops — Home',
  brandLogo: { src: '/images/brand/logo.png', alt: 'Hydrops', width: 140, height: 46 },
  items: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'About', href: ROUTES.ABOUT },
    { label: 'Products', href: ROUTES.PRODUCTS },
    { label: 'Contact', href: ROUTES.CONTACT },
    { label: 'Enquire', href: ROUTES.CONTACT, isCta: true },
  ],
  openMenuLabel: 'Open navigation',
  closeMenuLabel: 'Close navigation',
  mobileMenuLabel: 'Mobile navigation',
};
