import './nav-menu.scss';

export const NavMenu = () => {
  return (
    <nav className="navigation-menu">
      <ul className="navigation-menu__list">
        <li className="navigation-menu__item">Main</li>
        <li className="navigation-menu__item">Blog</li>
        <li className="navigation-menu__item">Books I've Read</li>
        <li className="navigation-menu__item">Contacts</li>
      </ul>
    </nav>
  );
};
