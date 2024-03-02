import React from 'react';

import './nav-menu.scss';

export const NavMenu = ({ hostClassName = '' }: { hostClassName?: string }) => {
  return (
    <nav className={'navigation-menu ' + hostClassName}>
      <ul className='navigation-menu__list'>
        <li className='navigation-menu__item'>Main</li>
        <li className='navigation-menu__item'>Blog</li>
        <li className='navigation-menu__item'>Books I've Read</li>
        <li className='navigation-menu__item'>Contacts</li>
      </ul>
    </nav>
  );
};
