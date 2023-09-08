import Header from '../SmallElements/Header';
import stylesGeneral from '../../styles/General.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import ActivityUpdate from './ActivityUpdate';
import ActivityBeforeUpdate from './ActivityBeforeUpdate';
import styles from '../../styles/Home.module.css';
import ActivityUpdate from './ActivityUpdate';

const OrganismUpdate = () => {

  const [divElements, setDivElements] = useState({});
  const token = useSelector((state) => state.user.token);
  const [isEditingActivity, setIsEditingActivity] = useState();

  // console.log(isEditingActivity)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/organisms/organismDisplayForUpdate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token }),
        });
        const data = await response.json();
        if (data.organism) {
          setDivElements(data.organism);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // N'oubliez pas d'appeler la fonction fetchData ici pour déclencher la requête au chargement du composant.
  }, [token]); // Assurez-vous d'inclure la dépendance token ici pour que le useEffect s'exécute lorsque le token change.


    // Ajoutez une fonction pour gérer la mise à jour de l'activité en édition
    const handleEditActivity = (activityId) => {
      setIsEditingActivity(activityId);
    };
  // useEffect(() => {

  const activities = divElements.regularClasses && divElements.regularClasses.map((data, i) => (
    <div className={styles.orgDataUpdate} style={{ marginTop: "0px" }} key={i}>
      {isEditingActivity===data._id ? (
        <div>
        {/* <p>réussi {isEditingActivity} {data._id}</p> */}
        <ActivityUpdate
          data={data}
          isEditing={isEditingActivity === data._id}
          onEditActivity={handleEditActivity} // Passez la fonction comme une prop
        />
        </div>
      ) : (
        <div>
        {/* <p>"raté {isEditingActivity} {data._id}"</p> */}

        <ActivityBeforeUpdate
          data={data}
          isEditing={isEditingActivity === data._id}
          onEditActivity={handleEditActivity} // Passez la fonction comme une prop
        />
                </div>

      )}
    </div>
  ));

  // }, [divElements]); // Assurez-vous d'inclure la dépendance token ici pour que le useEffect s'exécute lorsque le token change.

  

  return(
    <main className={stylesGeneral.orgContent}>
         <Header />

         {divElements && <div>{activities}</div>}

         
  
  
    </main>
    )
};

export default OrganismUpdate;

// import styles from '../styles/Home.module.css';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleXmark, faPencil, faSave, faEye } from '@fortawesome/free-solid-svg-icons';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import ModalImage from './ModalImage';
// import ModalPDF from './ModalPDF';
// import OrgActivityBeforeUpdate from './OrgActivityBeforeUpdate';
// import { respCivilityList, organismSortList, respRoleList, daysList, availabilityList, gradeList, categoryList } from '../utils/dataObjects';
// import RegistrationRegularClass from './RegistrationRegularClass';



//   const [orgVisible, setOrgVisible] = useState();
//   const [respNameDisplay, setRespNameDisplay] = useState();
//   const token = useSelector((state) => state.user.token);
//   const [divElements, setDivElements] = useState({});
//   const [initialDivElements, setInitialDivElements] = useState({});
//   const [isEditingActivity, setIsEditingActivity] = useState();
  // const [detailList, setDetailList] = useState();

  //--------------------------------------- Gestion location ----------------------------------------------

  // const [searchTerm, setSearchTerm] = useState("");
  // const [results, setResults] = useState([]);
  // const [location, setLocation] = useState({});
  // console.log(initialDivElements)

  // const handleSearchTerm = (text) => {
  //   if (text.length > 2) {
  //     fetch(`https://api-adresse.data.gouv.fr/search/?q=${text}`)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setResults(json.features);
  //       })
  //       .catch((error) => console.error(error));
  //   } else {
  //     setResults([]);
  //   }
  // };

  // const handleCitySelected = (city) => {
  //   setSearchTerm(city.properties.label);
  //   setResults([]);

  //   setLocation({
  //     route: city.properties.name,
  //     postalCode: city.properties.postcode,
  //     city: city.properties.city,
  //     longitude: city.geometry.coordinates[0],
  //     latitude: city.geometry.coordinates[1]
  //   })
  // };

  // const getCityName = (value) => {
  //   setSearchTerm(value);
  //   handleSearchTerm(value);
  // };
  // const [detailsList, setDetailsList] = useState();

  //-------------------------------------- Gestion image --------------------------------------------------

  // const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  // const [image, setImage] = useState();
  // const [imageUrl, setImageUrl] = useState();

  // const handleOpenImageModal = () => {
  //   setIsImageModalOpen(true);
  // };

  // const handleCloseImageModal = () => {
  //   setIsImageModalOpen(false);
  // };

  // const handleFileSelect = (event) => {
  //   const file = event.target.files[0];
  //   // console.log('File selected:', file);
  //   setImage(file); // Stockez le fichier dans l'état de votre composant React
  //   // console.log("l'image: ", image);
  // };

  // const handlePDFSelect = (event) => {
  //   const file = event.target.files[0];
  //   // console.log('File selected:', file);
  //   setDoc(file); // Stockez le fichier dans l'état de votre composant React
  //   // console.log("le PDF: ", doc);
  // };

  // const saveImage = async () => {

  //   const formData = new FormData();
  //   formData.append('image', image);
  //   formData.append('token', token)

  //   try {
  //     const response = await fetch(`http://localhost:3000/registration/imageRegistration`, {
  //       method: 'POST',
  //       body: formData
  //     });
  //     const data = await response.json();
  //     if (data) {
  //       setImageUrl(data.photoUrl)
  //       setDivElements({ ...divElements, image: data.photoUrl });
  //       setInitialDivElements(divElements);
  //       handleFieldClick("");
  //     }

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }

  // }


  //------------------------------------- Gestion pdf ----------------------------------------------------

  // const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  // const [doc, setDoc] = useState('');
  // const [docUrl, setDocUrl] = useState();

  // const handleOpenPdfModal = () => {
  //   setIsPdfModalOpen(true);
  // };

  // const handleClosePdfModal = () => {
  //   setIsPdfModalOpen(false);
  // };

  // const saveDoc = async () => {

  //   const formData = new FormData();
  //   formData.append('doc', doc);
  //   formData.append('token', token)

  //   try {
  //     const response = await fetch(`http://localhost:3000/registration/docRegistration`, {
  //       method: 'POST',
  //       body: formData
  //     });
  //     const data = await response.json();
  //     if (data) {
  //       setDocUrl(data.docUrl)
  //       setDivElements({ ...divElements, image: data.docoUrl });
  //       setInitialDivElements(divElements);
  //       handleFieldClick("");
  //     }

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }

  // }

  //-------------------------------------------------------------------------------------------

  // const [isEditing, setIsEditing] = useState({
  //   orgName: false,
  //   respRole: false,
  //   respCivility: false,
  //   respName: false,
  //   respNameDisplay: false,
  //   phonePrivate: false,
  //   emailPrivate: false,
  //   organismSort: false,
  //   orgName: false,
  //   location: false,
  //   emailPublic: false,
  //   phonePublic: false,
  //   website: false,
  //   doc: false,
  //   image: false,
  //   description: false,
  //   visible: false,
  //   location: false
  // });


  // const createClassicInput = (name) => {
  //   return (
  //     <div className={styles.orgDataTextUpdate}>
  //       <p>
  //         {isEditing[name] ? (
  //           <div className={styles.inputAndIconContainer}>
  //             {/* <FontAwesomeIcon icon={faSave} onClick={(e) => handleFieldBlur(e, name)} className={styles.saveIcon} /> */}
  //             <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, name)} className={styles.saveIcon} />
  //             <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={styles.circleXmark} />

  //             <input
  //               className={styles.changeInput}
  //               type="text"
  //               value={divElements[name]}
  //               onChange={(e) => handleInputChange(name, e.target.value)}
  //               onKeyUp={(e) => {
  //                 if (e.key === 'Enter') {
  //                   handleFieldBlur(e, name);
  //                 }
  //               }}
  //             />
  //           </div>
  //         ) : (
  //           <span className={styles.dataOfOrganism}>
  //             <FontAwesomeIcon style={{ color: '#000' }} onClick={() => handleFieldClick(name)} icon={faPencil} className={styles.pencilIcon} /> {divElements[name]}
  //           </span>
  //         )}
  //       </p>
  //     </div>
  //   )
  // }

  // //-----------------------------------------------------------------------------------------------------------

  // const createDropDownMenu = (name, optionsArray) => {

  //   return (
  //     <div className={styles.orgDataTextUpdate}>
  //       <p>
  //         {isEditing[name] ? (
  //           <div className={styles.inputAndIconContainer}>
  //             {/* <FontAwesomeIcon icon={faSave} onClick={(e) => handleFieldBlur(e, name)} className={styles.saveIcon} /> */}
  //             <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, name)} className={styles.saveIcon} />
  //             <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={styles.circleXmark} />

  //             <select
  //               className={styles.changeDropDownMenu + ' ' + styles.placeholderOption}
  //               id={name}
  //               value={divElements[name]}
  //               onChange={(e) => handleInputChange(name, e.target.value)}
  //             >

  //               <option value="">-</option>
  //               {Object.entries(optionsArray).map(([key, value]) => (
  //                 <option key={key} value={key}>
  //                   {value}
  //                 </option>
  //               ))}
  //             </select>

  //           </div>
  //         ) : (
  //           <span className={styles.dataOfOrganism}>
  //             <FontAwesomeIcon style={{ color: '#000' }} onClick={() => handleFieldClick(name)} icon={faPencil} className={styles.pencilIcon} /> {optionsArray[divElements[name]]}
  //           </span>
  //         )}
  //       </p>
  //     </div>
  //   )
  // }

  //-----------------------------------------------------------------------------------------------------------

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/organisms/organismDisplayForUpdate`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ token: token }),
  //       });
  //       const data = await response.json();
  //       if (data.organism) {
  //         // console.log(data.organism);
  //       setDivElements(data.organism);
  //       setInitialDivElements(data.organism);
  //       setRespNameDisplay(data.organism.respNameDisplay)
  //       setOrgVisible(data.organism.orgVisible)
  //       setImageUrl(data.organism.image)
  //       setDocUrl(data.organism.doc)
  //       const newIsEditingActivity={}
  // for(let i=0; i<data.organism.regularClasses.length; i++){
  //   newIsEditingActivity[data.organism.regularClasses[i]._id]=false
  //   // console.log(data.organism.regularClasses[i])
  // }
  // setIsEditingActivity(newIsEditingActivity)

  //     }



  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/organisms/organismDisplayForUpdate`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ token: token }),
  //       });
  //       const data = await response.json();
  //       if (data.organism) {
  //         setDivElements(data.organism);
  //         setInitialDivElements(data.organism);
  //         setRespNameDisplay(data.organism.respNameDisplay);
  //         setOrgVisible(data.organism.orgVisible);
  //         setImageUrl(data.organism.image);
  //         setDocUrl(data.organism.doc);

  //         console.log(data.organism.regularClasses)
  //         // const newIsEditingActivity = {};
  //         // for (let i = 0; i < data.organism.regularClasses.length; i++) {
  //         //   newIsEditingActivity[data.organism.regularClasses[i]._id] = false;
  //         //   console.log(newIsEditingActivity)

  //         // }
  //         // setIsEditingActivity(newIsEditingActivity);

  //         // Créez essaiRC ici une fois que les données sont disponibles

  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //----------------------------------------------------------------------------------------------------------

  // const handleFieldClick = (field) => {
  //   const updatedIsEditing = {};
  //   setDivElements(initialDivElements)

  //   for (const key in isEditing) {
  //     if (key === field) {
  //       updatedIsEditing[key] = true;
  //     } else {
  //       updatedIsEditing[key] = false;
  //     }
  //   }

  //   setIsEditing(updatedIsEditing);
  // };


  // const updateIsEditingActivity = (id) => {
  //   // console.log(isEditingActivity)

  //   // const updatedIsEditingActivity = {};
  //   // // setDivElements(initialDivElements)
  //   // // console.log("dans update")

  //   // for (const key in isEditingActivity) {
  //   //   // console.log(key)
  //   //   if (key === id) {
  //   //     updatedIsEditingActivity[key] = true;
  //   //   } else {
  //   //     updatedIsEditingActivity[key] = false;
  //   //   }
  //   // }

  //   setIsEditingActivity(id);
  //   console.log(isEditingActivity)

  // };


  //----------------------------------------------------------------------------------------------------------

  // const handleFieldBlur = async (e, field) => {

  //   // console.log(e.type)
  //   if (field === "location") {
  //     divElements.location = location
  //   }

  //   // Désactive le mode d'édition et met à jour la valeur dans l'état

  //   if (e.type === "click" || e.type === "keyup" || e.type === "switch") {

  //     // Vous pouvez envoyer la nouvelle valeur au serveur ici
  //     try {
  //       const response = await fetch(`http://localhost:3000/organisms/updateField`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ token: token, field: field, value: divElements[field] }),
  //       });
  //       const data = await response.json();
  //       if (data.result) {
  //         console.log(`Champ ${field} mis à jour avec succès.`);
  //         setInitialDivElements(divElements);
  //         setIsEditing({ ...isEditing, [field]: false });

  //       } else {
  //         console.error(`Erreur lors de la mise à jour du champ ${field}.`);
  //       }
  //     } catch (error) {
  //       console.error('Erreur lors de la mise à jour du champ:', error);

  //     }
  //   }
  // };

  // //---------------------------------------------------------------------------------------------------------

  // const handleInputChange = (field, value) => {
  //   // Mettre à jour la valeur dans l'état lorsque l'utilisateur modifie l'input
  //   setDivElements({ ...divElements, [field]: value });
  // };


  // useEffect(() => {
  //   console.log(divElements)
  //   const fetchData = async () => {
  //     try {
  //       // ... Votre logique de récupération de données

  //       // Ensuite, initialisez essaiRC avec les données une fois que divElements.regularClasses est disponible
  //       if (divElements && divElements.regularClasses) {
  //         const initialEssaiRC = divElements.regularClasses.map((data, i) => (
  //           <div className={styles.orgDataUpdate} style={{ marginTop: "0px" }} key={i}>
  //             {isEditingActivity[data.id] ? null : (
  //               <FontAwesomeIcon
  //                 key={i}
  //                 style={{ color: '#000' }}
  //                 onClick={() => props.updateIsEditingActivity(_id)}
  //                 icon={faPencil}
  //                 className={styles.pencilIcon}
  //               />
  //             )}
  //             <OrgActivityBeforeUpdate
  //               data={data}
  //               activityUpdate={true}
  //               isEditing={isEditingActivity[data._id]}
  //               updateIsEditingActivity={updateIsEditingActivity} // Passez la fonction comme une prop
  //             />
  //           </div>
  //         ));

  //         setEssaiRC(initialEssaiRC);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData(); 
  // }, []);

  // const essaiRC = divElements?.regularClasses?.map((data, i) => {
  //   console.log("data "+i)

  //     return (
  //       <div className={styles.orgDataUpdate} style={{ marginTop: "0px" }}>
  //         {isEditingActivity[data.id]?null:<FontAwesomeIcon
  //       key={i}
  //       style={{ color: '#000' }}
  //       onClick={() => props.updateIsEditingActivity(_id)}
  //       icon={faPencil}
  //       className={styles.pencilIcon}
  //     />}
  //   <OrgActivityBeforeUpdate
  //     data={data}
  //     activityUpdate={true}
  //     isEditing={isEditingActivity[data._id]}
  //     updateIsEditingActivity={updateIsEditingActivity} // Passez la fonction comme une prop
  //   />
  // </div>)
  //   // }
  // });

  // if (divElements && divElements.regularClasses) {
  //   detailsList = divElements.regularClasses.map((data, i) => (
  //     <div className={styles.orgDataUpdate} style={{ marginTop: "0px" }} key={data.id}>
  //       {isEditingActivity === data.id ? null : (
  //         <FontAwesomeIcon
  //           // key={i}
  //           style={{ color: '#000' }}
  //           onClick={() => updateIsEditingActivity(data._id)}
  //           icon={faPencil}
  //           className={styles.pencilIcon}
  //         />
  //       )}
  //       <OrgActivityBeforeUpdate
  //         data={data}
  //         activityUpdate={true}
  //         isEditing={isEditingActivity[data._id]}
  //       // updateIsEditingActivity={updateIsEditingActivity} // Passez la fonction comme une prop
  //       />
  //     </div>
  //   ));
  //   console.log(detailsList)


  //   // setEssaiRC(initialEssaiRC);
  // }

  // useEffect(() => {
  //   if (divElements && divElements.regularClasses) {
  //     const updatedDetailsList = divElements.regularClasses.map((data, i) => (
  //       <div className={styles.orgDataUpdate} style={{ marginTop: "0px" }} key={data.id}>
  //         {isEditingActivity !== data.id ? <p>essai</p> : (
  //           <FontAwesomeIcon
  //             style={{ color: '#000' }}
  //             onClick={() => updateIsEditingActivity(data._id)}
  //             icon={faPencil}
  //             className={styles.pencilIcon}
  //           />
  //         )}
  //         <OrgActivityBeforeUpdate
  //           data={data}
  //           activityUpdate={true}
  //           isEditing={isEditingActivity===data._id?true:false}
  //         />
  //       </div>
  //     ));

  //     setDetailsList(updatedDetailsList);
  //   }
  // }, [divElements, isEditingActivity]);
// return(
//   <main className={stylesGeneral.orgContent}>
//        <Header />


//   </main>
//   )


//   return (
//     <main className={stylesGeneral.orgContent}>
//       <Header />
//       {divElements && initialDivElements && initialDivElements.location && divElements.regularClasses && (
//         <>
//           <div className={styles.orgDataUpdate}>

//             <h1>Données du (de la) responsable</h1>

//             {createDropDownMenu('respCivility', respCivilityList)}
//             {createClassicInput('respName')}
//             {createDropDownMenu('respRole', respRoleList)}

//             {/* ----------------------------------- Switch responsable name display ---------------------------------------- */}

//             <div>
//               <FormControlLabel
//                 className={styles.orgSwitchUpdate}
//                 control={

//                   <Switch
//                     checked={respNameDisplay}
//                     onChange={async (e) => {
//                       await setRespNameDisplay(e.target.checked);
//                       divElements.respNameDisplay = e.target.checked;
//                       await handleFieldBlur({ type: "switch" }, "respNameDisplay");
//                     }}
//                     color="default"
//                   />
//                 }
//                 label={<span style={{ fontSize: '18px' }}>{respNameDisplay ? 'Responsable visible par l\'internaute' : 'Responsable non visible par l\'internaute'}</span>}
//                 style={{ color: respNameDisplay ? '#000000' : '#a0a7b2', marginBottom: '50px' }}
//               />
//             </div>

//             {/* -------------------------------------------------------------------------------------------------- */}


//             {createClassicInput('phonePrivate')}
//             {createClassicInput('emailPrivate')}

//           </div>

//           {/* -------------------------------------------------------------------------------------------------- */}
//           {/* -------------------------------------------------------------------------------------------------- */}


//           <div className={styles.orgDataUpdate} style={{ marginTop: "0px" }}>


//             <h1>Données de l'organisme</h1>

//             {createClassicInput('orgName')}
//             {createDropDownMenu('organismSort', organismSortList)}

//             {/* ---------------------------------------------- LOCATION ------------------------------------------------ */}


//             <div className={styles.orgDataTextUpdate}>
//               <p>
//                 {isEditing.location ? (
//                   <div className={styles.inputAndIconContainer}>
//                     <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, 'location')} className={styles.saveIcon} />
//                     <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={styles.circleXmark} />
//                     <input
//                       className={styles.changeInput}
//                       type="text"
//                       placeholder="Adresse de l'organisme"
//                       aria-label="cityInput"
//                       id="cityInput"
//                       value={searchTerm}
//                       onChange={(e) => getCityName(e.target.value)}
//                       onKeyUp={(e) => {
//                         if (e.key === 'Enter') {
//                           handleFieldBlur(e, "location");
//                         }
//                       }}
//                     />

//                     <div>
//                       {results.map((city) => (
//                         <div
//                           key={city.properties.id}
//                           onClick={() => handleCitySelected(city)}
//                           className={styles.cityItem}
//                         >
//                           {city.properties.label}
//                         </div>
//                       ))}
//                     </div>

//                   </div>
//                 ) : (
//                   <span className={styles.dataOfOrganism}>
//                     <FontAwesomeIcon onClick={() => handleFieldClick('location')} icon={faPencil} className={styles.pencilIcon} /> {initialDivElements.location.route} - {initialDivElements.location.postalCode} {initialDivElements.location.city}
//                   </span>
//                 )}
//               </p>
//             </div>

//             {/* ---------------------------------------------- DESCRIPTION ------------------------------------------------ */}

//             <div className={styles.orgDataTextUpdate}>
//               <p>
//                 {isEditing.description ? (
//                   <div className={styles.inputAndIconContainer}>
//                     <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, 'description')} className={styles.saveIcon} />
//                     <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={styles.circleXmark} />

//                     <textarea
//                       className={styles.changeTextarea}
//                       // type="textarea"
//                       value={divElements.description}
//                       onChange={(e) => handleInputChange("description", e.target.value)}
//                       onKeyUp={(e) => {
//                         if (e.key === 'Enter') {
//                           handleFieldBlur(e, "description");
//                         }
//                       }}
//                     />
//                   </div>
//                 ) : (
//                   <span className={styles.dataOfOrganism}>
//                     <FontAwesomeIcon style={{ color: '#000' }} onClick={() => handleFieldClick("description")} icon={faPencil} className={styles.pencilIcon} /> {divElements.description}
//                   </span>
//                 )}
//               </p>
//             </div>

//             {/* -------------------------------------------------------------------------------------------------- */}

//             {createClassicInput('emailPublic')}
//             {createClassicInput('phonePublic')}
//             {createClassicInput('website')}

//             {/* ---------------------------------------------- PDF ------------------------------------------------ */}
//             <div className={styles.orgDataTextUpdate}>
//               <p>
//                 {isEditing.doc ? (
//                   <div className={styles.inputAndIconContainer}>
//                     <FontAwesomeIcon
//                       style={{ marginRight: '7px' }}
//                       icon={faSave}
//                       onClick={() => saveDoc()}
//                       className={styles.saveIcon}
//                     />
//                     <FontAwesomeIcon
//                       icon={faCircleXmark}
//                       onClick={() => handleFieldClick('')}
//                       className={styles.circleXmark}
//                     />

//                     <div className={styles.changeInput} style={{ width: "300px" }}>
//                       <p className={styles.uploadLabel}>Fichier PDF</p>
//                       <input
//                         className={styles.uploadInput}
//                         type="file"
//                         accept=".pdf"
//                         onChange={handlePDFSelect}
//                         style={{ color: 'gray' }}
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <span className={styles.dataOfOrganism}>
//                     <FontAwesomeIcon
//                       style={{ marginRight: '7px' }}
//                       onClick={handleOpenPdfModal}
//                       icon={faEye}
//                       className={styles.eyeIcon}
//                     />
//                     <FontAwesomeIcon
//                       style={{ marginRight: '7px' }}
//                       onClick={() => handleFieldClick("doc")}
//                       icon={faPencil}
//                       className={styles.pencilIcon}
//                     />
//                     {docUrl ? 'Un document est enregistré' : 'Aucun document n\'est enregistré'}

//                     {/* Affichez la modale si isPdfModalOpen est true */}
//                     {isPdfModalOpen && <ModalPDF pdfUrl={docUrl} onClose={handleClosePdfModal} />}
//                   </span>
//                 )}
//               </p>
//             </div>

//             {/* ---------------------------------------------- Image ------------------------------------------------ */}
//             <div className={styles.orgDataTextUpdate}>
//               <p>
//                 {isEditing.image ? (
//                   <div className={styles.inputAndIconContainer}>
//                     <FontAwesomeIcon
//                       style={{ marginRight: '7px' }}
//                       icon={faSave}
//                       onClick={() => saveImage()}
//                       className={styles.saveIcon}
//                     />
//                     <FontAwesomeIcon
//                       icon={faCircleXmark}
//                       onClick={() => handleFieldClick('')}
//                       className={styles.circleXmark}
//                     />

//                     <div className={styles.changeImageAndPdf}>
//                       <p className={styles.uploadLabel}>Photo de l'organisme</p>
//                       <input
//                         className={styles.uploadInput}
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileSelect}
//                         style={{ color: 'gray' }}
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <span className={styles.dataOfOrganism}>
//                     <FontAwesomeIcon
//                       style={{ marginRight: '7px' }}
//                       onClick={handleOpenImageModal}
//                       icon={faEye}
//                       className={styles.eyeIcon}
//                     />
//                     <FontAwesomeIcon
//                       style={{ marginRight: '7px' }}
//                       onClick={() => handleFieldClick("image")}
//                       icon={faPencil}
//                       className={styles.pencilIcon}
//                     />
//                     {imageUrl ? 'Une image est enregistrée' : 'Aucune image n\'est enregistrée'}

//                     {/* Affichez la modale si isImageModalOpen est true */}
//                     {isImageModalOpen && imageUrl && <ModalImage imageUrl={imageUrl} onClose={handleCloseImageModal} />}
//                   </span>
//                 )}
//               </p>
//             </div>


//             {/* -------------------------------------- Switch orgVisible ------------------------------------ */}

//             <div>
//               <FormControlLabel
//                 className={styles.orgSwitchUpdate}
//                 control={

//                   <Switch
//                     checked={orgVisible}
//                     onChange={async (e) => {
//                       console.log("checked : " + e.target.checked)
//                       await setOrgVisible(e.target.checked);
//                       divElements.orgVisible = e.target.checked;
//                       await handleFieldBlur({ type: "switch" }, "orgVisible");
//                     }}
//                     color="default"
//                   />
//                 }
//                 label={<span style={{ fontSize: '18px' }}>{orgVisible ? 'Responsable visible par l\'internaute' : 'Responsable non visible par l\'internaute'}</span>}
//                 style={{ color: orgVisible ? '#000000' : '#a0a7b2' }}
//               />
//             </div>

//             {/* ------------------------------------------------------------------------------------------------ */}
//             {/* ------------------------------------------------------------------------------------------------ */}


//           </div>
//           <>
//             {detailsList && (

//               <div className={styles.orgDataTextUpdate}>
//                 {detailsList}


//               </div>
//              )} 
//           </>

//         </>
//       )}
//     </main>
//   );
// };

// export default OrganismUpdate;