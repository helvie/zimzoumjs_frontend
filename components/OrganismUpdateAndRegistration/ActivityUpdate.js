import styles from '../../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil, faTrash, faCaretLeft, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import stylesGeneral from '../../styles/General.module.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import RegistrationRegularClass from './RegistrationRegularClass';
// import ActivityDetailUpdate from './ActivityDetailUpdate';
import RegularClassDetailForm from './RegularClassDetailForm';
import stylesRegistration from '../../styles/Registration.module.css';
import moment from 'moment';
import RegularClassForm from './RegularClassForm';
import { daysList, availabilityList, gradeList } from '../../utils/dataObjects';
import { useSelector } from 'react-redux';


function ActivityUpdate(props) {

  const token = useSelector((state) => state.user.token);

  const data = props.data;

  const currentDate = moment().format('YYYY-MM-DD');

  const [detailsArray, setDetailsArray] = useState([]);

  const [activityData, setActivityData] = useState({
    category: data.category,
    activity: data.activity,
    startAge: data.startAge,
    endAge: data.endAge,
    description: data.description,
    id:data._id
  });

  const saveUpdatedActivity = () => {

      // Envoi sur le back update
      fetch('http://localhost:3000/registration/updateActivity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token, activityData: activityData, detailData: detailsArray })
      })
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            console.log("ok")
            return true
          }
          else {
            return false
          }
        })
       }



  // Fonction de mise à jour générique
  const updateActivityField = (fieldName, fieldValue) => {
    setActivityData((prevActivityData) => ({
      ...prevActivityData,
      [fieldName]: fieldValue,
    }));
  };

  const handleAddDetail = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire
    setDetailsArray([...detailsArray, { id: detailsArray.length + 1, data: {} }]);
  };

  const handleRemoveDetail = () => {
    setDetailsArray((prevState) => prevState.slice(0, -1));
  };

  const handleDetailDataChange = (detailId, fieldName, fieldValue) => {
    setDetailsArray((prevState) =>
      prevState.map((detail) =>
        detail.id === detailId ?
          { ...detail, data: { ...detail.data, [fieldName]: fieldValue, availabilityDate: currentDate } } : detail
      )
    );
  };


  useEffect(() => {
    const newDetails = data.regularClassesDetails.map((regularClassDetail, i) => {
      const {
        _id,
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
          _id,
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
    category,
    regularClassesDetails,
    visible,
    _id,
  } = props.data;

  // Ajoutez une fonction pour gérer le clic sur l'icône faPencil
  const handleEditClick = () => {
    // Mettez à jour l'état isEditingActivity avec l'ID de l'activité
    props.onEditActivity(_id);
  };


  const details = detailsArray.map((data, i) => {

    return (

      <RegularClassDetailForm key={i} data={data.data} onFieldChange={(fieldName, fieldValue) => handleDetailDataChange(data.id, fieldName, fieldValue)} />

    )

  });

  return (

    <div className={styles.activityBeforeUpdate}>
      <div className={stylesRegistration.activityForm}>

        <RegularClassForm activity={activityData.activity} category={activityData.category} startAge={activityData.startAge}
          endAge={activityData.endAge} description={activityData.description} updateActivityField={updateActivityField} />
      </div>
      {/* <FontAwesomeIcon
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
                  console.log("checked : " + e.target.checked);
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
        <p>{description}</p> */}




      <div className={styles.detailsContainer}>
        {details}
      </div>
      <div className={stylesRegistration.buttonContainer}>

        <div className="w-full flex flex-row">
          <button
            onClick={handleAddDetail}
            className={stylesRegistration.buttonRemoveAdd}>
            Ajouter un créneau
          </button>

          {details.length > 0 &&
            <button onClick={handleRemoveDetail}
              className={stylesRegistration.buttonRemoveAdd}>
              Supprimer le dernier créneau
            </button>}
        </div>
        <div className="w-full">

          {/* ------------------------ VALIDATION FORMULAIRE ------------------------------ */}

          <button
            onClick={() => saveUpdatedActivity()}
            // type="submit"
            className={stylesRegistration.validButton}
          >Enregistrer</button>
        </div>
      </div>
    </div>
    //   )
  );
}

export default ActivityUpdate;