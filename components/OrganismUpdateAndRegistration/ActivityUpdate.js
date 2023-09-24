import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import RegularclassdetailForm from './RegularclassdetailForm';
import stylesRegistration from '../../styles/Registration.module.css';
import moment from 'moment';
import RegularclassForm from './RegularclassForm';
import { useSelector } from 'react-redux';
import { BACKEND_URL } from '../../utils/urls';

///////////////////////////////////////////////////////////////////////////////////

function ActivityUpdate(props) {

  const currentDate = moment().format('YYYY-MM-DD');
  const token = useSelector((state) => state.user.token);
  const [errors, setErrors] = useState({});
  
  const [activityData, setActivityData] = useState(props.data); 
  const setIsEditingActivity = props.setIsEditingActivity;
  const [detailsArray, setDetailsArray] = useState([]); // Stockage des données de créneaux d'activités

  //ooooooooooooooooooo Enregistrement modification activité oooooooooooooooooooooooo

  const saveUpdatedActivity = () => {

    const validationErrors = {};

    //---------------------------- Contrôles formulaires -----------------------------

    detailsArray.forEach((detail) => {
      const detailErrors = {};

      if (detail.data.detailStartAge >= detail.data.detailEndAge) {
        detailErrors.age = "L'âge maximum doit être supérieur à l'âge minimum";
      }

      if (!detail.data.animator) {
        detailErrors.animator = "Veuillez indiquer l'animateur";
      } else if (detail.data.animator.length < 2) {
        detailErrors.animator = "Le nom de l'animateur doit contenir au moins 2 caractères";
      }

      validationErrors[detail.data._id] = detailErrors;

      if (activityData.startAge >= activityData.endAge) {
        validationErrors.age = `Supérieur âge max.`;
      }

      const validateText = (description) => {
        const invalidCharsRegex = /[&\\+*=#%~\|[\]{}]/;
        return !invalidCharsRegex.test(description);
      };

      if (!activityData.description) {
        validationErrors.description = "Veuillez remplir le champ description";
      } else if (!validateText(activityData.description)) {
        validationErrors.description = "La description ne doit pas contenir les caractères spéciaux";
      }

      if (!activityData.activity) {
        validationErrors.activity = "Veuillez indiquer l'activité";
      } else if (!validateText(activityData.activity)) {
        validationErrors.activity = "L'activité ne doit pas contenir les caractères spéciaux";
      }
    });

    setErrors(validationErrors);

    const hasErrors = Object.keys(validationErrors).some((key) =>
      Object.keys(validationErrors[key]).length > 0
    );

    //--------------------------- Enregistrement en BDD -----------------------------

    if (!hasErrors) {
      fetch(`${BACKEND_URL}/registration/updateActivity`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token, activityData: activityData, detailData: detailsArray })
      })
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            setActivityData(data.updatedActivity)
            props.updateActivityParent();
            props.updateIsEditingActivity();
          } else {
            console.error("L'enregistrement a échoué");
          }
        })
        .catch(error => {
          console.error("Une erreur s'est produite lors de l'enregistrement :", error);
        });
    }
    else {
      console.log(errors)
    }
  };

  //ooooooooo Actualisation données du parent après MàJ formulaire activité oooooooo

  const updateActivityField = (fieldName, fieldValue) => {
    setActivityData((prevActivityData) => ({
      ...prevActivityData,
      [fieldName]: fieldValue,
    }));
  };

  //oooooooooooooooooooooo Ajout d'un créneau d'activité oooooooooooooooooooooooooooooo


  const handleAddDetail = (e) => {
    e.preventDefault();
    setDetailsArray([...detailsArray, { id: detailsArray.length + 1, data: {} }]);
  };

  //ooooooooooooooo Suppression du dernier créneau d'activité affiché ooooooooooooooooo

  const handleRemoveDetail = () => {
    setDetailsArray((prevState) => prevState.slice(0, -1));
  };

  //ooooooooooooooo Mise à jour des données d'un créneau d'activité oooooooooooooooooo

  const handleDetailDataChange = (detailId, fieldName, fieldValue) => {
    setDetailsArray((prevState) =>
      prevState.map((detail) =>
        detail.id === detailId ?
          { ...detail, data: { ...detail.data, [fieldName]: fieldValue, availabilityDate: currentDate } } : detail
      )
    );
  };

  //oooooooooooooo Stockage données d'activité dans tableau qui oooooooooooooooooooo
  //oooooooooo sert à gérer les ajouts et suppressions de créneaux ooooooooooooooooo

  useEffect(() => {
    const newDetails = activityData.regularclassesdetails.map((regularclassdetail, i) => {
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
      } = regularclassdetail;

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

    setDetailsArray(newDetails);
  }, [activityData.regularclassesdetails]);

  //ooooooooooooooooooooooooo Affichage créneaux d'activités oooooooooooooooooooooooo

  const details = detailsArray.map((data, i) => {
    return (
      <RegularclassdetailForm
        key={i}
        data={data.data}
        onFieldChange={(fieldName, fieldValue) => handleDetailDataChange(data.id, fieldName, fieldValue)}
        errors={errors[data.data._id]}
      />
    )
  });

  ////////////////////////////////////////////////////////////////////////////////

  return (
    activityData ? (
      <div className={styles.activityBeforeUpdate}>

        {/* -------------------- Formulaire partie activité ------------------- */}

        <div className={stylesRegistration.activityForm}>
          <RegularclassForm
            activity={activityData.activity}
            category={activityData.category}
            startAge={activityData.startAge}
            endAge={activityData.endAge}
            description={activityData.description}
            updateActivityField={updateActivityField}
            errors={errors}
          />
        </div>

        {/* ---------------Formulaire partie créneaux d'activité ------------- */}

        <div className={styles.detailsContainer}>
          {details}
        </div>

        {/* ------------------- Bouton ajout ou suppression ---------------- */}

        <div className={stylesRegistration.buttonContainer}>
          <div className="w-full flex flex-row">
            <button
              onClick={handleAddDetail}
              className={stylesRegistration.buttonRemoveAdd}
            >
              Ajouter un créneau
            </button>

            {details.length > 0 && (
              <button onClick={handleRemoveDetail} className={stylesRegistration.buttonRemoveAdd}>
                Supprimer le dernier créneau
              </button>
            )}

          </div>

          {/* ------------------------ VALIDATION FORMULAIRE ------------------------------ */}
          
          <div className="w-full">
            {errors.activityUpdate && (
              <p className={stylesRegistration.error}>{errors.activityUpdate}</p>
            )}

            <button
              onClick={() => saveUpdatedActivity()}
              className={stylesRegistration.validButton}
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
}

export default ActivityUpdate;