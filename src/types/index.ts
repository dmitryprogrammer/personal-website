export interface SocialMediaItem {
  icon: string;
  title: string;
  href: string;
}

export interface ContentTextProps {
  title?: string;
  description?: string;
}

export interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
}

export interface NavMenuProps {
  activeItem?: string;
}

export interface LanguageSwitcherProps {
  className?: string;
}
