import stylesHeader from '../../styles/Header.module.css';

import Burger from './Burger';
import { useRouter } from 'next/router';

////////////////////////////////////////////////////////////////////////////////

const Header = () => {

  const router = useRouter();

  return (
    <div className={stylesHeader.headerContainer}>
      <div className={stylesHeader.headerImg}></div>
      <div style={{cursor:"pointer"}} onClick={()=>router.push('/')} className={stylesHeader.headerLogo}></div>
      <div className={stylesHeader.footerImg}></div>
      <Burger />
    </div>
  )
}

export default Header;