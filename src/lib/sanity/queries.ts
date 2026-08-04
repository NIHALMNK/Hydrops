import { cloudinaryImageFragment, buttonFragment, headingBlockFragment } from './fragments';

export const HOME_PAGE_QUERY = `
  *[_type == "homePage"][0] {
    ...,
    hero {
      ...,
      primaryCta { ${buttonFragment} },
      secondaryCta { ${buttonFragment} }
    },
    soulStatement {
      ...,
      background { ${cloudinaryImageFragment} }
    },
    philosophy {
      ...,
      chapters[] {
        ...
      },
      cta { ${buttonFragment} }
    },
    journey {
      ...,
      ambientImage { ${cloudinaryImageFragment} },
      stages[] {
        ...,
        image { ${cloudinaryImageFragment} }
      }
    },
    productShowcase {
      ...,
      productImage { ${cloudinaryImageFragment} },
      floatingAsset { ${cloudinaryImageFragment} },
      primaryCta { ${buttonFragment} },
      secondaryCta { ${buttonFragment} }
    },
    purityStatement {
      ...
    },
    craftsmanship {
      ...,
      heading { ${headingBlockFragment} },
      steps[] {
        ...,
        image { ${cloudinaryImageFragment} }
      }
    },
    everyday {
      ...,
      heading { ${headingBlockFragment} },
      moments[] {
        ...,
        image { ${cloudinaryImageFragment} }
      }
    },
    contactCta {
      ...,
      primaryCta { ${buttonFragment} },
      secondaryCta { ${buttonFragment} },
      backgroundImage { ${cloudinaryImageFragment} }
    }
  }
`;
