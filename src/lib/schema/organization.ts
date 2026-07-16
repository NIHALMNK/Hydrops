import { companyData } from '@/data/company';
import { siteConfig } from '@/constants/site';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyData.name,
    legalName: companyData.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    foundingDate: companyData.foundingYear.toString(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyData.contact.phone,
      contactType: 'customer service',
      email: companyData.contact.email,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyData.contact.address.street,
      addressLocality: companyData.contact.address.city,
      addressRegion: companyData.contact.address.state,
      postalCode: companyData.contact.address.postalCode,
      addressCountry: companyData.contact.address.country,
    }
  };
}
