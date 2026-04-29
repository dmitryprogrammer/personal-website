import "./social-media.scss";

interface SocialMedia {
  icon: string;
  title: string;
  href: string;
}

const SOCIAL_MEDIA: SocialMedia[] = [
  {
    icon: "/src/assets/images/icons/linkedin.svg",
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/dmitryprogrammer/",
  },
  {
    icon: "/src/assets/images/icons/mail.svg",
    title: "Mail",
    href: "mailto:dpischalka@gmail.com",
  },
  {
    icon: "/src/assets/images/icons/telegram.svg",
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
          <img
            src={media.icon}
            className="social-media__icon"
            alt={media.title}
          />
          <span className="social-media__title">{media.title}</span>
        </a>
      </li>
    ))}
  </ul>
);
