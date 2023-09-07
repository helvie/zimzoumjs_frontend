import styles from '../styles/Home.module.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, faStar, faVideo } from '@fortawesome/free-solid-svg-icons';
// import stylesGeneral from '../styles/General.module.css';

function OrgActivityDetail(props) {
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
        return (
            <div className={styles.orgActivityText}>
              <p>{props.day} de {formatTime(startHours)}:{formatTime(startMinutes)} à {formatTime(endHours)}:{formatTime(endMinutes)}  - de {detailStartAge} à {detailEndAge} ans</p>
            </div>
          );
}

export default OrgActivityDetail;