import styles from '../styles/Home.module.css'

////////////////////////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////////////////////////

        return (
            <div className={styles.orgActivityText}>
              <p>{props.day} de {formatTime(startHours)}:{formatTime(startMinutes)} à {formatTime(endHours)}:{formatTime(endMinutes)}  - de {detailStartAge} à {detailEndAge} ans</p>
            </div>
          );
}

export default OrgActivityDetail;