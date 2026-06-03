import "./social-media.scss";
import {LinkedinIcon} from "./icons/LinkedinIcon";
import {MailIcon} from "./icons/MailIcon";
import {TelegramIcon} from "./icons/TelegramIcon";

interface SocialMedia {
  icon: React.FC;
  title: string;
  href: string;
}

const SOCIAL_MEDIA: SocialMedia[] = [
  {
    icon: LinkedinIcon,
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/dmitryprogrammer/",
  },
  {
    icon: MailIcon,
    title: "Mail",
    href: "mailto:dpischalka@gmail.com",
  },
  {
    icon: TelegramIcon,
    title: "Telegram",
    href: "https://t.me/dmitryprogrammer",
  },
];

export const SocialMedia = () => (
  <ul className="social-media">
    {SOCIAL_MEDIA.map((media) => (
      <li key={media.title}>
        <a
          href={media.href}
          target={media.href.startsWith("http") ? "_blank" : undefined}
          rel={
            media.href.startsWith("http") ? "noopener noreferrer" : undefined
          }
          className="social-media__item"
        >
          <media.icon />
          <span className="social-media__title">{media.title}</span>
        </a>
      </li>
    ))}
  </ul>
);
