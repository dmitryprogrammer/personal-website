export interface NavigationItem {
  path: string;
  labelKey: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {path: "/", labelKey: "home"},
  {path: "/blog", labelKey: "blog"},
  {path: "/contacts", labelKey: "contacts"},
];
