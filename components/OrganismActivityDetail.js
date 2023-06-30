import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faVideo } from '@fortawesome/free-solid-svg-icons';

function OrgActivityDetail(props) {
    // console.log(props)
        return (
            <div className={styles.orgActivityText}>
              <p>{props.day} de {props.startTime} à {props.endTime} - de {props.miniAge} à {props.maxiAge} ans</p>
              {/* <p>{props.activity}{props.age}{props.day}{props.hours}</p> */}

            </div>
          );



}

export default OrgActivityDetail;