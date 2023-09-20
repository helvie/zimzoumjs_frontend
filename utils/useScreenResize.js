import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateScreenWidth } from '../reducers/screen';
import { updateScreenHeight } from '../reducers/screen';

const useScreenResize = () => {
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(1000);

  const handleResize = () => {
    const thisScreenWidth = window.innerWidth;
    setScreenWidth(thisScreenWidth);
    dispatch(updateScreenWidth(thisScreenWidth));
    const thisScreenHeight = window.innerHeight;
    dispatch(updateScreenHeight(thisScreenHeight));

  };

  useEffect(() => {
    // Appel de la fonction handleResize lors du chargement initial
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);


  return screenWidth;
};

export default useScreenResize;