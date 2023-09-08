import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import OrgActivity from './OrganismActivity';
import { shuffleArray } from '../utils/shuffleArray';
import dynamic from 'next/dynamic';
import Header from './SmallElements/Header';
import { useDispatch, useSelector } from 'react-redux';
// import { updateScreenHeight } from '../reducers/screen';
// import { updateScreenWidth } from '../reducers/screen';
import { useRouter } from 'next/router';

const numberOfBackground = 0;

const Map = dynamic(() => import('./SmallElements/Map'), { ssr: false });

const OrganismDisplay = (props) => {
  const router = useRouter();

  const screenHeight = useSelector((state) => state.screen.screenHeight)
  const screenWidth = useSelector((state) => state.screen.screenWidth)


  const [divElements, setDivElements] = useState();

  // const screenHeight = useSelector((state) => state.screen.screenHeight);
  // const screenWidth = useSelector((state) => state.screen.screenWidth);


  const dispatch = useDispatch();
  let colorsArray = [];
  let color = "#000000"
  const allColors = ["#efc22b","#72A3D2", "#FA9255", "#F06761", "#AEB861", "#E699A6", "#ffffff"];

  // const [allColors, setAllColors] = useState([]);


  useEffect(() => {    
    
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/organisms/${props.orgNumber}`);
        const data = await response.json();
        setDivElements(data.organism);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [props.orgNumber]);
  
    const orgActivities = divElements?.regularClasses?.map((data, i) => {  

      // screenWidth > 768

      const activityClass = screenWidth < 768 ? "transparent" : i%2 === 0 ? "black" : "transparent"; 

    // if (screenWidth > 768) { backgroundColor = i === 0 ? "#ffffff" : (i % 2 !== 0 ? (backgroundColor === "#ffffff" ? "#F2F2F2" : "#ffffff") : backgroundColor); }
    // else { backgroundColor = backgroundColor === "#ffffff" ? "#F2F2F2" : "#ffffff" }
    // backgroundArrowColor = backgroundColor === "#ffffff" ? "#E8E8E8" : "#dddddd"

    data.style = { backgroundColor: allColors[numberOfBackground], color: color, minHeight: thirdScreen, borderRightColor : activityClass };
    numberOfBackground = numberOfBackground===allColors.length-1?0:numberOfBackground+1;

    // if (i >= 0 && i < 5) {
    return <OrgActivity key={i} style={data.style} classActivity = {activityClass} backgroundColor={allColors[numberOfBackground]} backgroundArrowColor={backgroundArrowColor} color={color} activity={data.activity} description={data.description} detail={data.regularClassesDetails} />;
    // }
  });


  let backgroundColor = "#ffffff";
  let backgroundArrowColor = "#ffffff";
  let thirdScreen = screenHeight/3;

  return (
<main className={styles.orgContent}>
  
<Header />
{divElements && (

      <div className={styles.orgData}>
        <div className={styles.orgLeftData}>
          <h1 className={styles.orgDataTitle}>{divElements.orgName}</h1>
          <p className={styles.orgDataAddress}>{divElements.location.route} – {divElements.location.postalCode} {divElements.location.city}</p>
        </div>
        <div className={styles.orgRightData}>
          <p className={styles.orgDataText}>{divElements.emailPublic} - {divElements.phonePublic}</p>
          <p className={styles.orgDataText}>{divElements.website}</p>
          <p className={styles.orgDataText}>{divElements.respRole} : {divElements.respCivility} {divElements.respName}</p>
        </div>
      </div>
)}
        {divElements && (

      <div className={styles.orgDescription}>
        <p>{divElements.description}</p>
      </div>
        )}
        {divElements && (

      <div className={styles.orgMapAndImg}>
        <div className={styles.orgMap}>
          <Map />
        </div>
        <div className={styles.orgImgContainer}>
          <img className={styles.orgImg2} src={divElements.image} alt="Organism Image" />
        </div>
      </div>
        )}


    <div className={styles.orgActivitiesContainer}>
      {orgActivities}
    </div>
  </main>
  );
}

export default OrganismDisplay;
  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   try {
  //     // const response = await fetch(`http://localhost:3000/organisms/${props.orgNumber}'`);

  //       fetch(`http://localhost:3000/organisms/${props.orgNumber}'`);
  //       const data = await response.json();
  //       setDivElements(data);

      
  //     } catch (error) {
  //     }
  //   };



    // fetchData();


    // const handleResize = () => {
    //   dispatch(updateScreenWidth(window.innerWidth));
    //   dispatch(updateScreenHeight(window.innerHeight));
    // };

    // // Attacher un gestionnaire d'événement à la fenêtre pour capturer le redimensionnement
    // window.addEventListener('resize', handleResize);

    // // Nettoyer le gestionnaire d'événement lorsque le composant est démonté
    // return () => {
    //   window.removeEventListener('resize', handleResize);
    // };
  // }, []);
    // const orgActivities = divElements.map((data, i) => {
  //   if (screenWidth > 768) { backgroundColor = i === 0 ? "#ffffff" : (i % 2 !== 0 ? (backgroundColor === "#ffffff" ? "#F2F2F2" : "#ffffff") : backgroundColor); }
  //   else { backgroundColor = backgroundColor === "#ffffff" ? "#F2F2F2" : "#ffffff" }
  //   backgroundArrowColor = backgroundColor === "#ffffff" ? "#E8E8E8" : "#dddddd"
  //   color = allColors[i]

  //   data.style = { backgroundColor: backgroundColor, color: color, minHeight: thirdScreen };

  //   // if (i >= 0 && i < 5) {
  //   return <OrgActivity key={i} style={data.style} backgroundArrowColor={backgroundArrowColor} color={color} activity={data.activity} description={data.description} detail={data.detail} />;
  //   // }
  // });
