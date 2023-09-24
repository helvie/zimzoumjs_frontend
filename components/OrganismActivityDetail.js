import styles from '../styles/Home.module.css'

////////////////////////////////////////////////////////////////////////////////

function OrgActivityDetail(props) {
  console.log(props)

  const {
    day,
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
              <p>{day} de {formatTime(startHours)}:{formatTime(startMinutes)} à {formatTime(endHours)}:{formatTime(endMinutes)}  - de {detailStartAge} à {detailEndAge} ans</p>
            </div>
          );
}

export default OrgActivityDetail;