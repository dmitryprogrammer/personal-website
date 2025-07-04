import {useState} from "react";
import "./social-media.scss";

interface SocialMedia {
  href: string;
  title: string;
}

const SOUCAL_MEDIA: SocialMedia[] = [
  {
    href: "/src/assets/images/icons/linkedin.svg",
    title: "LinkedIn",
  },
  {
    href: "/src/assets/images/icons/mail.svg",
    title: "Mail",
  },
  {
    href: "/src/assets/images/icons/telegram.svg",
    title: "Telegram",
  },
];

export const SocialMedia = () => {
  const [socialMedia] = useState<SocialMedia[]>(SOUCAL_MEDIA);

  return (
    <ul className="social-media">
      {socialMedia?.map((mediaIcon, index) => (
        <li key={index} className="social-media__item">
          <img
            src={mediaIcon.href}
            className="social-media__icon"
            alt={mediaIcon.title}
          />
          <span className="social-media__title">{mediaIcon.title}</span>
        </li>
      ))}
    </ul>
  );
};
