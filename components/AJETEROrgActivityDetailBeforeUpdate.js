import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCaretRight, faTrash, faPencil, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { daysList, gradeList, availabilityList } from '../utils/dataObjects';

function OrgActivityDetailBeforeUpdate(props) {
  const {
    detailStartAge,
    detailEndAge,
    day,
    startHours,
    startMinutes,
    endHours,
    endMinutes,
    grade,
    animator,
    availability
  } = props.detail;

  // const formatTime = (value) => {
  //   return !value ? "00" : value < 10 ? `0${value}` : value;
  // };


  return (
    <div className={styles.detailActivityBeforeUpdate}>
      <p>De {detailStartAge} à {detailEndAge} ans</p>
      <p>{daysList[day]} de {startHours}:{startMinutes ? startMinutes : "00"} à {endHours}:{endMinutes ? endMinutes : "00"}</p>
      <p>Niveau : {gradeList[grade]}</p>
      <p>Animateur : {animator}</p>
      <p>Disponibilité : {availabilityList[availability]}</p>
    </div>
  )

}

export default OrgActivityDetailBeforeUpdate;