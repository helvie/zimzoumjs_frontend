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
import SelectAge from './SelectAge';
import RegularClassDetailForm from './RegularClassDetailForm';
import moment from 'moment';

//----------------------------------------------------------------------------------------

function RegistrationRegularClass() {

  const [category, setCategory] = useState('');
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(99);
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState('');
  const [activity, setActivity] = useState('');

  const [enfants, setEnfants] = useState([]);
  const [errors, setErrors] = useState({});

  const user = useSelector((state) => state.user.token);

  const handleAddEnfant = () => {
    setEnfants([...enfants, { id: enfants.length + 1, data: {} }]);
    setErrors({});
  };

  const handleRemoveEnfant = () => {
    setEnfants((prevState) => prevState.slice(0, -1));
    setErrors({});
  };

  const handleEnfantDataChange = (enfantId, fieldName, fieldValue) => {
    setEnfants((prevState) =>
      prevState.map((enfant) =>
        enfant.id === enfantId ? 
        { ...enfant, data: { ...enfant.data, [fieldName]: fieldValue, availabilityDate: currentDate } } : enfant
      )
    );
    setErrors((prevErrors) => ({ ...prevErrors, [enfantId]: {} }));
  };

  const token = useSelector((state) => state.user.token);

  const currentDate = moment().format('YYYY-MM-DD');

  console.log("userName : "+user)

  //-------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------

  const registrationData = () => {

    return new Promise((resolve, reject) => {

      const dataActivity = {

        token: token,

        regularClass: {
          category: category,
          startAge: startAge,
          endAge: endAge,
          activity: activity,
          description: description,
          visible: visible,
          valid: 1
        },

        regularClassesDetails: enfants
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

      console.log(dataActivity)

    });
  };

  //----------------------------------------------------------------------------------------------

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setErrors({})

    const validationErrors = {};

    // Vérifier les erreurs pour chaque enfant
    enfants.forEach((enfant) => {
      const enfantErrors = {};

      if (enfant.data.detailStartAge >= enfant.data.detailEndAge) {
        enfantErrors.detailEndAge = "L'âge maximum doit être supérieur à l'âge minimum";
      }

      if (!enfant.data.animator) {
        enfantErrors.animator = "Veuillez indiquer l'animateur";
      } else if (enfant.data.animator.length < 2) {
        enfantErrors.animator = "Le nom de l'animateur doit contenir au moins 2 caractères";
      }

      validationErrors[enfant.id] = enfantErrors;

      //     const validationErrors = {};

      if (startAge >= endAge) {
        validationErrors.ageRange = `L'âge minimum ${enfant.id} doit être inférieur à l'âge maximum`;
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


    //-----------------------------------------------------------------------------------------------

    // Afficher les erreurs (vous pouvez les stocker dans un état si nécessaire)
    // console.log(validationErrors);
    // setErrors(validationErrors);

    // // Enregistrer les données des enfants
    // console.log(enfants);
  };

  return (
    <main className={stylesGeneral.orgContent}>
      <Header />
      <div className={stylesRegistration.formContainer}>
        <div className={stylesRegistration.formBackground}>
          <h1 className={stylesRegistration.formTitle}>Ajouter une activité</h1>
          <form className="w-full" onSubmit={handleFormSubmit}>

            <div className={stylesRegistration.activityForm}>

              <div className={`${stylesRegistration.formActivityElement1} ${stylesRegistration.formActivityElement}`}>
                <div className={stylesRegistration.formActivitySubelement}>

                  {/* <div className={stylesRegistration.inputRegistrationContainer}> */}
                  <p className={stylesRegistration.inputTitle}>Catégorie</p>
                  <select
                    className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="multi">Multi-activités</option>
                    <option value="sport">Sport</option>
                    <option value="langues">Langues et mots</option>
                    <option value="manuel">Activités manuelles</option>
                    <option value="musique">Musique et chant</option>
                    <option value="scene">Arts de la scène</option>
                    <option value="danse">Danse</option>
                    <option value="developpement">Développement personnel</option>
                  </select>
                </div>
                {/* </div> */}
              </div>

              <div className={`${stylesRegistration.formActivityElement2} ${stylesRegistration.formActivityElement}`}>
                <div className={stylesRegistration.formActivitySubelement}>

                  {/* <div className={stylesRegistration.inputRegistrationContainer}> */}
                  <p className={stylesRegistration.inputTitle}>Activité</p>

                  <input
                    className={stylesRegistration.inputRegistration}
                    type="text"
                    // placeholder="Activité"
                    aria-label="Activity"
                    id="Activity"
                    onChange={(e) => setActivity(e.target.value)}
                    value={activity}
                  />
                  {errors.activity && <p className={stylesRegistration.error}>{errors.activity}</p>}
                </div>
                {/* </div> */}
              </div>



              <div className={`${stylesRegistration.formActivityElement1} ${stylesRegistration.formActivityElement}`}>
                <div className={stylesRegistration.formActivitySubelement}>
                  {/* <div className={stylesRegistration.inputRegistrationContainer2}> */}
                  <p className={stylesRegistration.inputTitle}>Age minimum</p>
                  <div className={stylesRegistration.inputSelectContainer}>
                    <SelectAge
                      value={startAge}
                      onChange={(value) => setStartAge(value)}
                      maxValue={98}
                    />
                  </div>
                </div>
                {/* </div> */}
              </div>

              <div className={`${stylesRegistration.formActivityElement1} ${stylesRegistration.formActivityElement}`}>
                <div className={stylesRegistration.formActivitySubelement}>
                  {/* <div className={stylesRegistration.inputRegistrationContainer2}> */}
                  <p className={stylesRegistration.inputTitle}>Age maximum</p>
                  <div className={stylesRegistration.inputSelectContainer}>
                    <SelectAge
                      value={endAge}
                      onChange={(value) => setEndAge(value)}
                      maxValue={99}
                    />
                  </div>
                  {/* </div> */}
                </div>
              </div>

              <div className={`${stylesRegistration.formActivityElement3} ${stylesRegistration.formActivityElement}`}>
                <div className={stylesRegistration.formActivitySubelement}>
                  <p className={stylesRegistration.inputTitle}>Description</p>

                  <textarea
                    className={stylesRegistration.inputRegistration}
                    type="text"
                    // placeholder="Description"
                    aria-label="description"
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  {errors.description && <p className={stylesRegistration.error}>{errors.description}</p>}
                </div>
              </div>


              <div className={`${stylesRegistration.formActivityElement2} ${stylesRegistration.formActivityElement}`}>
                <div className={stylesRegistration.formActivitySubelement2}>

                  <FormControlLabel
                    className={stylesRegistration.switchActivity}
                    control={
                      <Switch
                        checked={visible}
                        onChange={(e) => setVisible(e.target.checked)}
                        color="default"
                      />
                    }
                    label="Activité visible par l'internaute"

                    style={{ color: visible ? '#F97C2F' : '#000000', marginBottom: '50px' }} />
                </div>
              </div>


              {/* <button className="bg-white text-black py-2 px-4 rounded-xl shadow-sm shadow-black">
  Cliquez-moi
</button> */}



              {enfants.map((enfant) => (
                <div key={enfant.id}>
                  <RegularClassDetailForm
                    data={enfant.data}
                    onFieldChange={(fieldName, fieldValue) => handleEnfantDataChange(enfant.id, fieldName, fieldValue)}
                  />
                  {errors[enfant.id] && (
                    <div>
                      {errors[enfant.id].detailEndAge && (
                        <p className={stylesRegistration.error}>{errors[enfant.id].detailEndAge}</p>
                      )}
                      {errors[enfant.id].animator && (
                        <p className={stylesRegistration.error}>{errors[enfant.id].animator}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className={stylesRegistration.buttonContainer}>

                <div className="w-full flex flex-row">
                  <button
                    onClick={handleAddEnfant}
                    className={stylesRegistration.buttonRemoveAdd}>
                    Ajouter un créneau
                  </button>

                  {enfants.length > 0 &&
                    <button onClick={handleRemoveEnfant}
                      className={stylesRegistration.buttonRemoveAdd}>
                      Supprimer le dernier créneau
                    </button>}
                </div>
                <div className="w-full">

                  <button
                    type="submit"
                    className={stylesRegistration.validButton}
                  >Enregistrer</button>
                </div>
              </div>
            </div>

          </form>

          {/* <hr />
          <h2>Données de tous les enfants :</h2>
          <ul>
            {enfants.map((enfant) => (
              <li key={enfant.id}>{JSON.stringify(enfant.data)}</li>
            ))}
          </ul> */}

        </div>
      </div>
    </main>

  );

}

export default RegistrationRegularClass;

// function RegistrationRegularClass() {

//   const userToken = useSelector((state) => state.user.token)


//   const [category, setCategory] = useState('');
//   const [startAge, setStartAge] = useState(0);
//   const [endAge, setEndAge] = useState(99);
//   const [description, setDescription] = useState('');
//   const [visible, setVisible] = useState('');
//   const [activity, setActivity] = useState('');

//   const [results, setResults] = useState([]);
//   const [errors, setErrors] = useState({});

//   const [creneaux, setCreneaux] = useState([]);
//   console.log(creneaux)

//   const handleAddCreneau = (e) => {
//     e.preventDefault();
//     setCreneaux([...creneaux, { index: creneaux.length }]);
//   };

//   const handleRemoveCreneau = (index) => {
//     const updatedCreneaux = creneaux.filter((_, i) => i !== index);
//     setCreneaux(updatedCreneaux);
//   };

//   const handleCreneauChange = (creneauData, index) => {
//     const updatedCreneaux = [...creneaux];
//     updatedCreneaux[index] = { ...updatedCreneaux[index], ...creneauData };
//     setCreneaux(updatedCreneaux);
//     console.log("essai !!!!!")
//   };

//   const creneauxList = creneaux.map((creneauData, index) => (
//     <div key={index} className={stylesRegistration.creneauxContainer}>
//       <RegularClassDetailForm
//         creneauData={creneauData}
//         index={index}
//         handleCreneauChange={handleCreneauChange}
//         onChange={(updatedCreneauData) => handleCreneauChange(updatedCreneauData, index)}
//         creneaux={creneaux}
//       />
//     </div>
//   ));


//   const dispatch = useDispatch();

//   const router = useRouter();


//   //----------------------------------------------------------------------------------------

//   // Effet pour réinitialiser les erreurs lorsque les champs sont modifiés
//   useEffect(() => {
//     setErrors({});
//   }, [category, description]);

//   //----------------------------------------------------------------------------------------


//   const handleValidData = () => {
//     const validationErrors = {};

//     if (startAge >= endAge) {
//       validationErrors.ageRange = "L'âge minimum doit être inférieur à l'âge maximum";
//     }

//     const validateDescription = (description) => {
//       const invalidCharsRegex = /[&\\+*=#%~\|[\]{}]/;
//       return !invalidCharsRegex.test(description);
//     };

//     if (!description) {
//       validationErrors.description = "Veuillez remplir le champ 'Description'";
//     } else if (!validateDescription(description)) {
//       validationErrors.description = "La description ne peut pas contenir les caractères spéciaux '& \\ + * = # % ~ | [ ] { }'";
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     registrationData();

//   };

//   //----------------------------------------------------------------------------------------

//   const resetForm = () => {

//     setAvailability: availability,
//       setStartAge(''),
//       setEndAge(''),
//       setDescription(''),
//       setVisible(''),
//       setActivity(''),
//       setCategory(''),
//       setErrors({});
//   };

//   //----------------------------------------------------------------------------------------
//   const registrationData = () => {
//     return new Promise((resolve, reject) => {
//       const dataOfDetailActivity = {
//         startAge: startAge,
//         endAge: endAge,
//         description: description,
//         visible: visible,
//         activity: activity,
//         category: category,
//         token: token,
//       };

//       fetch('http://localhost:3000/registration/activityRegistration', {
//         method: 'POST',
//         body: formData
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log('Registration successful:', data);
//           resolve();
//         })
//         .catch((error) => {
//           console.error('Registration failed:', error);
//           reject(error);
//         });
//     });
//   };
//   return (
//     <main className={stylesGeneral.orgContent}>

//       <Header />

//       <div className={stylesRegistration.formContainer}>

//         <div className={stylesRegistration.formBackground}>

//           <h1 className={stylesRegistration.formTitle}>Activités de l'organisme</h1>

//           <form className="w-full">

//             <button onClick={handleAddCreneau}>Ajouter un créneau</button>



//             <div className={stylesRegistration.activityForm}>


//               {/* //-------------------------------------------------------------------------------- */}

//               {/* //--------------------------------------------------------------------------------------- */}


//               <div className={stylesRegistration.formActivityElement1}>
//                <div className={stylesRegistration.formDetailActivitySubelement}>
//                 <div className={stylesRegistration.inputRegistrationContainer2}>
//                   <p className={stylesRegistration.inputTitle}>Age minimum</p>
//                   <div className={stylesRegistration.inputSelectContainer}>
//                     <SelectAge value={startAge} onChange={(e) => setStartAge(parseInt(e.target.value))} maxValue={98} />
//                   </div>
//                 </div>
//               </div>
//               </div>

//               {/* //--------------------------------------------------------------------------------------- */}


//               <div className={stylesRegistration.formActivityElement1}>
//                 <div className={stylesRegistration.formDetailActivitySubelement}>
//                   <div className={stylesRegistration.inputRegistrationContainer2}>
//                     <p className={stylesRegistration.inputTitle}>Age maximum</p>
//                     <div className={stylesRegistration.inputSelectContainer}>
//                       <SelectAge value={endAge} onChange={(e) => setEndAge(parseInt(e.target.value))} maxValue={99} />
//                     </div>
//                     {errors.endAge && <p className={stylesRegistration.error}>{errors.endAge}</p>}

//                   </div>
//                 </div>
//               </div>

//               <div className={stylesRegistration.formActivityElement1}>
//                 <div className={stylesRegistration.formDetailActivitySubelement}>

//                   <div className={stylesRegistration.inputRegistrationContainer}>
//                     <p className={stylesRegistration.inputTitle}>Catégorie</p>
//                     <select
//                       className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
//                       id="category"
//                       value={category}
//                       onChange={(e) => setCategory(e.target.value)}
//                     >
//                       <option value="multi">Multi-activités</option>
//                       <option value="sport">Sport</option>
//                       <option value="langues">Langues et mots</option>
//                       <option value="manuel">Activités manuelles</option>
//                       <option value="musique">Musique et chant</option>
//                       <option value="scene">Arts de la scène</option>
//                       <option value="danse">Danse</option>
//                       <option value="developpement">Développement personnel</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className={stylesRegistration.formActivityElement2}>
//                 <div className={stylesRegistration.formDetailActivitySubelement}>

//                   <div className={stylesRegistration.inputRegistrationContainer}>
//                     <p className={stylesRegistration.inputTitle}>Activité</p>

//                     <input
//                       className={stylesRegistration.inputRegistration}
//                       type="text"
//                       placeholder="Activité"
//                       aria-label="Activity"
//                       id="Activity"
//                       onChange={(e) => setActivity(e.target.value)}
//                       value={activity}
//                     />
//                     {errors.activity && <p className={stylesRegistration.error}>{errors.activity}</p>}
//                   </div>
//                 </div>
//               </div>

//               <FormControlLabel
//                 className={stylesRegistration.switch}
//                 control={
//                   <Switch
//                     checked={!visible}
//                     onChange={(e) => setVisible(e.target.checked)}
//                     color="default"
//                   />
//                 }
//                 label="Activité visible par l'internaute"

//                 style={{ color: visible ? '#000000' : '#a0a7b2', marginBottom: '50px' }} />



//               <div className={stylesRegistration.inputRegistrationContainer}>
//                 <textarea
//                   className={stylesRegistration.inputRegistration}
//                   type="text"
//                   placeholder="Description"
//                   aria-label="description"
//                   id="description"
//                   onChange={(e) => setDescription(e.target.value)}
//                   value={description}
//                 />
//                 {errors.description && <p className={stylesRegistration.error}>{errors.description}</p>}
//               </div>

//               {creneauxList}




//               <div>
//                 <button
//                   className={stylesRegistration.validButton}
//                   type="button"
//                   onClick={handleValidData}
//                   disabled={Object.keys(errors).length > 0} // Désactiver le bouton si des erreurs sont présentes
//                 >
//                   Suivant
//                 </button></div>

//             </div>

//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default RegistrationRegularClass;



