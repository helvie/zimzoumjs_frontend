import React, { useState, useEffect } from 'react';
import stylesRegistration from '../styles/Registration.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Header from './Header';
import stylesGeneral from '../styles/General.module.css';
import SelectTime from './SelectTime';
import SelectAge from './SelectAge';

//----------------------------------------------------------------------------------------

function RegularClassDetailForm() {

  const [availability, setAvailability] = useState('');
  const [detailStartAge, setDetailStartAge] = useState(0);
  const [detailEndAge, setDetailEndAge] = useState(99);
  const [day, setDay] = useState('');
  const [startHours, setStartHours] = useState('');
  const [endHours, setEndHours] = useState('');
  const [startMinutes, setStartMinutes] = useState('');
  const [endMinutes, setEndMinutes] = useState('');
  const [grade, setGrade] = useState('');
  const [animator, setAnimator] = useState('');
  const [errors, setErrors] = useState({}); // State pour les erreurs
  const [detailDescription, setDetailDescription] = useState(); // State pour les erreurs

  const router = useRouter();

  console.log(
    " - availability: "+ availability,
    " - detailStartAge: "+ detailStartAge,
    " - detailEndAge: "+ detailEndAge,
    " - detailDescription: "+ detailDescription,
    " - day: "+ day,
    " - startHours: "+ startHours,
    " - endHours: "+ endHours,
    " - startMinutes: "+ startMinutes,
    " - endMinutes: "+ endMinutes,

    " - grade: "+ grade,
    " - animator: "+ animator,

  )



  //----------------------------------------------------------------------------------------

  useEffect(() => {
    setErrors({});
  }, [animator]);


  const handleValidData = () => {
    const validationErrors = {};

    if (detailStartAge >= detailEndAge) {
      validationErrors.detailEndAge = "Doit être être supérieur à l'âge mini";
    }

    if (!animator) {
      validationErrors.animator = "Veuillez indiquer l'animateur";
    } else if (animator.length < 2) {
      validationErrors.animator = "Le nom de l'animateur doit contenir au moins 2 caractères";
    } else if (!/^[a-zA-Z\sÀ-ÿ]+$/.test(animator)) {
      validationErrors.animator = "Le nom de l'animateur ne doit contenir que des lettres";
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registrationData();

  };

  //----------------------------------------------------------------------------------------

  const resetForm = () => {

      setDetailStartAge(''),
      setDetailEndAge(''),
      setDay(''),
      setStartTime(''),
      setEndTime(''),
      setGrade(''),
      setAnimator(''),
      setDetailDescription(''),
      setErrors({});
  };

  //----------------------------------------------------------------------------------------
  const registrationData = () => {
    return new Promise((resolve, reject) => {
      const regularClassDetailData = {
        availability: availability,
        detailStartAge: detailStartAge,
        detailEndAge: detailEndAge,
        detailDescription: detailDescription,
        day: day,
        startTime: startTime,
        endTime: endTime,
        grade: grade,
        animator: animator,
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

          <form className="w-full">


            <div className={stylesRegistration.detailActivityForm}>

              {/* //--------------------------------------------------------------------------------------- */}

              <div className={stylesRegistration.formDetailActivityElement}>
                <div className={stylesRegistration.formDetailActivitySubelement}>
                  <div className={stylesRegistration.inputRegistrationContainer}>
                  <p className={stylesRegistration.inputTitle}>Disponibilité</p>
                    <select
                      className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                      id="availability"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                    >
                      <option value="">Sans indication</option>
                      <option value="plenty">Disponible</option>
                      <option value="limited">Quelques places disponibles</option>
                      <option value="full">Complet</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* //--------------------------------------------------------------------------------------- */}


              <div className={stylesRegistration.formDetailActivityElement}>
                <div className={stylesRegistration.formDetailActivitySubelement}>
                  <div className={stylesRegistration.inputRegistrationContainer2}>
                    <p className={stylesRegistration.inputTitle}>Age minimum</p>
                    <div className={stylesRegistration.inputSelectContainer}>
                      <SelectAge value={detailStartAge} onChange={(e) => setDetailStartAge(parseInt(e.target.value))} maxValue={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* //--------------------------------------------------------------------------------------- */}


              <div className={stylesRegistration.formDetailActivityElement}>
                <div className={stylesRegistration.formDetailActivitySubelement}>
                  <div className={stylesRegistration.inputRegistrationContainer2}>
                    <p className={stylesRegistration.inputTitle}>Age maximum</p>
                    <div className={stylesRegistration.inputSelectContainer}>
                      <SelectAge value={detailEndAge} onChange={(e) => setDetailEndAge(parseInt(e.target.value))} maxValue={24} />
                    </div>
                    {errors.detailEndAge && <p className={stylesRegistration.error}>{errors.detailEndAge}</p>}

                  </div>
                </div>
              </div>

              {/* //--------------------------------------------------------------------------------------- */}

              <div className={stylesRegistration.formDetailActivityElement}>
                <div className={stylesRegistration.formDetailActivitySubelement}>
                  <div className={stylesRegistration.inputRegistrationContainer}>
                  <p className={stylesRegistration.inputTitle}>Jour</p>

                    <select
                      className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                      id="day"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    >
                      <option value="undefined" defaultValue>Indéfini</option>
                      <option value="lundi">Lundi</option>
                      <option value="mardi">Mardi</option>
                      <option value="mercredi">Mercredi</option>
                      <option value="jeudi">Jeudi</option>
                      <option value="vendredi">Vendredi</option>
                      <option value="samedi">Samedi</option>
                      <option value="dimanche">Dimanche</option>

                    </select>
                  </div>
                </div>
              </div>

              {/* //--------------------------------------------------------------------------------------- */}

              <div className={stylesRegistration.formDetailActivityElement}>
                <div className={stylesRegistration.formDetailActivitySubelement}>
                  <div className={stylesRegistration.inputRegistrationContainer2}>
                    <p className={stylesRegistration.inputTitle}>Heure de début</p>
                    <div className={stylesRegistration.inputSelectContainer}>
                      <SelectTime value={startHours} onChange={(e) => setStartHours(parseInt(e.target.value))} maxValue={24} />
                      <SelectTime value={startMinutes} onChange={(e) => setStartMinutes(parseInt(e.target.value))} maxValue={60} />
                    </div>
                  </div>
                </div>
              </div>

              {/* //--------------------------------------------------------------------------------------- */}

              <div className={stylesRegistration.formDetailActivityElement}>
                <div className={stylesRegistration.formDetailActivitySubelement}>
                  <div className={stylesRegistration.inputRegistrationContainer2}>
                    <p className={stylesRegistration.inputTitle}>Heure de fin</p>
                    <div className={stylesRegistration.inputSelectContainer}>
                      <SelectTime value={endHours} onChange={(e) => setEndHours(parseInt(e.target.value))} maxValue={24} />
                      <SelectTime value={endMinutes} onChange={(e) => setEndMinutes(parseInt(e.target.value))} maxValue={60} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={stylesRegistration.formDetailActivityElement}>
                <div className={stylesRegistration.formDetailActivitySubelement}>
                  <div className={stylesRegistration.inputRegistrationContainer}>
                  <p className={stylesRegistration.inputTitle}>Niveau</p>
                    <select
                      className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                      id="grade"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                    >
                      <option value="tous niveaux" defaultValue>Tous niveaux</option>                      <option value="debutant">Débutant</option>
                      <option value="debInter">Débutant-inter</option>
                      <option value="inter">Intermédiaire</option>
                      <option value="interAvance">Inter-avancé</option>
                      <option value="avance">Avancé</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* //--------------------------------------------------------------------------------------- */}

              <div className={stylesRegistration.formDetailActivityElement}>
                <div className={stylesRegistration.formDetailActivitySubelement}>
                  <div className={stylesRegistration.inputRegistrationContainer}>
                  <p className={stylesRegistration.inputTitle}>Animateur</p>

                    <input
                      className={stylesRegistration.inputRegistration}
                      type="text"
                      placeholder="John Doe"
                      aria-label="Animator"
                      id="Animator"
                      onChange={(e) => setAnimator(e.target.value)}
                      value={animator}
                    />
                    {errors.animator && <p className={stylesRegistration.error}>{errors.animator}</p>}
                  </div>
                </div>
              </div>

{/* //--------------------------------------------------------------------------------------- */}

            <div className={stylesRegistration.buttonAndDescriptionContainer}>

            <div className={stylesRegistration.inputRegistrationContainer3}>
              <textarea
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Description du cours (facultatif)"
                aria-label="detailDescription"
                id="detailDescription"
                onChange={(e) => setDetailDescription(e.target.value)}
                value={detailDescription}
              />
              {errors.detailDescription && <p className={stylesRegistration.error}>{errors.detailDescription}</p>}
            </div>
              <button
                className={stylesRegistration.validButton}
                type="button"
                onClick={handleValidData}
                disabled={Object.keys(errors).length > 0} // Désactiver le bouton si des erreurs sont présentes
              >
                Suivant
              </button>
              
              </div>

            </div>




          </form>
        
  );
}

export default RegularClassDetailForm;