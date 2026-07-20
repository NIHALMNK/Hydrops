export interface FooterAddress {
  company: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  mapsUrl: string;
}

export interface FooterWorkingHours {
  weekdays: string;   // e.g. "Monday – Saturday"
  hours: string;      // e.g. "7:00 AM – 5:00 PM"
  closedDay: string;  // e.g. "Sunday"
  closedLabel: string;
}

export interface FooterNavLink {
  name: string;
  href: string;
}

export interface FooterData {
  /** Short brand tagline displayed below the wordmark */
  tagline: string;
  /** Contact details */
  contact: {
    phone: string;
    whatsapp: string;
    /** Set to null or empty string to show placeholder */
    email: string | null;
  };
  address: FooterAddress;
  workingHours: FooterWorkingHours;
  /** Legal navigation links shown in the bottom bar */
  legalLinks: FooterNavLink[];
  /** Copyright line */
  copyright: string;
}
