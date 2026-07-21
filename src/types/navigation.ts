export interface NavItem {
  name: string;
  href: string;
  isExternal?: boolean;
  /** When true the item is rendered as the primary CTA (e.g. Enquire). */
  isCta?: boolean;
}

export interface NavigationMenu {
  main: NavItem[];
  footer: Record<string, NavItem[]>;
}
