import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil, faTrash, faCaretLeft, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import OrgActivityDetailUpdate from './OrganismActivityDetailUpdate';
import stylesGeneral from '../styles/General.module.css';

function OrgActivityUpdate(props) {

  const backgroundArrow = { backgroundColor: props.backgroundArrowColor };
  const color = { color: props.color };

  const [activityArrayItem, setActivityArrayItem] = useState(0);
  const [activityScreen, setActivityScreen] = useState(0);

  const nbOfClasses = props.detail.length;



  const handleReturn = () => {
    activityScreen === 2
      ? setActivityScreen(1)
      : null;
  }

  // const handleAdvance = () => {
  //   // thisPage+=1;
  //   activityScreen === 0
  //     ? setActivityScreen(1)
  //     : activityScreen === 1
  //       ? setActivityScreen(2)
  //       : null;
  // }

  // const incrementActivityItem = () => {
  //   activityArrayItem + 4 <= props.detail.length
  //     ? setActivityArrayItem(activityArrayItem + 4)
  //     : null;
  // }


  // const decreaseActivityItem = () => {
  //   activityArrayItem - 4 >= 0 ?
  //     setActivityArrayItem(activityArrayItem - 4)
  //     : handleReturn();
  // }


  const classes = props.detail.map((data, i) => {
      return <OrgActivityDetailUpdate key={i} detail={data}
      />;

  });

  return (
    <div className={`${styles.orgActivityUpdateContainer} ${props.classActivity}`} style={props.style}>

            <h3><span onClick={() => consoleLog()}><FontAwesomeIcon icon={faTrash} className={styles.trashIcon} /></span>{props.activity}</h3>

                <p>
                  <span onClick={() => consoleLog()}><FontAwesomeIcon icon={faTrash} className={styles.trashIcon} />
                  </span>
                  <span onClick={() => consoleLog()}><FontAwesomeIcon icon={faPencil} className={styles.pencilIcon} />
        </span>
                  {props.description}
                  </p>

            <div className={styles.orgActivityDetailUpdateContainer} >

              {classes}

          </div>

    </div>

  );
}

export default OrgActivityUpdate;