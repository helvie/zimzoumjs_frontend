import styles from '../../styles/Home.module.css'
import { daysList, gradeList, availabilityList } from '../../utils/dataObjects';

////////////////////////////////////////////////////////////////////////////////

function ActivityDetailBeforeUpdate(props) {

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
  
////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={styles.orgActivityText}>

      <div className={styles.detailActivityBeforeUpdate}>
        <p>De {detailStartAge} à {detailEndAge} ans</p>
        <p>{daysList[day]} de {startHours}:{startMinutes ? startMinutes : "00"} à {endHours}:{endMinutes ? endMinutes : "00"}</p>
        <p>Niveau : {gradeList[grade]}</p>
        <p>Animateur : {animator}</p>
        <p>Disponibilité : {availabilityList[availability]}</p>

      </div>

    </div>
  );

}

export default ActivityDetailBeforeUpdate;