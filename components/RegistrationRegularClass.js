import React, { useState, useEffect } from 'react';
import stylesRegistration from '../styles/Registration.module.css';
// import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { updateOrganismData, updateImage, updateDoc } from '../reducers/organism';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Header from './Header';
import stylesGeneral from '../styles/General.module.css';

//----------------------------------------------------------------------------------------


function RegistrationRegularClass() {

  const userToken = useSelector((state) => state.user.token)
  console.log(userToken)


  const [category, setCategory] = useState('');
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(99);
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState('');
  const [activity, setActivity] = useState('');

  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState({}); // State pour les erreurs

  const dispatch = useDispatch();

  const router = useRouter();

  //----------------------------------------------------------------------------------------

  // Effet pour réinitialiser les erreurs lorsque les champs sont modifiés
  useEffect(() => {
    setErrors({});
  }, [category, description]);

  //----------------------------------------------------------------------------------------


  const handleValidData = () => {
    const validationErrors = {};

    if (startAge >= endAge) {
      validationErrors.ageRange = "L'âge minimum doit être inférieur à l'âge maximum";
    }

    if (!animator) {
      validationErrors.animator = "Veuillez remplir le champ 'animateur'";
    } else if (animator.length < 2) {
      validationErrors.animator = "Le nom de l'animateur doit contenir au moins 2 caractères";
    } else if (!/^[a-zA-Z\sÀ-ÿ]+$/.test(animator)) {
      validationErrors.animator = "Le nom de l'animateur ne doit contenir que des lettres";
    }

    const validateDescription = (description) => {
      const invalidCharsRegex = /[&\\+*=#%~\|[\]{}]/;
      return !invalidCharsRegex.test(description);
    };

    if (!description) {
      validationErrors.description = "Veuillez remplir le champ 'Description'";
    } else if (!validateDescription(description)) {
      validationErrors.description = "La description ne peut pas contenir les caractères spéciaux '& \\ + * = # % ~ | [ ] { }'";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registrationData();

  };

  //----------------------------------------------------------------------------------------

  const resetForm = () => {

    setAvailability: availability,
      setStartAge(''),
      setEndAge(''),
      setDescription(''),
      setVisible(''),
      setActivity(''),
      setCategory(''),
      setErrors({});
  };

  //----------------------------------------------------------------------------------------
  const registrationData = () => {
    return new Promise((resolve, reject) => {
      const dataOfOrganism = {
        startAge: startAge,
        endAge: endAge,
        description: description,
        visible: visible,
        activity: activity,
        category: category,
        token: token,
      };

      fetch('http://localhost:3000/registration/organismRegistration', {
        method: 'POST',
        body: formData
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
  return (
    <main className={stylesGeneral.orgContent}>

      <Header />

      <div className={stylesRegistration.formContainer}>

        <div className={stylesRegistration.formBackground}>

          <h1 className={stylesRegistration.formTitle}>Données de l'organisme (publiques)</h1>

          <form className="w-full">
            <div className={stylesRegistration.inputRegistrationContainer2}>
              <p className={stylesRegistration.inputHoursTitle}>Heure de début</p>
              <div className={stylesRegistration.inputTimeContainer}>
                <select
                  value={startHours}
                  onChange={(e) => setStartHours(parseInt(e.target.value))}
                  className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                  id="startHours"
                >{hoursMenu}</select>

                <select
                  value={startMinutes}
                  onChange={(e) => setStartMinutes(parseInt(e.target.value))}
                  className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                  id="startMinutes"
                >{minutesMenu}
                </select>
              </div>
            </div>
            {/* //-------------------------------------------------------------------------------- */}
            <div className={stylesRegistration.inputRegistrationContainer2}>
              <p className={stylesRegistration.inputHoursTitle}>Heure de fin</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <select
                  value={endHours}
                  onChange={(e) => setEndHours(parseInt(e.target.value))}
                  className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                  id="endHours"
                >{hoursMenu}</select>

                <select
                  value={endMinutes}
                  onChange={(e) => setEndMinutes(parseInt(e.target.value))}
                  className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                  id="endMinutes"
                >{minutesMenu}
                </select>
              </div>
            </div>

            <div className={stylesRegistration.inputRegistrationContainer2}>
            <p className={stylesRegistration.inputHoursTitle}>Age</p>

              <div className={stylesRegistration.inputTimeContainer}>

                <select
                  value={startAge}
                  onChange={(e) => setStartAge(parseInt(e.target.value))}
                  className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                  id="startAge"
                >
                  <option value="" disabled>
                    Age maximum
                  </option>
                  {ageMenu}
                </select>

                <select
                  value={endAge}
                  onChange={(e) => setEndAge(parseInt(e.target.value))}
                  className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                  id="endAge"
                >
                  <option value="" disabled>
                    Age maximum
                  </option>
                  {ageMenu}
                </select>
              </div>
            </div>



            <FormControlLabel
              className={stylesRegistration.switch}
              control={
                <Switch
                  checked={visible}
                  onChange={(e) => setVisible(e.target.checked)}
                  color="default"
                />
              }
              label="Activité visible par l'internaute"

              style={{ color: visible ? '#000000' : '#a0a7b2', marginBottom: '50px' }} />

            <div className={stylesRegistration.inputRegistrationContainer}>
              <select
                className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="">Jour</option>
                <option value="lundi">lundi</option>
                <option value="mardi">mardi</option>
                <option value="mercredi">mercredi</option>
                <option value="jeudi">jeudi</option>
                <option value="vendredi">vendredi</option>
                <option value="samedi">samedi</option>
                <option value="dimanche">dimanche</option>
                <option value="variable">jour variable</option>

              </select>
            </div>

            <div className={stylesRegistration.inputRegistrationContainer}>
              <select
                className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="">Niveau</option>
                <option value="tous niveaux">Tous niveaux</option>
                <option value="debutant">Débutant</option>
                <option value="debInter">Débutant-inter</option>
                <option value="inter">Intermédiaire</option>
                <option value="interAvance">Inter-avancé</option>
                <option value="avance">Avancé</option>

              </select>
            </div>

            <div className={stylesRegistration.inputRegistrationContainer}>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Animateur"
                aria-label="Animator"
                id="Animator"
                onChange={(e) => setAnimator(e.target.value)}
                value={description}
              />
              {errors.animator && <p className={stylesRegistration.error}>{errors.animator}</p>}
            </div>

            <div className={stylesRegistration.inputRegistrationContainer}>
              <textarea
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Description"
                aria-label="description"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              {errors.description && <p className={stylesRegistration.error}>{errors.description}</p>}
            </div>


            <div>
              <button
                className={stylesRegistration.validButton}
                type="button"
                onClick={handleValidData}
                disabled={Object.keys(errors).length > 0} // Désactiver le bouton si des erreurs sont présentes
              >
                Suivant
              </button></div>


          </form>
        </div>
      </div>
    </main>
  );
}

export default RegistrationRegularClass;