import React from 'react';

import './nav-menu.scss';

const MENU_ITEMS = ['Main', 'Blog', "Books I've Read", 'Contacts'];

export const NavMenu = ({ hostClassName = '' }: { hostClassName?: string }) => {
  return (
    <nav className={'navigation-menu ' + hostClassName}>
      <ul className="navigation-menu__list">
        {MENU_ITEMS.map((menuItem: string, i: number) => (
          <li className="navigation-menu__item" key={i}>
            {menuItem}
          </li>
        ))}
      </ul>
    </nav>
  );
};
