import { useState } from 'react';

import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import OrgActivityDetail from './OrganismActivityDetail';

////////////////////////////////////////////////////////////////////////////////

function OrgActivity(props) {

  let classes = "";

  const [activityArrayItem, setActivityArrayItem] = useState(0);
  const [activityScreen, setActivityScreen] = useState(0);

  const nbOfClasses = props.detail ? props.detail.length : 0;
  const nbOfPages = nbOfClasses === 0 ? 1 : nbOfClasses <= 4 ? 2 : nbOfClasses % 4 === 0 ? (nbOfClasses / 4)+1 : Math.ceil(nbOfClasses / 4) + 1
  const thisPage = 2 + (activityArrayItem / 4);

  //ooooooooooooooooo Affichage section précédente de l'activité oooooooooooooooooooo

  const handleReturn = () => {
    activityScreen === 2
      ? setActivityScreen(1)
      : null;
  }

  //ooooooooooooooooooo Affichage section suivante de l'activité oooooooooooooooooooo

  const handleAdvance = () => {
    activityScreen === 0
      ? setActivityScreen(1)
      : activityScreen === 1 && nbOfClasses > 0
        ? setActivityScreen(2)
        : null;
  }

  //oooooooooooooooooo Affichage des créneaux d'activités suivants  oooooooooooooooooo

  const incrementActivityItem = () => {

    activityArrayItem + 4 < props.detail.length
      ? setActivityArrayItem(activityArrayItem + 4)
      : null;
  }

  //oooooooooooooooo Affichage des créneaux d'activités précédents  oooooooooooooooooo

  const decreaseActivityItem = () => {
    activityArrayItem - 4 >= 0 ?
      setActivityArrayItem(activityArrayItem - 4)
      : handleReturn();
  }

  //ooooooooooooooooooooo Initialisation des créneaux d'activités oooooooooooooooooooo


  if (props.detail) {
    classes = props.detail.map((data, i) => {
      if (i >= activityArrayItem && i < activityArrayItem + 4) {
        return <OrgActivityDetail key={i} detail={data}
        />;
      }
    });
  }


  /////////////////////////////////////////////////////////////////////////////////////

  return (
    <div
      className={`${styles.orgActivityContainer} ${props.classActivity}`}
      style={props.style}
    >

      {activityScreen === 0 ? (
        <div className={styles.orgActivityTitleText} onClick={() => handleAdvance()}>
          <div>
            <h3>{props.activity}</h3>
          </div>
        </div>
      ) :
        activityScreen === 1 ?
          (

            <div className={styles.orgActivityDescription} onClick={() => handleAdvance()}>
              <div>
                <h3>{props.activity}</h3>
                <p>{props.description}</p>
              </div>
              {nbOfClasses != 0 && 
                 (
                  <div className={styles.activityFooter}>
                  <div className={styles.arrowContainer}><span onClick={() => handleAdvance()}>
                    <FontAwesomeIcon icon={faCaretRight} className={styles.arrow} /></span></div>
                  <p className={styles.nbOfPages}>1/{nbOfPages}</p>
                </div>
                ) 

              }
            </div>
          ) :

          (<div className={styles.orgActivityDetailContainer} >
            <div>
              <h3 className={styles.orgActivityDetailTitle}>{props.activity}</h3>
              {classes}
            </div>
            <div className={styles.activityFooter}>
              {(activityArrayItem !== 0 >= props.detail.length) &&
                <div className={styles.arrowContainer}>
                  <span onClick={() => decreaseActivityItem()}>
                    <FontAwesomeIcon icon={faCaretLeft} className={styles.arrow} /></span></div>}
              {activityArrayItem + 4 <= props.detail.length &&
                <div className={styles.arrowContainer}>
                  <span onClick={() => incrementActivityItem()}>
                    <FontAwesomeIcon icon={faCaretRight} className={styles.arrow} /></span></div>}
              <p className={styles.nbOfPages}>{thisPage}/{nbOfPages}</p>
            </div>

          </div>
          )}

    </div>

  );
}

export default OrgActivity;