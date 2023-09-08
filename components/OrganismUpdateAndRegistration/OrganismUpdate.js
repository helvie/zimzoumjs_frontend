import Header from '../SmallElements/Header';
import stylesGeneral from '../../styles/General.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Home.module.css';
import { respCivilityList, organismSortList, respRoleList, daysList, availabilityList, gradeList, categoryList } from '../../utils/dataObjects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faEye, faSave, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FormControlLabel, Switch } from '@material-ui/core';
import ModalImage from '../SmallElements/ModalImage';
import ModalPDF from '../SmallElements/ModalPDF';

const OrganismUpdate = () => {

  const [divElements, setDivElements] = useState({});
  const token = useSelector((state) => state.user.token);
  const [initialDivElements, setInitialDivElements] = useState({});
  const [isEditingOrganism, setIsEditingOrganism] = useState({});
  const [orgVisible, setOrgVisible] = useState();
  const [respNameDisplay, setRespNameDisplay] = useState();
  const [errorActivity, setErrorActivity] = useState();

  //------------------------- Gestion des erreurs ----------------------------

  const validateRespName = () => {
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/;

    const respName = divElements["respName"];

    if (respName.trim() === "") {
      return "Le nom du responsable est requis.";
    }
    // Utilisation d'une expression régulière pour vérifier si la valeur contient des caractères invalides
    if (!regex.test(respName)) {
      return "Le nom du responsable ne doit contenir que des lettres et le caractère '-'.";
    }
    return ""; // Aucune erreur de validation
  };

                  //---------------------------------------------------

  const validatePhoneNumber = () => {

    console.log(errorActivity)

    const phone = divElements[isEditingOrganism];

    if (phone.trim() === "") {
      return "Le numéro de téléphone est requis.";
    }
    // Utilisation d'une expression régulière pour vérifier si la valeur contient des caractères invalides
    const regex = /^[0-9]{10}$/;    
    if (!regex.test(phone)) {
      return "Doit contenir 10 chiffres sans caractères spéciaux ni espaces"
    }
    return ""; // Aucune erreur de validation
  };

                    //---------------------------------------------------

  const validateEmail = () => {

    const email = divElements[isEditingOrganism];

    if (email.trim() === "") {
      return "L'adresse email est requise.";
    }
    // Utilisation d'une expression régulière pour vérifier le format de l'adresse email
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return "L'adresse email n'est pas valide.";
    }
    return ""; // Aucune erreur de validation
  };

                  //---------------------------------------------------

  const validateOrgName = () => {

    const orgName = divElements["orgName"];

    if (orgName.trim() === "") {
      return "Le champ ne doit pas être vide";
    }

    // Utilisation d'une expression régulière pour vérifier si la valeur contient des caractères invalides
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-\s]+$/;
    if (!regex.test(orgName)) {
      return "Le nom du responsable ne doit contenir que des lettres et le caractère '-'.";
    }
    return ""; // Aucune erreur de validation
  };

                    //---------------------------------------------------

  const validateWebsite = () => {

    const website = divElements[isEditingOrganism];

    if (website.trim() === "") {
      return "L'URL du site web est requise.";
    }
    // Utilisation d'une expression régulière pour vérifier le format de l'URL
    const regex = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/;
    if (!regex.test(website)) {
      return "L'URL du site web n'est pas valide.";
    }
    return ""; // Aucune erreur de validation
  };

                    //---------------------------------------------------

  const validateDescription = (value) => {
    if (value.trim() === "") {
      return "La description est requise.";
    }
    // Utilisation d'une expression régulière pour vérifier les caractères spéciaux
    var regex = /^[a-zA-Z0-9\s.,'"?!()&:;\n-]*$/;
    if (!regex.test(value)) {
      return "La description contient des caractères non autorisés.";
    }
    return ""; // Aucune erreur de validation
  };

  //----------------------------------------------------------------------------------------------------------

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
          console.log(data.organism)
          setDivElements(data.organism);
          setInitialDivElements(data.organism);
          setImageUrl(data.organism.image);
          setDocUrl(data.organism.doc);
          setOrgVisible(data.organism.orgVisible);
          setRespNameDisplay(data.organism.respNameDisplay);

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // N'oubliez pas d'appeler la fonction fetchData ici pour déclencher la requête au chargement du composant.
  }, [token]); // Assurez-vous d'inclure la dépendance token ici pour que le useEffect s'exécute lorsque le token change.

  const handleInputChange = (field, value) => {
    // Mettre à jour la valeur dans l'état lorsque l'utilisateur modifie l'input
    setDivElements({ ...divElements, [field]: value });
  };


  //----------------------------------------------------------------------------------------------------------

  // const handleFieldBlur = async (e, field) => {

  //   // console.log(e.type)
  //   if (field === "location") {
  //     divElements.location = location
  //   }


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
  //         setIsEditingOrganism("");

  //       } else {
  //         console.error(`Erreur lors de la mise à jour du champ ${field}.`);
  //       }
  //     } catch (error) {
  //       console.error('Erreur lors de la mise à jour du champ:', error);

  //     }
  //   }
  // };

  const handleFieldBlur = async (e, field, validationFn) => {
    if (field === "location") {
      divElements.location = location;
    }
    
    if(validationFn){
    const error = validationFn();
    
    if (error) {
      setErrorActivity(error);
      return;
    }
  }

    if (e.type === "click" || e.type === "keyup" || e.type === "switch") {
      // Vous pouvez envoyer la nouvelle valeur au serveur ici
      try {
        const response = await fetch(`http://localhost:3000/organisms/updateField`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token, field: field, value: divElements[field] }),
        });
        const data = await response.json();
        if (data.result) {
          console.log(`Champ ${field} mis à jour avec succès.`);
          setInitialDivElements(divElements);
          setIsEditingOrganism("");
        } else {
          console.error(`Erreur lors de la mise à jour du champ ${field}.`);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du champ:', error);
      }
    }
  };
  //--------------------------------------- Gestion location ----------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState({});

  const handleSearchTerm = (text) => {
    if (text.length > 2) {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${text}`)
        .then((response) => response.json())
        .then((json) => {
          setResults(json.features);
        })
        .catch((error) => console.error(error));
    } else {
      setResults([]);
    }
  };

  const handleCitySelected = (city) => {
    setSearchTerm(city.properties.label);
    setResults([]);

    setLocation({
      route: city.properties.name,
      postalCode: city.properties.postcode,
      city: city.properties.city,
      longitude: city.geometry.coordinates[0],
      latitude: city.geometry.coordinates[1]
    })
  };

  const getCityName = (value) => {
    setSearchTerm(value);
    handleSearchTerm(value);
  };

  //-------------------------------------- Gestion image --------------------------------------------------

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  const handleOpenImageModal = () => {
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    // console.log('File selected:', file);
    setImage(file); // Stockez le fichier dans l'état de votre composant React
    // console.log("l'image: ", image);
  };

  const saveImage = async () => {

    const formData = new FormData();
    formData.append('image', image);
    formData.append('token', token)

    try {
      const response = await fetch(`http://localhost:3000/registration/imageRegistration`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data) {
        setImageUrl(data.photoUrl)
        setDivElements({ ...divElements, image: data.photoUrl });
        setInitialDivElements(divElements);
        handleFieldClick("");
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  //------------------------------------- Gestion pdf ----------------------------------------------------

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [doc, setDoc] = useState('');
  const [docUrl, setDocUrl] = useState();

  const handleOpenPdfModal = () => {
    setIsPdfModalOpen(true);
  };

  const handleClosePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  const handlePDFSelect = (event) => {
    const file = event.target.files[0];
    // console.log('File selected:', file);
    setDoc(file); // Stockez le fichier dans l'état de votre composant React
    // console.log("le PDF: ", doc);
  };

  const saveDoc = async () => {

    const formData = new FormData();
    formData.append('doc', doc);
    formData.append('token', token)

    try {
      const response = await fetch(`http://localhost:3000/registration/docRegistration`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data) {
        setDocUrl(data.docUrl)
        setDivElements({ ...divElements, image: data.docoUrl });
        setInitialDivElements(divElements);
        handleFieldClick("");
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  //----------------------------------------------------------------------------------------------

  const createClassicInput = (name, validationFn) => {
    return (
      <div className={styles.orgDataTextUpdate}>
        <p>
          {isEditingOrganism === name ? (
            <div className={styles.inputAndIconContainer}>
              {/* <FontAwesomeIcon icon={faSave} onClick={(e) => handleFieldBlur(e, name)} className={styles.saveIcon} /> */}
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, name, validationFn)} className={`${styles.saveIcon} ${styles.icon}`} />
              <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={`${styles.circleXmark} ${styles.icon}`} />

              <input
                className={styles.changeInput}
                type="text"
                value={divElements[name]}
                onChange={(e) => handleInputChange(name, e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleFieldBlur(e, name);
                  }
                }}
              />
              {errorActivity && (
                <div className={styles.validationError}>
                  <span>{errorActivity}</span>
                </div>
              )}
            </div>
          ) : (
            <span className={styles.dataOfOrganism}>
              <FontAwesomeIcon style={{ color: '#000' }} onClick={() => handleFieldClick(name)} icon={faPencil} className={`${styles.pencilIcon} ${styles.icon}`} /> {divElements[name]}
            </span>
          )}
        </p>
      </div>
    )
  }

  // //-----------------------------------------------------------------------------------------------------------

  const createDropDownMenu = (name, optionsArray) => {

    return (
      <div className={styles.orgDataTextUpdate}>
        <p>
          {isEditingOrganism === name ? (
            <div className={styles.inputAndIconContainer}>
              {/* <FontAwesomeIcon icon={faSave} onClick={(e) => handleFieldBlur(e, name)} className={styles.saveIcon} /> */}
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, name, "")} className={`${styles.saveIcon} ${styles.icon}`} />
              <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={`${styles.circleXmark} ${styles.icon}`} />

              <select
                className={styles.changeDropDownMenu + ' ' + styles.placeholderOption}
                id={name}
                value={divElements[name]}
                onChange={(e) => handleInputChange(name, e.target.value)}
              >

                <option value="">-</option>
                {Object.entries(optionsArray).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>

            </div>
          ) : (
            <span className={styles.dataOfOrganism}>
              <FontAwesomeIcon style={{ color: '#000' }} onClick={() => handleFieldClick(name)} icon={faPencil} className={`${styles.pencilIcon} ${styles.icon}`} /> {optionsArray[divElements[name]]}
            </span>
          )}
        </p>
      </div>
    )
  }

  const handleFieldClick = (field) => {
    setDivElements(initialDivElements)
    setErrorActivity("")
    setIsEditingOrganism(field);
  };

  return (
    <main className={stylesGeneral.orgContent}>
      <Header />
      {divElements && initialDivElements && (
        <>
          <div className={styles.orgDataUpdate}>

            <h1>Données du (de la) responsable</h1>

            {createDropDownMenu('respCivility', respCivilityList)}
            {createClassicInput('respName', validateRespName)}
            {createDropDownMenu('respRole', respRoleList)}

            {/* ----------------------------------- Switch responsable name display ---------------------------------------- */}

            <div>
              <FormControlLabel
                className={styles.orgSwitchUpdate}
                control={
                  <Switch
                    checked={respNameDisplay}
                    onChange={async (e) => {
                      const isChecked = e.target.checked;
                      await setRespNameDisplay(isChecked);
                      // Mettez à jour la valeur dans divElements
                      divElements.respNameDisplay = isChecked;
                      await handleFieldBlur({ type: "switch" }, "respNameDisplay");
                    }}
                    color="default"
                  />
                }
                label={<span style={{ fontSize: '18px' }}>{respNameDisplay ? 'Organisme visible par l\'internaute' : 'Organisme non visible par l\'internaute'}</span>}
                style={{ color: respNameDisplay ? '#000000' : '#a0a7b2' }}
              />
            </div>

            {/* -------------------------------------------------------------------------------------------------- */}


            {createClassicInput('phonePrivate', validatePhoneNumber)}
            {createClassicInput('emailPrivate', validateEmail)}

          </div>

          {/* -------------------------------------------------------------------------------------------------- */}
          {/* -------------------------------------------------------------------------------------------------- */}


          <div className={styles.orgDataUpdate} style={{ marginTop: "0px" }}>


            <h1>Données de l'organisme</h1>

            {createClassicInput('orgName', validateOrgName)}
            {createDropDownMenu('organismSort', organismSortList)}

            {/* ---------------------------------------------- LOCATION ------------------------------------------------ */}

            {divElements.location ? (
              <div className={styles.orgDataTextUpdate}>
                <p>
                  {isEditingOrganism === "location" ? (
                    <div className={styles.inputAndIconContainer}>
                      <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, 'location')} className={`${styles.saveIcon} ${styles.icon}`} />
                      <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={`${styles.circleXmark} ${styles.icon}`} />
                      <input
                        className={styles.changeInput}
                        type="text"
                        placeholder="Adresse de l'organisme"
                        aria-label="cityInput"
                        id="cityInput"
                        value={searchTerm}
                        onChange={(e) => getCityName(e.target.value)}
                        onKeyUp={(e) => {
                          if (e.key === 'Enter') {
                            handleFieldBlur(e, "location");
                          }
                        }}
                      />

                      <div className={styles.locationChoiceList}>
                        {results.map((city) => (
                          <div
                            key={city.properties.id}
                            onClick={() => handleCitySelected(city)}
                            className={styles.cityItem}
                          >
                            {city.properties.label}
                          </div>
                        ))}
                      </div>

                    </div>
                  ) : (
                    <span className={styles.dataOfOrganism}>
                      <FontAwesomeIcon onClick={() => handleFieldClick('location')} icon={faPencil} className={`${styles.pencilIcon} ${styles.icon}`} /> {divElements.location.route} - {divElements.location.postalCode} {divElements.location.city}
                    </span>
                  )}
                </p>
              </div>
            ) : null}

            {/* ---------------------------------------------- DESCRIPTION ------------------------------------------------ */}

            <div className={styles.orgDataTextUpdate}>
              <p>
                {isEditingOrganism === "description" ? (
                  <div className={styles.inputAndIconContainer}>
                    <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, 'description')} className={`${styles.saveIcon} ${styles.icon}`} />
                    <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={`${styles.circleXmark} ${styles.icon}`} />

                    <textarea
                      className={styles.changeTextarea}
                      // type="textarea"
                      value={divElements.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                          handleFieldBlur(e, "description");
                        }
                      }}
                    />
                  </div>
                ) : (
                  <span className={styles.dataOfOrganism}>
                    <FontAwesomeIcon style={{ color: '#000' }} onClick={() => handleFieldClick("description")} icon={faPencil} className={`${styles.pencilIcon} ${styles.icon}`} /> {divElements.description}
                  </span>
                )}
              </p>
            </div>

            {/* -------------------------------------------------------------------------------------------------- */}

            {createClassicInput('emailPublic', validateEmail)}
            {createClassicInput('phonePublic', validatePhoneNumber)}
            {createClassicInput('website', validateWebsite)}

            {/* ---------------------------------------------- PDF ------------------------------------------------ */}
            <div className={styles.orgDataTextUpdate}>
              <p>
                {isEditingOrganism === "doc" ? (
                  <div className={styles.inputAndIconContainer}>
                    <FontAwesomeIcon
                      style={{ marginRight: '7px' }}
                      icon={faSave}
                      onClick={() => saveDoc()}
                      className={`${styles.saveIcon} ${styles.icon}`}
                    />
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      onClick={() => handleFieldClick('')}
                      className={styles.circleXmark}
                    />

                    <div className={styles.changeInput} style={{ width: "300px" }}>
                      <p className={styles.uploadLabel}>Fichier PDF</p>
                      <input
                        className={styles.uploadInput}
                        type="file"
                        accept=".pdf"
                        onChange={handlePDFSelect}
                        style={{ color: 'gray' }}
                      />
                    </div>
                  </div>
                ) : (
                  <span className={styles.dataOfOrganism}>
                    <FontAwesomeIcon
                      style={{ marginRight: '7px' }}
                      onClick={handleOpenPdfModal}
                      icon={faEye}
                      className={`${styles.eyeIcon} ${styles.icon}`}
                    />
                    <FontAwesomeIcon
                      style={{ marginRight: '7px' }}
                      onClick={() => handleFieldClick("doc")}
                      icon={faPencil}
                      className={`${styles.pencilIcon} ${styles.icon}`}
                    />
                    {docUrl ? 'Un document est enregistré' : 'Aucun document n\'est enregistré'}

                    {/* Affichez la modale si isPdfModalOpen est true */}
                    {isPdfModalOpen && <ModalPDF pdfUrl={docUrl} onClose={handleClosePdfModal} />}
                  </span>
                )}
              </p>
            </div>

            {/* ---------------------------------------------- Image ------------------------------------------------ */}
            <div className={styles.orgDataTextUpdate}>
              <p>
                {isEditingOrganism === "image" ? (
                  <div className={styles.inputAndIconContainer}>
                    <FontAwesomeIcon
                      style={{ marginRight: '7px' }}
                      icon={faSave}
                      onClick={() => saveImage()}
                      className={`${styles.saveIcon} ${styles.icon}`}
                    />
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      onClick={() => handleFieldClick('')}
                      className={styles.circleXmark}
                    />

                    <div className={styles.changeImageAndPdf}>
                      <p className={styles.uploadLabel}>Photo de l'organisme</p>
                      <input
                        className={styles.uploadInput}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ color: 'gray' }}
                      />
                    </div>
                  </div>
                ) : (
                  <span className={styles.dataOfOrganism}>
                    <FontAwesomeIcon
                      style={{ marginRight: '7px' }}
                      onClick={handleOpenImageModal}
                      icon={faEye}
                      className={`${styles.eyeIcon} ${styles.icon}`}
                    />
                    <FontAwesomeIcon
                      style={{ marginRight: '7px' }}
                      onClick={() => handleFieldClick("image")}
                      icon={faPencil}
                      className={styles.pencilIcon}
                    />
                    {imageUrl ? 'Une image est enregistrée' : 'Aucune image n\'est enregistrée'}

                    {/* Affichez la modale si isImageModalOpen est true */}
                    {isImageModalOpen && imageUrl && <ModalImage imageUrl={imageUrl} onClose={handleCloseImageModal} />}
                  </span>
                )}
              </p>
            </div>


            {/* -------------------------------------- Switch orgVisible ------------------------------------ */}

            <div>
              <FormControlLabel
                className={styles.orgSwitchUpdate}
                control={

                  <Switch
                    checked={orgVisible}
                    onChange={async (e) => {
                      const isChecked = e.target.checked;
                      await setOrgVisible(isChecked);
                      // Mettez à jour la valeur dans divElements
                      divElements.orgVisible = isChecked;
                      await handleFieldBlur({ type: "switch" }, "orgVisible");
                    }}
                    color="default"
                  />
                }
                label={<span style={{ fontSize: '18px' }}>{orgVisible ? 'Organisme visible par l\'internaute' : 'Organisme non visible par l\'internaute'}</span>}
                style={{ color: orgVisible ? '#000000' : '#a0a7b2' }}
              />
            </div>

            {/* ------------------------------------------------------------------------------------------------ */}


          </div>


        </>
      )}
    </main>
  )
};

export default OrganismUpdate;


