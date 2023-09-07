import styles from '../../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCaretRight, faTrash, faPencil, faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import styles from '../styles/Home.module.css'
import { daysList, gradeList, availabilityList } from '../../utils/dataObjects';

function ActivityDetailUpdate(props) {
  const {
    startHours,
    startMinutes,
    endHours,
    endMinutes,
    detailStartAge,
    detailEndAge,
    day,
    grade,
    animator,
    availability
  } = props.detail;

  // const formatTime = (value) => {
  //   return !value ? "00" : value < 10 ? `0${value}` : value;
  // };

  return (
    <div className={styles.orgActivityText}>
      <p>
        {/* {props.day} de {formatTime(startHours)}:{formatTime(startMinutes)} à {formatTime(endHours)}:{formatTime(endMinutes)}  - de {detailStartAge} à {detailEndAge} ans */}
    <div className={styles.detailActivityBeforeUpdate}>
    <p>De {detailStartAge} à {detailEndAge} ans</p>
    <p>{daysList[day]} de {startHours}:{startMinutes ? startMinutes : "00"} à {endHours}:{endMinutes ? endMinutes : "00"}</p>
    <p>Niveau : {gradeList[grade]}</p>
    <p>Animateur : {animator}</p>
    <p>Disponibilité : {availabilityList[availability]}</p>

   </div>
      
      </p>
    </div>
  );



}

export default ActivityDetailUpdate;