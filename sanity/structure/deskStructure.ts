import { StructureResolver } from 'sanity/structure';

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

      // 📄 Pages Group
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .id('homePage')
                .child(S.document().schemaType('homePage').documentId('homePage')),
            ])
        ),

      // 🛍️ Products Group
      S.documentTypeListItem('product').title('Products'),

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

      // Filter out singletons and objects from the root list
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'brand',
            'business',
            'contact',
            'social',
            'footer',
            'navigation',
            'homePage',
            'seoSettings',
            'product',
          ].includes(listItem.getId() as string)
      ),
    ]);
