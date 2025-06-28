import { Logo } from '../logo/logo';
import { NavMenu } from '../nav-menu/nav-menu';
import './header.scss';

export const Header = () => {
  return (
    <>
      <header className="header container">
        <Logo />
        <NavMenu />
      </header>
    </>
  );
};
