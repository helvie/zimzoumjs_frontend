import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import stylesRegistration from '../../styles/Registration.module.css';
import moment from 'moment';
import { useRouter } from 'next/router';

import RegularClassForm from './RegularClassForm';
import RegularClassDetailForm from './RegularClassDetailForm';
import { BACKEND_URL } from '../../utils/urls';

////////////////////////////////////////////////////////////////////////////////

function RegistrationRegularClass() {

  const currentDate = moment().format('YYYY-MM-DD');

  const router = useRouter();

  const [details, setDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const [activityData, setActivityData] = useState({
    category:"",
    startAge:"",
    endAge:"",
    activity:"",
    description:"",
    visible:false,
    valid: true,
  });

  const token = useSelector((state) => state.user.token);


  //oooooooooooooooooooooo Ajout d'un créneau d'activité oooooooooooooooooooooooooooooo

  const updateActivityField = (fieldName, fieldValue) => {
    setActivityData((prevActivityData) => ({
      ...prevActivityData,
      [fieldName]: fieldValue,
    }));
  };

  const handleAddDetail = (e) => {
    e.preventDefault(); 
    setDetails([...details, { id: details.length + 1, data: {} }]);
    setErrors({});
  };

  //ooooooooooooooo Suppression du dernier créneau d'activité affiché ooooooooooooooooo

  const handleRemoveDetail = () => {
    setDetails((prevState) => prevState.slice(0, -1));
    setErrors({});
  };

  //ooooooooooooooo Mise à jour des données d'un créneau d'activité oooooooooooooooooo

  const handleDetailDataChange = (detailId, fieldName, fieldValue) => {
    setDetails((prevState) =>
      prevState.map((detail) =>
        detail.id === detailId ?
          { ...detail, data: { ...detail.data, [fieldName]: fieldValue, availabilityDate: currentDate } } : detail
      )
    );
    setErrors((prevErrors) => ({ ...prevErrors, [detailId]: {} }));
  };

  //ooooooooooooo Enregistrement des nouvelles données en bases de données ooooooooooo

  const registrationData = () => {

    return new Promise((resolve, reject) => {

      const dataActivity = {

        token: token,

        regularClass: activityData,

        regularClassesDetails: details
      };

      fetch(`${BACKEND_URL}/registration/activityRegistration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataActivity })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Registration successful:', data);
          resolve();
          router.push('/');

        })
        .catch((error) => {
          console.error('Registration failed:', error);
          reject(error);
        });

    });
  };

  //oooooo Vérification des erreurs de formulaires avant enregistrement en BDD ooooooo

  const handleFormSubmit = (e) => {

    console.log("handleFormSubmit lancé")
    e.preventDefault();
    setErrors({})

    const validationErrors = {};


    if (activityData.startAge >= activityData.endAge) {
      validationErrors.age = `L'âge mini supérieur à âge maxi`;
    
    }

    const validateText = (description) => {
      const invalidCharsRegex = /[&\\+*=#%~\|[\]{}]/;
      return !invalidCharsRegex.test(description);
    };

    if (!activityData.description) {
      validationErrors.description = "Veuillez remplir le champ 'Description'";
    } else if (!validateText(activityData.description)) {
      validationErrors.description = "La description ne peut pas contenir les caractères spéciaux '& \\ + * = # % ~ | [ ] { }'";
    }

    if (!activityData.activity) {
      validationErrors.activity = "Veuillez remplir le champ 'Activity'";
    } else if (!validateText(activityData.activity)) {
      validationErrors.description = "Le champ activité ne peut pas contenir les caractères spéciaux '& \\ + * = # % ~ | [ ] { }'";
    }
    



    details.forEach((detail) => {
      const detailErrors = {};
      console.log("ages "+detail.data.detailStartAge+" "+detail.data.detailEndAge)

      if (detail.data.detailStartAge >= detail.data.detailEndAge) {
        detailErrors.detailEndAge = "L'âge maximum doit être supérieur à l'âge minimum";
      }

      if (!detail.data.animator) {
        detailErrors.animator = "Veuillez indiquer l'animateur";
      } else if (detail.data.animator.length < 2) {
        detailErrors.animator = "Le nom de l'animateur doit contenir au moins 2 caractères";
      }

      validationErrors[detail.id] = detailErrors;



    });

      setErrors((prevErrors) => ({
        ...prevErrors,
        ...validationErrors,
      }));

    registrationData();

  };

  ////////////////////////////////////////////////////////////////////////////////

  return (

    <form className="w-full" onSubmit={handleFormSubmit}>

      <div className={stylesRegistration.activityForm}>

        <RegularClassForm 
        updateActivityField={updateActivityField}
        errors={errors}/>


        {/* ------------------------- CRENEAUX ACTIVITE ------------------------------ */}

        {details.map((detail) => (
          <div key={detail.id}>
            <RegularClassDetailForm
              data={detail.data}
              onFieldChange={(fieldName, fieldValue) => handleDetailDataChange(detail.id, fieldName, fieldValue)}
              errors={errors[detail.id]}
            />

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
