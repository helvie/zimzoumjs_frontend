import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
// import OrgActivity from './OrganismActivity';
import { shuffleArray } from '../utils/shuffleArray';
import dynamic from 'next/dynamic';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
// import { updateScreenHeight } from '../reducers/screen';
// import { updateScreenWidth } from '../reducers/screen';
import { useRouter } from 'next/router';



const Map = dynamic(() => import('./Map'), { ssr: false });

const OrganismDisplay = (props) => {
  const router = useRouter();

  const screenHeight = useSelector((state) => state.screen.screenHeight)


  const [divElements, setDivElements] = useState();

  // const screenHeight = useSelector((state) => state.screen.screenHeight);
  // const screenWidth = useSelector((state) => state.screen.screenWidth);

console.log("esssaiiii  "+screenHeight)

  const dispatch = useDispatch();
  let colorsArray = [];
  let color = "#000000"

  const [allColors, setAllColors] = useState([]);

  console.log(props.orgNumber)

  useEffect(() => {    
    
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/organisms/${props.orgNumber}`);
        const data = await response.json();
        console.log(data.organism.location.route)
        setDivElements(data.organism);

        const initialFontsColors = ["#c52532", "#ff6600", "#4f6228", "#ac2e82", "#ac5208", "#008080"];
        const numberOfColorsArray = Math.ceil(16 / initialFontsColors.length);
        const colorsArray = [];
        for (let i = 0; i < numberOfColorsArray; i++) {
          colorsArray.push(...shuffleArray(initialFontsColors));
        }
        setAllColors(colorsArray);
        console.log(colorsArray);
        console.log(divElements.location)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // const handleResize = () => {
    //   dispatch(updateScreenWidth(window.innerWidth));
    //   dispatch(updateScreenHeight(window.innerHeight));
    // };

    // window.addEventListener('resize', handleResize);

    // return () => {
    //   window.removeEventListener('resize', handleResize);
    // };
  }, [props.orgNumber]);
  
  //   const orgActivities = divElements.map((data, i) => {
  //   if (screenWidth > 768) { backgroundColor = i === 0 ? "#ffffff" : (i % 2 !== 0 ? (backgroundColor === "#ffffff" ? "#F2F2F2" : "#ffffff") : backgroundColor); }
  //   else { backgroundColor = backgroundColor === "#ffffff" ? "#F2F2F2" : "#ffffff" }
  //   backgroundArrowColor = backgroundColor === "#ffffff" ? "#E8E8E8" : "#dddddd"
  //   color = allColors[i]

  //   data.style = { backgroundColor: backgroundColor, color: color, minHeight: thirdScreen };

  //   // if (i >= 0 && i < 5) {
  //   return <OrgActivity key={i} style={data.style} backgroundArrowColor={backgroundArrowColor} color={color} activity={data.activity} description={data.description} detail={data.detail} />;
  //   // }
  // });


  let backgroundColor = "#ffffff";
  let backgroundArrowColor = "#ffffff";
  let thirdScreen = screenHeight/3;

  return (
<main className={styles.orgContent}>
  
<Header />
{divElements && (

      <div className={styles.orgData} style={{ minHeight: thirdScreen }}>
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

      <div className={styles.orgDescription} style={{ minHeight: thirdScreen }}>
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
      {/* {orgActivities} */}
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
  //       console.log('Registration successful:', data);
  //       setDivElements(data);

      
  //     } catch (error) {
  //       console.error('Registration failed:', error);
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
