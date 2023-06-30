import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCaretRight, faCaretLeft, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import OrgActivityDetail from './OrganismActivityDetail';

function OrgActivity(props) {
  // console.log("props "+props.detail.length)
  const backgroundArrow = { backgroundColor: props.backgroundArrowColor };
  const color = { color: props.color };

  const [activityArrayItem, setActivityArrayItem] = useState(0);
  const [activityScreen, setActivityScreen] = useState(0);


  //  
  const handleReturn = () => {
    activityScreen === 2
      ? setActivityScreen(1)
      : activityScreen === 1
        ? setActivityScreen(0)
        : null;
  }

  const handleAdvance = () => {
    activityScreen === 0
      ? setActivityScreen(1)
      : activityScreen === 1
        ? setActivityScreen(2)
        : null;
  }

  const incrementActivityItem = () => {
    activityArrayItem +4 <= props.detail.length
          ? setActivityArrayItem(activityArrayItem + 4)
          : null;
  }


  const decreaseActivityItem = () => {
    console.log(activityArrayItem)
    activityArrayItem - 4 >= 0 ?
        setActivityArrayItem(activityArrayItem - 4)
          : null;
  }

  const classes = props.detail.map((data, i) => {
    if (i >= activityArrayItem && i < activityArrayItem + 4) {
      return <OrgActivityDetail key={i} miniAge={data.miniAge} maxiAge={data.maxiAge} day={data.day}
        startTime={data.startTime} endTime={data.endTime} grade={data.grade} availability={data.availability}
        availabilityDate={data.availabilityDate} description={data.description} valid={data.valid} visible={data.visible} animator={data.animator}
      />;
    }
  });

  return (
    <div className={styles.orgActivityContainer} style={props.style}>

      {activityScreen === 0 ? (
        <div className={styles.orgActivityTitleText}>
          <p>{props.activity}</p>
        </div>
      ) :
        activityScreen === 1 ?

          (
            <div className={styles.orgActivityDescription}>
              <p>{props.description}</p>
            </div>
          ) :

          (<div className={styles.orgActivityDetailContainer} >
            <p className={styles.orgActivityDetailTitle}>{props.activity}</p>
            {/* <p>{props.activity}{props.detail.age}{props.detail.day}{props.detail.hours}</p> */}
            {classes}
          </div>
          )}

      <div className={styles.arrowsContainer}>
        {activityScreen != 0 && <div className={styles.arrowContainer} style={backgroundArrow}><span onClick={() => handleReturn()}><FontAwesomeIcon icon={faCaretLeft} className={styles.arrow} /></span></div>}
        {activityScreen != 2 && <div className={styles.arrowContainer} style={backgroundArrow}><span onClick={() => handleAdvance()}><FontAwesomeIcon icon={faCaretRight} className={styles.arrow} /></span></div>}

        {activityScreen === 2 && activityArrayItem != 0 >= props.detail.length && <div className={styles.arrowContainer} style={backgroundArrow}><span onClick={() => decreaseActivityItem()}><FontAwesomeIcon icon={faCaretUp} className={styles.arrow} /></span></div>}
        {activityScreen === 2 && activityArrayItem + 4 <= props.detail.length && <div className={styles.arrowContainer} style={backgroundArrow}><span onClick={() => incrementActivityItem()}><FontAwesomeIcon icon={faCaretDown} className={styles.arrow} /></span></div>}

      </div>
    </div>

  );
}

export default OrgActivity;