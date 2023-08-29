import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCaretRight, faTrash, faPencil, faCaretDown } from '@fortawesome/free-solid-svg-icons';

function OrgActivityDetailUpdate(props) {
  const {
    startHours,
    startMinutes,
    endHours,
    endMinutes,
    detailStartAge,
    detailEndAge
  } = props.detail;

  const formatTime = (value) => {
    return !value ? "00" : value < 10 ? `0${value}` : value;
  };

  const consoleLog = () => {
    console.log("cliqué !!!!!!!")
  }

  return (
    <div className={styles.orgActivityText}>
      <p>
        <span onClick={() => consoleLog()}><FontAwesomeIcon icon={faTrash} className={styles.trashIcon} />
        </span>
        <span onClick={() => consoleLog()}><FontAwesomeIcon icon={faPencil} className={styles.pencilIcon} />
        </span>
        {props.day} de {formatTime(startHours)}:{formatTime(startMinutes)} à {formatTime(endHours)}:{formatTime(endMinutes)}  - de {detailStartAge} à {detailEndAge} ans
      </p>
    </div>
  );



}

export default OrgActivityDetailUpdate;