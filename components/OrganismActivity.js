import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCaretRight, faCaretLeft, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import OrgActivityDetail from './OrganismActivityDetail';
import stylesGeneral from '../styles/General.module.css';

function OrgActivity(props) {
  const backgroundArrow = { backgroundColor: props.backgroundArrowColor };
  const color = { color: props.color };

  const [activityArrayItem, setActivityArrayItem] = useState(0);
  const [activityScreen, setActivityScreen] = useState(0);

  const nbOfClasses = props.detail.length;
  const nbOfPages = nbOfClasses <= 4 ? 1 : nbOfClasses % 4 === 0 ? nbOfClasses / 4 : Math.ceil(nbOfClasses / 4) + 1
  const thisPage = 2 + (activityArrayItem / 4);
  console.log("nbpages : " + nbOfPages)
  console.log("page n° : " + thisPage)

  const handleReturn = () => {
    activityScreen === 2
      ? setActivityScreen(1)
      // : activityScreen === 1
      //   ? setActivityScreen(0)
      : null;
  }

  const handleAdvance = () => {
    // thisPage+=1;
    activityScreen === 0
      ? setActivityScreen(1)
      : activityScreen === 1
        ? setActivityScreen(2)
        : null;
  }

  const incrementActivityItem = () => {
    activityArrayItem + 4 <= props.detail.length
      ? setActivityArrayItem(activityArrayItem + 4)
      : null;
  }


  const decreaseActivityItem = () => {
    activityArrayItem - 4 >= 0 ?
      setActivityArrayItem(activityArrayItem - 4)
      : handleReturn();
  }

  console.log("activityArrayItem : " + activityArrayItem)

  const classes = props.detail.map((data, i) => {
    if (i >= activityArrayItem && i < activityArrayItem + 4) {
      // return <OrgActivityDetail key={i} startAge={data.detailStartAge} endAge={data.detailEndAge} day={data.day}
      //   startTime={data.startHours} endTime={data.endMinutes} grade={data.grade} availability={data.availability}
      //   availabilityDate={data.availabilityDate} description={data.description} valid={data.valid} visible={data.visible} animator={data.animator}
      // />;
      return <OrgActivityDetail key={i} detail={data}
      />;
    }
  });

  return (
    <div className={`${styles.orgActivityContainer} ${props.classActivity}`} style={props.style}>

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

              <div className={styles.activityFooter}>
                <div className={styles.arrowContainer} style={backgroundArrow}><span onClick={() => handleAdvance()}><FontAwesomeIcon icon={faCaretRight} className={styles.arrow} /></span></div>
                <p className={styles.nbOfPages}>1/{nbOfPages}</p>
              </div>
            </div>
          ) :

          (<div className={styles.orgActivityDetailContainer} >
            <div>
              <h3 className={styles.orgActivityDetailTitle}>{props.activity}</h3>
              {/* <p>{props.activity}{props.detail.age}{props.detail.day}{props.detail.hours}</p> */}
              {classes}
            </div>
            <div className={styles.activityFooter}>
              {(activityArrayItem !== 0 >= props.detail.length) && <div className={styles.arrowContainer} style={backgroundArrow}><span onClick={() => decreaseActivityItem()}><FontAwesomeIcon icon={faCaretLeft} className={styles.arrow} /></span></div>}
              {activityArrayItem + 4 <= props.detail.length && <div className={styles.arrowContainer} style={backgroundArrow}><span onClick={() => incrementActivityItem()}><FontAwesomeIcon icon={faCaretRight} className={styles.arrow} /></span></div>}
              <p className={styles.nbOfPages}>{thisPage}/{nbOfPages}</p>
            </div>

          </div>
          )}

      {/* <div className={styles.arrowsContainer}> */}
      {/* {activityScreen != 0 && <div className={styles.arrowContainer} style={backgroundArrow}><span onClick={() => handleReturn()}><FontAwesomeIcon icon={faCaretLeft} className={styles.arrow} /></span></div>}
        {activityScreen != 2 && <div className={styles.arrowContainer} style={backgroundArrow}><span onClick={() => handleAdvance()}><FontAwesomeIcon icon={faCaretRight} className={styles.arrow} /></span></div>}

        {activityScreen === 2 && activityArrayItem != 0 >= props.detail.length && <div className={styles.arrowContainer} style={backgroundArrow}><span onClick={() => decreaseActivityItem()}><FontAwesomeIcon icon={faCaretUp} className={styles.arrow} /></span></div>}
        {activityScreen === 2 && activityArrayItem + 4 <= props.detail.length && <div className={styles.arrowContainer} style={backgroundArrow}><span onClick={() => incrementActivityItem()}><FontAwesomeIcon icon={faCaretDown} className={styles.arrow} /></span></div>} */}

      {/* </div> */}
    </div>

  );
}

export default OrgActivity;