import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';

import OrgActivity from './OrganismActivity';
import Header from './SmallElements/Header';

import { BACKEND_URL } from '../utils/urls';

const Map = dynamic(() => import('./SmallElements/Map'), { ssr: false });

////////////////////////////////////////////////////////////////////////////////

const OrganismDisplay = (props) => {

  const numberOfBackground = 0;

  const screenHeight = useSelector((state) => state.screen.screenHeight)
  const screenWidth = useSelector((state) => state.screen.screenWidth)
  const [divElements, setDivElements] = useState();
  const [showMap, setShowMap] = useState(false);

  let color = "#000000"
  const allColors = ["#efc22b", "#72A3D2", "#FA9255", "#F06761", "#AEB861", "#E699A6", "#ffffff"];
  let backgroundArrowColor = "#ffffff";

  //oooooooooooooooo Récupération des données de l'organisme oooooooooooooooooooo

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/organisms/${props.orgNumber}`);
        const data = await response.json();
        setDivElements(data.organism);
        setShowMap(true);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [props.orgNumber]);


  //ooooooooooooooooooo Initialisation des activités de l'organisme oooooooooooooooo

  const orgActivities = divElements?.regularClasses?.map((data, i) => {


    const activityClass = screenWidth < 768 ? "transparent" : i % 2 === 0 ? "black" : "transparent";

    data.style = { backgroundColor: allColors[numberOfBackground] };
    numberOfBackground = numberOfBackground === allColors.length - 1 ? 0 : numberOfBackground + 1;

    return <OrgActivity key={i} style={data.style} classActivity={activityClass} backgroundColor={allColors[numberOfBackground]} backgroundArrowColor={backgroundArrowColor} color={color} activity={data.activity} description={data.description} detail={data.regularClassesDetails} />;
  });


  ////////////////////////////////////////////////////////////////////////////////

  return (
    <main className={`${styles.orgContent} ${styles.yellowBackground}`}>

      <Header />
      {divElements && (

        <>
          <div className={styles.orgData}>
            <div className={styles.orgImgContainer}>
              <img className={styles.orgImg2} src={divElements.image} alt="Organism Image" />
            </div>

            <div className={styles.orgLeftData}>
              <h1 className={styles.orgDataTitle}>{divElements.orgName}</h1>
              <p className={styles.orgDataAddress}>{divElements.location.route} – {divElements.location.postalCode} {divElements.location.city}</p>
              <p className={styles.orgDataText}>{divElements.emailPublic} - {divElements.phonePublic}</p>
              <p className={styles.orgDataText}>{divElements.website}</p>
              <p className={styles.orgDataText}>{divElements.respRole} : {divElements.respCivility} {divElements.respName}</p>
            </div>

          </div>

          <div className={styles.orgDescription}>
            <p>{divElements.description}</p>
          </div>

          <div className={styles.orgMapAndImg}>
            {showMap &&
              <div className={styles.orgMap}>
                <Map latitude={divElements.location.latitude} longitude={divElements.location.longitude} />
              </div>
            }


            {/* <div className={styles.orgRightData}>
            </div> */}




          </div>
        </>
      )}

      <div className={styles.orgActivitiesContainer}>
        {orgActivities}
      </div>
    </main>
  );
}

export default OrganismDisplay;

