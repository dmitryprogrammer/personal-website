import {useState} from "react";
import "./social-media.scss";

interface SocialMedia {
  icon: string;
  title: string;
  href: string;
}

const SOUCAL_MEDIA: SocialMedia[] = [
  {
    icon: "/src/assets/images/icons/linkedin.svg",
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/dmitryprogrammer/",
  },
  {
    icon: "/src/assets/images/icons/mail.svg",
    title: "Mail",
    href: "goto:dpischalka@gmail.com",
  },
  {
    icon: "/src/assets/images/icons/telegram.svg",
    title: "Telegram",
    href: "https://t.me/dmitryprogrammer",
  },
];

export const SocialMedia = () => {
  const [socialMedia] = useState<SocialMedia[]>(SOUCAL_MEDIA);

  return (
    <ul className="social-media">
      {socialMedia?.map((mediaIcon, index) => (
        <li key={index}>
          <a
            href={mediaIcon.href}
            target="_blank"
            className="social-media__item"
          >
            <img
              src={mediaIcon.icon}
              className="social-media__icon"
              alt={mediaIcon.title}
            />
            <span className="social-media__title">{mediaIcon.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
