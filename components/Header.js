import { useSelector } from 'react-redux';
// import {sideBar};
import Burger from './Burger';
import stylesHeader from '../styles/Header.module.css'

const Header = () => {
  const screenHeight = useSelector((state) => state.screen.screenHeight);
  const screenWidth = useSelector((state) => state.screen.screenWidth);
  const thirdScreen = screenHeight/3;

  let headerImg =
    screenWidth > 1026 ? "images/visuelZimzoum.jpg" :
      screenWidth > 600 ? "images/visuelZimzoumMoyen.jpg" :
        "images/visuelZimzoumPetit.jpg"
        return (
          <div>
          {/* <div className={stylesHeader.container}> */}
          <img className="w-full xl:visible" src={headerImg} alt="Header Image" />
          {/* <div className={`${stylesHeader.overlay} ${stylesHeader.yellowOverlay}`}></div>
          <div className={`${stylesHeader.overlay} ${stylesHeader.blueOverlay}`}></div>
          <div className={stylesHeader.greenOverlay}>
          <div className={stylesHeader.navbarContainer}> */}
            <Burger/>
            {/* </div>
            </div>
        </div> */}
        </div>
        );
};

export default Header;