import styles from '../../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil, faTrash, faCaretLeft, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
// import OrgActivityDetailUpdate from './ActivityDetailUpdate';
import stylesGeneral from '../../styles/General.module.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { daysList } from '../../utils/dataObjects';
import { gradeList } from '../../utils/dataObjects';
import { availabilityList } from '../../utils/dataObjects';
import RegistrationRegularClass from './RegistrationRegularClass';
import ActivityDetailBeforeUpdate from './ActivityDetailBeforeUpdate';


// import OrgActivityDetailBeforeUpdate from './OrgActivityDetailBeforeUpdate';
// import ActivityDetailUpdate from './ActivityDetailUpdate';
function ActivityBeforeUpdate(props) {

  const data = props.data;

  // console.log("is editing "+props.isEditing)

  const [detailsArray, setDetailsArray] = useState([]);

  useEffect(() => {
    const newDetails = data.regularClassesDetails.map((regularClassDetail, i) => {
      const {
        availability,
        availabilityDate,
        detailStartAge,
        detailEndAge,
        day,
        startHours,
        startMinutes,
        endMinutes,
        endHours,
        grade,
        animator
      } = regularClassDetail;

      return {
        id: i,
        data: {
          availability,
          availabilityDate,
          detailStartAge,
          detailEndAge,
          day,
          startHours,
          startMinutes,
          endMinutes,
          endHours,
          grade,
          animator
        }
      };
    });

    // Mettre à jour le state avec le nouvel array newEnfants
    setDetailsArray(newDetails);
  }, [data.regularClassesDetails]); // Assurez-vous de n'appeler ceci qu'en cas de changement de data.regularClassesDetails

  const {
    startAge,
    endAge,
    activity,
    description,
    regularClassesDetails,
    visible,
    _id,
  } = props.data;

  // Ajoutez une fonction pour gérer le clic sur l'icône faPencil
  const handleEditClick = () => {
    // console.log("essai")
    // Mettez à jour l'état isEditingActivity avec l'ID de l'activité
    props.onEditActivity(_id);
  };

  // console.log(detailsArray)




  const details = detailsArray.map((data, i) => {

    return (


      <ActivityDetailBeforeUpdate key={i} detail={data.data} />
    )
    // <div key={i} className={styles.detailActivityBeforeUpdate}>
    //   <p>De {data.detailStartAge} à {data.detailEndAge} ans</p>
    //   <p>{daysList[data.day]} de {data.startHours}:{data.startMinutes ? data.startMinutes : "00"} à {data.endHours}:{data.endMinutes ? data.endMinutes : "00"}</p>
    //   <p>Niveau : {gradeList[data.grade]}</p>
    //   <p>Animateur : {data.animator}</p>
    //   <p>Disponibilité : {availabilityList[data.availability]}</p>
    //   <p>{i}</p>

    // </div>
    // />;

  });

  return (
    // props.isEditing ? (
    //   <div className={styles.orgDataUpdate} style={{ marginTop: "0px" }}>
    //     <p>C'est en édition</p>

    //     {/* <RegistrationRegularClass key={"1"} data={props.data} activityUpdate={true} /> */}
    //   </div>

    // ) : (
      <div className={styles.activityBeforeUpdate}>
        <div className="flex w-full flex-col items-center">
        <FontAwesomeIcon
          // key={i}
          style={{ color: '#000' }}
          onClick={handleEditClick}           
          icon={faPencil}
          className={styles.pencilIcon}
        />

        <h2>{activity}</h2>
        <p>(de {startAge} à {endAge} ans)</p>
        <div>
          <FormControlLabel
            className={styles.orgSwitchUpdate}
            control={
              <Switch
                checked={visible}
                onChange={async (e) => {
                  // console.log("checked : " + e.target.checked);
                  // await setOrgVisible(e.target.checked);
                  // divElements.orgVisible = e.target.checked;
                  // await handleFieldBlur({ type: "switch" }, "orgVisible");
                }}
                color="default"
              />
            }
            label={<span style={{ fontSize: '18px' }}>{visible ? 'Visible' : 'Non visible'}</span>}
            style={{ color: visible ? '#000000' : '#a0a7b2' }}
          />
        </div>
        <p>{description}</p>
        </div>
        <div className={styles.detailsContainer}>
          {details}
        </div>
      </div>
  //   )
  );
}

export default ActivityBeforeUpdate;