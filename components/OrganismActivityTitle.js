import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function OrgActivityTitle(props) {

  const [activityArrayItem, setActivityArrayItem] = useState(0);


  const handleActivityItem = () => {
    setActivityArrayItem(activityArrayItem + 4)
    // console.log(activityArrayItem)

  }



  // console.log(props.detail)
  if (activityArrayItem === 0) {
    return (
      <div className={styles.orgActivityContainer} style={props.style}>
        <p>{props.activity}</p>
        <div className={styles.leftArrow}><span onClick={() => handleActivityItem()}><FontAwesomeIcon icon={faArrowLeft} /></span></div>
        <div className={styles.rightArrow}><span onClick={() => handleActivityItem()}><FontAwesomeIcon icon={faArrowRight} /></span></div>

      </div>

    );

  }
  else {
    return (
      <div className={styles.orgActivityContainer} style={props.style}>
        <p>{props.activity}</p>
        <p>{props.activity}{props.detail.age}{props.detail.day}{props.detail.hours}</p>
        <span onClick={() => handleActivityItem()}><FontAwesomeIcon icon={faArrowLeft} /></span>
        <span onClick={() => handleActivityItem()}><FontAwesomeIcon icon={faArrowRight} /></span>

      </div>
    );
  }



}

export default OrgActivityTitle;