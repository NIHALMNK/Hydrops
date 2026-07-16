import { FooterData } from '@/types';
import { ROUTES } from '@/constants/routes';
import { companyData } from './company';

export const footerData: FooterData = {
  description: companyData.description,
  sections: [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: ROUTES.ABOUT },
        { name: 'Contact', href: ROUTES.CONTACT },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: ROUTES.PRIVACY_POLICY },
        { name: 'Terms of Service', href: ROUTES.TERMS },
      ]
    }
  ],
  copyright: `© ${new Date().getFullYear()} ${companyData.legalName}. All rights reserved.`
};
