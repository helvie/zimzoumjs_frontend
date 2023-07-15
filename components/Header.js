import { useSelector } from 'react-redux';
// import {sideBar};
import Burger from './Burger';
import stylesHeader from '../styles/Header.module.css'
import { useState, useEffect } from 'react';

// import { updateScreenHeight } from '../reducers/screen';
// import { updateScreenWidth } from '../reducers/screen';

const Header = () => {

  const screenWidth = useSelector((state) => state.screen.screenWidth);
//   const dispatch = useDispatch();
// const [screenWidth, setScreenWidth] = useState(0);


//   useEffect(() => {
//     // Fonction de gestion de l'événement resize
//     const handleResize = () => {
//       const screenWidth = window.innerWidth;
//       setScreenWidth(screenWidth);
//       dispatch(updateScreenWidth(screenWidth))

//     };

//     // Écoute de l'événement resize lors du montage du composant
//     window.addEventListener('resize', handleResize);

//     // Désinscription de l'événement resize lors du démontage du composant
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);




  // dispatch(updateScreenWidth(window.innerWidth));
  // dispatch(updateScreenHeight(window.innerHeight));

  // const thirdScreen = screenHeight / 3;

  let headerImg =
    screenWidth > 1026 ? "/images/visuelZimzoum.jpg" :
      screenWidth > 600 ? "/images/visuelZimzoumMoyen.jpg" :
        "/images/visuelZimzoumPetit.jpg"
  return (
    <div>
      <img className="w-full xl:visible" src={headerImg} alt="Header Image" />
      <Burger />
    </div>
  );
};

export default Header;