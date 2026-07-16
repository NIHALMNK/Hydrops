export interface FooterSection {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

export interface FooterData {
  description: string;
  sections: FooterSection[];
  copyright: string;
}
