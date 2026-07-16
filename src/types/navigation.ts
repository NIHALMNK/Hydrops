export interface NavItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

export interface NavigationMenu {
  main: NavItem[];
  footer: Record<string, NavItem[]>;
}
