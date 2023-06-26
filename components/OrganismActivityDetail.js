import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faVideo } from '@fortawesome/free-solid-svg-icons';
function OrgActivityDetail(props) {
    console.log(props.detail)
    if(props.status==0){
          return (
    <div className={styles.orgActivityContainer} style={props.style}>
      <p>{props.activity}</p>
      <p>{props.activity}{props.detail.age}{props.detail.day}{props.detail.hours}</p>

    </div>
  );
    }
    else{
        return (
            <div className={styles.orgActivityContainer} style={props.style}>
              <p>{props.activity}</p>
              <p>{props.activity}{props.detail.age}{props.detail.day}{props.detail.hours}</p>

            </div>
          );
    }


}

export default OrgActivity;