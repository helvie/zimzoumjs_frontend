import React, { useState, useEffect } from 'react';
import stylesRegistration from '../../styles/Registration.module.css';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SelectAge from '../SmallElements/SelectAge';
import RegularClassDetailForm from './RegularClassDetailForm';
import moment from 'moment';
import { categoryList, gradeList } from '../../utils/dataObjects';
import { useSelector } from 'react-redux';
import RegularClassForm from './RegularClassForm';

//----------------------------------------------------------------------------------------

function RegistrationRegularClass(props) {

  const actData = props.data;

  // const activityData={

  // }

  // const [category, setCategory] = useState(activityUpdate ? actData.category : '');
  // const [startAge, setStartAge] = useState(0);
  // const [endAge, setEndAge] = useState(99);
  // const [description, setDescription] = useState('');
  // const [visible, setVisible] = useState('');
  // const [activity, setActivity] = useState('');

  const [details, setDetails] = useState([]);
  const [errors, setErrors] = useState({});
  // const [activityData, setActivityData] = useState({});

  const token = useSelector((state) => state.user.token);

  const activityUpdate = props.activityUpdate;

  const regularClassesDetails = props.data.regularClassesDetails;

  const newDetails = regularClassesDetails.map((regularClassDetail, i) => {
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
  setDetails([...details, ...newDetails]);
  // handleEnfantDataChange = (enfantId, fieldName, fieldValue)

  // Utilisez useEffect pour remplir les états avant de les afficher
  useEffect(() => {
    // Mettez ici la logique pour remplir les états en fonction de la valeur de activityUpdate
    if (activityUpdate) {
      setCategory(actData.category);
      setStartAge(actData.startAge);
      setEndAge(actData.endAge);
      setDescription(actData.description);
      setVisible(actData.visible);
      setActivity(actData.activity);
    }
  }, [activityUpdate]); // Déclenche l'effet à chaque changement de activityUpdate

  const handleAddDetail = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire
    setDetails([...details, { id: details.length + 1, data: {} }]);
    setErrors({});
  };

  const handleRemoveDetail = () => {
    setDetails((prevState) => prevState.slice(0, -1));
    setErrors({});
  };

  const handleDetailDataChange = (detailId, fieldName, fieldValue) => {
    setDetails((prevState) =>
      prevState.map((detail) =>
      detail.id === detailId ?
          { ...detail, data: { ...detail.data, [fieldName]: fieldValue, availabilityDate: currentDate } } : detail
      )
    );
    setErrors((prevErrors) => ({ ...prevErrors, [detailId]: {} }));
  };


  const currentDate = moment().format('YYYY-MM-DD');

  //-------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------

  const registrationData = () => {

    return new Promise((resolve, reject) => {

      const dataActivity = {

        token: token,

        regularClass: {
          category,
          startAge,
          endAge,
          activity,
          description,
          visible,
          valid: 1
        },

        regularClassesDetails: details
      };


      fetch('http://localhost:3000/registration/activityRegistration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataActivity })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Registration successful:', data);
          resolve();
        })
        .catch((error) => {
          console.error('Registration failed:', error);
          reject(error);
        });

    });
  };

  //----------------------------------------------------------------------------------------------

  const handleFormSubmit = (e) => {

    console.log("handleFormSubmit lancé")
    e.preventDefault(); // Empêche le rechargement de la page
    setErrors({})

    const validationErrors = {};

    // Vérifier les erreurs pour chaque enfant
    details.forEach((detail) => {
      const detailErrors = {};

      if (detail.data.detailStartAge >= detail.data.detailEndAge) {
        detailErrors.detailEndAge = "L'âge maximum doit être supérieur à l'âge minimum";
      }

      if (!detail.data.animator) {
        detailErrors.animator = "Veuillez indiquer l'animateur";
      } else if (detail.data.animator.length < 2) {
        detailErrors.animator = "Le nom de l'animateur doit contenir au moins 2 caractères";
      }

      validationErrors[detail.id] = detailErrors;

      if (startAge >= endAge) {
        validationErrors.ageRange = `L'âge minimum ${detail.id} doit être inférieur à l'âge maximum`;
      }

      const validateText = (description) => {
        const invalidCharsRegex = /[&\\+*=#%~\|[\]{}]/;
        return !invalidCharsRegex.test(description);
      };

      if (!description) {
        validationErrors.description = "Veuillez remplir le champ 'Description'";
      } else if (!validateText(description)) {
        validationErrors.description = "La description ne peut pas contenir les caractères spéciaux '& \\ + * = # % ~ | [ ] { }'";
      }

      if (!activity) {
        validationErrors.activity = "Veuillez remplir le champ 'Activity'";
      } else if (!validateText(activity)) {
        validationErrors.description = "La description ne peut pas contenir les caractères spéciaux '& \\ + * = # % ~ | [ ] { }'";
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        ...validationErrors,
      }));


      // if (Object.keys(validationErrors).length > 0) {
      //   setErrors(validationErrors);
      //   return;
      // }
    });

    registrationData();

  };

    //-----------------------------------------------------------------------------------------------

  return (

    <form className="w-full" onSubmit={handleFormSubmit}>

      <div className={stylesRegistration.activityForm}>

        <RegularClassForm/>


{/* ------------------------- CRENEAUX ACTIVITE ------------------------------ */}

        {details.map((detail) => (
          <div key={detail.id}>
            <RegularClassDetailForm
              data={detail.data}
              onFieldChange={(fieldName, fieldValue) => handleDetailDataChange(detail.id, fieldName, fieldValue)}
            />
            {errors[detail.id] && (
              <div>
                {errors[detail.id].detailEndAge && (
                  <p className={stylesRegistration.error}>{errors[detail.id].detailEndAge}</p>
                )}
                {errors[detail.id].animator && (
                  <p className={stylesRegistration.error}>{errors[detail.id].animator}</p>
                )}
              </div>
            )}
          </div>
        ))}

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
              type="submit"
              className={stylesRegistration.validButton}
            >Enregistrer</button>
          </div>
        </div>
      </div>

    </form>

  );

}

export default RegistrationRegularClass;
