import { companyData } from '@/data/site/company';
import { siteConfig } from '@/constants/site';
import { socialData } from '@/data/site/social';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: companyData.name,
    legalName: companyData.legalName,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/brand/logo.png`,
      width: 1200,
      height: 630,
    },
    foundingDate: companyData.foundingYear.toString(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyData.contact.phone,
      contactType: 'customer service',
      email: companyData.contact.email,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'ml'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyData.contact.address.street,
      addressLocality: companyData.contact.address.city,
      addressRegion: companyData.contact.address.state,
      postalCode: companyData.contact.address.postalCode,
      addressCountry: companyData.contact.address.country,
    },
    sameAs: socialData.map((s) => s.url),
  };
}

