import './header.scss';
import { Logo } from '../logo/logo';
import { NavMenu } from '../nav-menu/nav-menu';

export const Header = () => {
  return (
    <>
      <header className='header container'>
        <Logo />
        <NavMenu />
      </header>
    </>
  );
};
