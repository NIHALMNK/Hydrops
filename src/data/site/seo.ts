import type { SeoDocument } from '@/types';

const logo = { src: '/images/brand/logo.png', alt: 'Hydrops', width: 800, height: 600 };

export const siteSeo: SeoDocument = {
  _id: 'site-seo', _type: 'seoPage', title: 'Hydrops — Pure Coconut Oil · India', description: 'Hydrops delivers crystal-clear, double-filtered virgin coconut oil crafted with precision in India. Naturally pure. Carefully refined.', keywords: ['coconut oil', 'virgin coconut oil', 'pure coconut oil', 'Hydrops', 'India'], openGraphImage: logo, twitterImage: logo,
};

export const aboutSeo: SeoDocument = {
  _id: 'about-seo', _type: 'seoPage', title: 'About Us — Hydrops', description: 'Discover the story of Hydrops. A company built around a single belief — that purity is never an accident. Double-filtered virgin coconut oil from the finest Indian coconuts.', keywords: siteSeo.keywords, openGraphImage: { src: '/images/brand/philosophy-coconut.png', alt: 'Coconuts from Kerala, the source of Hydrops pure coconut oil', width: 1200, height: 1600 }, twitterImage: logo,
};

export const productsSeo: SeoDocument = {
  _id: 'products-seo', _type: 'seoPage', title: 'Products — Hydrops', description: 'Explore the Hydrops range of pure, double-filtered coconut oil products — crafted for purity and everyday use.', keywords: siteSeo.keywords, openGraphImage: logo, twitterImage: logo,
};

export const contactSeo: SeoDocument = {
  _id: 'contact-seo', _type: 'seoPage', title: 'Contact — Hydrops', description: 'Get in touch with Hydrops. Enquire about our pure coconut oil products, wholesale orders, or any questions you may have.', keywords: siteSeo.keywords, openGraphImage: logo, twitterImage: logo,
};

export const blogSeo: SeoDocument & { robots?: { index: boolean; follow: boolean } } = {
  _id: 'blog-seo', 
  _type: 'seoPage', 
  title: 'Blog | Hydrops Pure Coconut Oil', 
  description: 'Discover product stories, wellness articles, recipes, and behind-the-scenes updates from Hydrops.', 
  keywords: siteSeo.keywords, 
  openGraphImage: logo, 
  twitterImage: logo,
  robots: { index: true, follow: true }
};
