import { StructureResolver } from 'sanity/structure';

const HOME_TYPES = [
  'homeHero',
  'homeSoulStatement',
  'homePhilosophy',
  'homeJourney',
  'homeProductShowcase',
  'homePurityStatement',
  'homeCraftsmanship',
  'homeEveryday',
  'homeContactCta',
];

const ABOUT_TYPES = [
  'aboutHero',
  'aboutIntroduction',
  'aboutStory',
  'aboutMission',
  'aboutVision',
  'aboutValues',
  'aboutManufacturing',
  'aboutCommitment',
  'aboutWhyHydrops',
  'aboutCompanyInfo',
];

const SINGLETON_TYPES = [
  'brand',
  'business',
  'contact',
  'social',
  'footer',
  'navigation',
  'seoSettings',
];

const BLOG_TYPES = [
  'blogPost',
  'blogCategory',
  'blogAuthor',
  'blogTag',
  'blogSeries',
  'blogSettings',
];

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // 🏢 Business Group
      S.listItem()
        .title('Business')
        .child(
          S.list()
            .title('Business Settings')
            .items([
              S.listItem()
                .title('Brand')
                .id('brandSettings')
                .child(S.document().schemaType('brand').documentId('brand')),
              S.listItem()
                .title('Business Details')
                .id('businessSettings')
                .child(S.document().schemaType('business').documentId('business')),
              S.listItem()
                .title('Contact Information')
                .id('contactSettings')
                .child(S.document().schemaType('contact').documentId('contact')),
              S.listItem()
                .title('Social Links')
                .id('socialSettings')
                .child(S.document().schemaType('social').documentId('social')),
              S.listItem()
                .title('Footer')
                .id('footerSettings')
                .child(S.document().schemaType('footer').documentId('footer')),
            ])
        ),

      // 🌐 Website Group
      S.listItem()
        .title('Website')
        .child(
          S.list()
            .title('Website Configuration')
            .items([
              S.listItem()
                .title('Navigation')
                .id('navigationSettings')
                .child(
                  S.document().schemaType('navigation').documentId('navigation')
                ),
            ])
        ),

      // 🏠 Home Group
      S.listItem()
        .title('Home')
        .child(
          S.list()
            .title('Home')
            .items([
              S.listItem()
                .title('Hero')
                .id('homeHero')
                .child(S.document().schemaType('homeHero').documentId('homeHero')),
              S.listItem()
                .title('Soul Statement')
                .id('homeSoulStatement')
                .child(S.document().schemaType('homeSoulStatement').documentId('homeSoulStatement')),
              S.listItem()
                .title('Philosophy')
                .id('homePhilosophy')
                .child(S.document().schemaType('homePhilosophy').documentId('homePhilosophy')),
              S.listItem()
                .title('Journey')
                .id('homeJourney')
                .child(S.document().schemaType('homeJourney').documentId('homeJourney')),
              S.listItem()
                .title('Product Showcase')
                .id('homeProductShowcase')
                .child(S.document().schemaType('homeProductShowcase').documentId('homeProductShowcase')),
              S.listItem()
                .title('Purity Statement')
                .id('homePurityStatement')
                .child(S.document().schemaType('homePurityStatement').documentId('homePurityStatement')),
              S.listItem()
                .title('Craftsmanship')
                .id('homeCraftsmanship')
                .child(S.document().schemaType('homeCraftsmanship').documentId('homeCraftsmanship')),
              S.listItem()
                .title('Everyday')
                .id('homeEveryday')
                .child(S.document().schemaType('homeEveryday').documentId('homeEveryday')),
              S.listItem()
                .title('Contact CTA')
                .id('homeContactCta')
                .child(S.document().schemaType('homeContactCta').documentId('homeContactCta')),
            ])
        ),

      // 📝 About Group
      S.listItem()
        .title('About')
        .child(
          S.list()
            .title('About')
            .items([
              S.listItem()
                .title('Hero')
                .id('aboutHero')
                .child(S.document().schemaType('aboutHero').documentId('aboutHero')),
              S.listItem()
                .title('Introduction')
                .id('aboutIntroduction')
                .child(S.document().schemaType('aboutIntroduction').documentId('aboutIntroduction')),
              S.listItem()
                .title('Story')
                .id('aboutStory')
                .child(S.document().schemaType('aboutStory').documentId('aboutStory')),
              S.listItem()
                .title('Mission')
                .id('aboutMission')
                .child(S.document().schemaType('aboutMission').documentId('aboutMission')),
              S.listItem()
                .title('Vision')
                .id('aboutVision')
                .child(S.document().schemaType('aboutVision').documentId('aboutVision')),
              S.listItem()
                .title('Values')
                .id('aboutValues')
                .child(S.document().schemaType('aboutValues').documentId('aboutValues')),
              S.listItem()
                .title('Manufacturing')
                .id('aboutManufacturing')
                .child(S.document().schemaType('aboutManufacturing').documentId('aboutManufacturing')),
              S.listItem()
                .title('Commitment')
                .id('aboutCommitment')
                .child(S.document().schemaType('aboutCommitment').documentId('aboutCommitment')),
              S.listItem()
                .title('Why Hydrops')
                .id('aboutWhyHydrops')
                .child(S.document().schemaType('aboutWhyHydrops').documentId('aboutWhyHydrops')),
              S.listItem()
                .title('Company Information')
                .id('aboutCompanyInfo')
                .child(S.document().schemaType('aboutCompanyInfo').documentId('aboutCompanyInfo')),
            ])
        ),

      // 🛍️ Products Group
      S.listItem()
        .title('Products')
        .child(
          S.list()
            .title('Products Management')
            .items([
              S.documentTypeListItem('product').title('Flagship Products'),
              S.divider(),
              S.listItem()
                .title('Settings')
                .child(
                  S.document()
                    .schemaType('productSettings')
                    .documentId('product-settings')
                    .title('Product Settings')
                ),
            ])
        ),

      // 📰 Journal Group
      S.listItem()
        .title('Journal')
        .child(
          S.list()
            .title('Journal')
            .items([
              S.documentTypeListItem('blogPost').title('Articles'),
              S.documentTypeListItem('blogCategory').title('Categories'),
              S.documentTypeListItem('blogAuthor').title('Authors'),
              S.documentTypeListItem('blogTag').title('Tags'),
              S.documentTypeListItem('blogSeries').title('Series'),
              S.divider(),
              S.listItem()
                .title('Settings')
                .child(
                  S.document()
                    .schemaType('blogSettings')
                    .documentId('blog-settings')
                    .title('Journal Settings')
                ),
            ])
        ),

      // ⚙️ SEO Group
      S.listItem()
        .title('SEO')
        .child(
          S.list()
            .title('Global SEO Settings')
            .items([
              S.listItem()
                .title('SEO Defaults')
                .id('seoSettings')
                .child(
                  S.document().schemaType('seoSettings').documentId('seoSettings')
                ),
            ])
        ),

      // Prevent all managed types from appearing in the root list
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            ...SINGLETON_TYPES,
            ...HOME_TYPES,
            ...ABOUT_TYPES,
            ...BLOG_TYPES,
            'product',
            'productSettings',
          ].includes(listItem.getId() as string)
      ),
    ]);
