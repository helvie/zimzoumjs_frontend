import React from 'react';
import SelectTime from './SelectTime';
import SelectAge from './SelectAge';
import stylesRegistration from '../styles/Registration.module.css';

function Enfant(props) {
  const handleInputChange = (fieldName, value) => {
    props.onFieldChange(fieldName, value);
  };

  return (
    <div className="w-full">
      <div className={stylesRegistration.detailActivityForm}>
        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.inputTitle}>Disponibilité</p>
              <select
                className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
                id="availability"
                value={props.data.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
              >
                <option value="">Sans indication</option>
                <option value="plenty">Disponible</option>
                <option value="limited">Quelques places disponibles</option>
                <option value="full">Complet</option>
              </select>
            </div>
          </div>
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer2}>
              <p className={stylesRegistration.inputTitle}>Age minimum</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <SelectAge
                  value={props.data.detailStartAge}
                  onChange={(value) => handleInputChange('detailStartAge', value)}
                  maxValue={98}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer2}>
              <p className={stylesRegistration.inputTitle}>Age maximum</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <SelectAge
                  value={props.data.detailEndAge}
                  onChange={(value) => handleInputChange('detailEndAge', value)}
                  maxValue={99}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.inputTitle}>Jour</p>
              <select
                className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
                id="day"
                value={props.data.day}
                onChange={(e) => handleInputChange('day', e.target.value)}
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

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer2}>
              <p className={stylesRegistration.inputTitle}>Heure de début</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <SelectTime
                  value={props.data.startHours}
                  onChange={(value) => handleInputChange('startHours', value)}
                  maxValue={24}
                />
                <SelectTime
                  value={props.data.startMinutes}
                  onChange={(value) => handleInputChange('startMinutes', value)}
                  maxValue={60}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer2}>
              <p className={stylesRegistration.inputTitle}>Heure de fin</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <SelectTime
                  value={props.data.endHours}
                  onChange={(value) => handleInputChange('endHours', value)}
                  maxValue={24}
                />
                <SelectTime
                  value={props.data.endMinutes}
                  onChange={(value) => handleInputChange('endMinutes', value)}
                  maxValue={60}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.inputTitle}>Niveau</p>
              <select
                className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
                id="grade"
                value={props.data.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
              >
                <option value="tous niveaux" defaultValue>Tous niveaux</option>
                <option value="debutant">Débutant</option>
                <option value="debInter">Débutant-inter</option>
                <option value="inter">Intermédiaire</option>
                <option value="interAvance">Inter-avancé</option>
                <option value="avance">Avancé</option>
              </select>
            </div>
          </div>
        </div>

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
                onChange={(e) => handleInputChange('animator', e.target.value)}
                value={props.data.animator}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enfant;

// import React, { useState, useEffect } from 'react';
// import stylesRegistration from '../styles/Registration.module.css';
// import SelectTime from './SelectTime';
// import SelectAge from './SelectAge';

// function Enfant(props) {
//   const handleInputChange = (fieldName, e) => {
//     props.onFieldChange(fieldName, e.target.value);
//   };
//   const [errors, setErrors] = useState({}); // State pour les erreurs
  
//   return (
//     <form className="w-full">
//       <div className={stylesRegistration.detailActivityForm}>        
      
      
      // <div className={stylesRegistration.formDetailActivityElement}>
      //     <div className={stylesRegistration.formDetailActivitySubelement}>
      //       <div className={stylesRegistration.inputRegistrationContainer2}>
      //         <p className={stylesRegistration.inputTitle}>Age minimum</p>
      //         <div className={stylesRegistration.inputSelectContainer}>
      //         <SelectAge value={data.minAge} 
      //         onChange={(value) => handleInputChange('minAge', value)} 
      //         maxValue={5} />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
        {/* <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.inputTitle}>Disponibilité</p>
              <select
                className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
                id="availability"
                value={props.data.availability}
                onChange={(e) => handleInputChange('avaibility', e)}
              >
                <option value="">Sans indication</option>
                <option value="plenty">Disponible</option>
                <option value="limited">Quelques places disponibles</option>
                <option value="full">Complet</option>
              </select>
            </div>
          </div>
        </div>



        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer2}>
              <p className={stylesRegistration.inputTitle}>Age maximum</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <SelectAge value={props.data.detailEndAge} 
                onChange={(e) => handleInputChange('endAge', parseInt(e.target.value))}                
                maxValue={99} />
              </div>
              {errors.detailEndAge && <p className={stylesRegistration.error}>{errors.detailEndAge}</p>}
            </div>
          </div>
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.inputTitle}>Jour</p>
              <select
                className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
                id="day"
                value={props.data.day}
                onChange={(e) => handleInputChange('day', e)}
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

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer2}>
              <p className={stylesRegistration.inputTitle}>Heure de début</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <SelectTime 
                value={props.data.startHours} 
                onChange={(e) => handleInputChange('startHours', parseInt(e.target.value))}                
                maxValue={24} />
                <SelectTime 
                value={props.data.startMinutes} 
                onChange={(e) => handleInputChange('startMinutes', parseInt(e.target.value))}                
                maxValue={60} />
              </div>
            </div>
          </div>
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer2}>
              <p className={stylesRegistration.inputTitle}>Heure de fin</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <SelectTime 
                value={props.data.endHours} 
                onChange={(e) => handleInputChange('endHours', parseInt(e.target.value))}                
                maxValue={24} />
                <SelectTime 
                value={props.data.endMinutes}                 
                onChange={(e) => handleInputChange('endMinutes', parseInt(e.target.value))}                
                maxValue={60} />
              </div>
            </div>
          </div>
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.inputTitle}>Niveau</p>
              <select
                className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
                id="grade"
                value={props.data.grade}
                onChange={(e) => handleInputChange('grade', e)}
              >
                <option value="tous niveaux" defaultValue>Tous niveaux</option>
                <option value="debutant">Débutant</option>
                <option value="debInter">Débutant-inter</option>
                <option value="inter">Intermédiaire</option>
                <option value="interAvance">Inter-avancé</option>
                <option value="avance">Avancé</option>
              </select>
            </div>
          </div>
        </div>

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
                onChange={(e) => handleInputChange('animator', e)}
                value={props.data.animator}
              />
              {errors.animator && <p className={stylesRegistration.error}>{errors.animator}</p>}
            </div>
          </div>
        </div>

        <div className={stylesRegistration.buttonAndDescriptionContainer}>
          <div className={stylesRegistration.inputRegistrationContainer3}>
            <textarea
              className={stylesRegistration.inputRegistration}
              type="text"
              placeholder="Description du cours (facultatif)"
              aria-label="detailDescription"
              id="detailDescription"
              //       <input type="text" value={props.data.input2} onChange={(e) => handleInputChange('input2', e)} />

              onChange={(e) => handleInputChange('detailDescription', e)}
              value={props.data.detailDescription}
            />
            {errors.detailDescription && <p className={stylesRegistration.error}>{errors.detailDescription}</p>}
          </div>
        </div> */}
      {/* </div>
    </form>
  );
}
export default Enfant; */}
// function RegularClassDetailForm(props) {
//   const [availability, setAvailability] = useState('');
//   const [detailStartAge, setDetailStartAge] = useState(0);
//   const [detailEndAge, setDetailEndAge] = useState(99);
//   const [day, setDay] = useState('');
//   const [startHours, setStartHours] = useState('');
//   const [endHours, setEndHours] = useState('');
//   const [startMinutes, setStartMinutes] = useState('');
//   const [endMinutes, setEndMinutes] = useState('');
//   const [grade, setGrade] = useState('');
//   const [animator, setAnimator] = useState('');
//   const [detailDescription, setDetailDescription] = useState('');


//   useEffect(() => {
//     setAvailability(props.creneauData.availability);
//     setDetailStartAge(props.creneauData.detailStartAge);
//     setDetailEndAge(props.creneauData.detailEndAge);
//     setDay(props.creneauData.day);
//     setStartHours(props.creneauData.startHours);
//     setEndHours(props.creneauData.endHours);
//     setStartMinutes(props.creneauData.startMinutes);
//     setEndMinutes(props.creneauData.endMinutes);
//     setGrade(props.creneauData.grade);
//     setAnimator(props.creneauData.animator);
//     setDetailDescription(props.creneauData.detailDescription);
//   }, [props.creneauData]);
  
//   useEffect(() => {
//     setErrors({});
//   }, [animator]);

//   const handleValidData = () => {
//     const validationErrors = {};

//     if (detailStartAge >= detailEndAge) {
//       validationErrors.detailEndAge = "L'âge maximum doit être supérieur à l'âge minimum";
//     }

//     if (!animator) {
//       validationErrors.animator = "Veuillez indiquer l'animateur";
//     } else if (animator.length < 2) {
//       validationErrors.animator = "Le nom de l'animateur doit contenir au moins 2 caractères";
//     } else if (!/^[a-zA-Z\sÀ-ÿ]+$/.test(animator)) {
//       validationErrors.animator = "Le nom de l'animateur ne doit contenir que des lettres";
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const detailData = {
//       availability,
//       detailStartAge,
//       detailEndAge,
//       day,
//       startHours,
//       endHours,
//       startMinutes,
//       endMinutes,
//       grade,
//       animator,
//       detailDescription,
//     };

//     props.handleCreneauChange(props.creneauData, props.index);  }
    

//     // const handleCreneauChange = (creneauData, index) => {
//     //   const updatedCreneaux = [...creneaux];
//     //   updatedCreneaux[index] = { ...updatedCreneaux[index], ...creneauData };
//     //   props.handleCreneauChange(updatedCreneaux); // Utilisez props.handleCreneauChange au lieu de setCreneaux
//     //   console.log("essai !!!!!")
//     // };


//   const resetForm = () => {
//     setAvailability('');
//     setDetailStartAge(0);
//     setDetailEndAge(99);
//     setDay('');
//     setStartHours('');
//     setEndHours('');
//     setStartMinutes('');
//     setEndMinutes('');
//     setGrade('');
//     setAnimator('');
//     setDetailDescription('');
//     setErrors({});
//   };


// export default RegularClassDetailForm;

// import React from 'react';

// function Enfant(props) {
//   const handleInputChange = (fieldName, e) => {
//     props.onFieldChange(fieldName, e.target.value);
//   };

//   return (
//     <div>
//       <h2>Enfant Component</h2>
//       <input type="text" value={props.data.input1} onChange={(e) => handleInputChange('input1', e)} />
//       <input type="text" value={props.data.input2} onChange={(e) => handleInputChange('input2', e)} />
//       {/* Ajoutez les autres champs de saisie ici */}
//     </div>
//   );
// }

