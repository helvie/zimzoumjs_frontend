import stylesHeader from '../../styles/Header.module.css';

import Burger from './Burger';

////////////////////////////////////////////////////////////////////////////////

const Header = () => {

  return (
    <div className={stylesHeader.headerContainer}>
      <div className={stylesHeader.headerImg}></div>
      <div className={stylesHeader.headerLogo}></div>
      <div className={stylesHeader.footerImg}></div>

      <Burger />
    </div>
  )
}

export default Header;