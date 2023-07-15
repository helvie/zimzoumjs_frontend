import OrganismDisplay from '../../components/OrganismDisplay';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
// import { useDispatch } from 'react-redux';
import { useState } from 'react';

// import { updateScreenHeight } from '../../reducers/screen';
// import { updateScreenWidth } from '../../reducers/screen';
import useScreenResize from '../../utils/useScreenResize';
// import { useSelector } from 'react-redux';


function OrganismDisplayPage() {

    const screenWidth = useScreenResize();
    // const screenWidth = widthAndHeight.width;
    // const screenHeight = widthAndHeight.height;
    // console.log(widthAndHeight.width)
    // console.log(widthAndHeight.height)

    // const dispatch = useDispatch();
    
    // const [screenWidth, setScreenWidth] = useState(1000);

    // useEffect(() => {
        // const handleResize = () => {
        //   const screenWidth = window.innerWidth;
        //   setScreenWidth(screenWidth);
        //   dispatch(updateScreenWidth(screenWidth));
        //   const screenHeight = window.innerHeight;
        //   setScreenHeight(screenHeight);
        //   dispatch(updateScreenHeight(screenHeight));
        // };
    
    //     window.addEventListener('resize', handleResize);

    //     handleResize();
    
    //     return () => {
    //       window.removeEventListener('resize', handleResize);
    //     };
    //   }, [dispatch]);

    const router = useRouter();
    const { orgNumber } = router.query;
  
    // Utilisez le numéro pour afficher la page de la commande correspondante
  
    return (
      <div>
        <div><OrganismDisplay orgNumber={orgNumber} /></div>

        {/* Affichez le contenu de la commande ici */}
      </div>
    );
  };
  
  export default OrganismDisplayPage;
  
