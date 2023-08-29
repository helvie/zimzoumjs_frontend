import styles from '../styles/Home.module.css';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPencil, faSave, faEye } from '@fortawesome/free-solid-svg-icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ModalImage from './ModalImage';
import ModalPDF from './ModalPDF';
// import OrgActivityUpdate from './OrganismActivityUpdate';
// import { shuffleArray } from '../utils/shuffleArray';
// import { useRouter } from 'next/router';
// const Map = dynamic(() => import('./Map'), { ssr: false });
// import dynamic from 'next/dynamic';

const OrganismUpdate = (props) => {

  const [orgVisible, setOrgVisible] = useState(false);
  const [respNameDisplay, setRespNameDisplay] = useState(0);
  const token = useSelector((state) => state.user.token);
  const [divElements, setDivElements] = useState({});
  const [initialDivElements, setInitialDivElements] = useState({});
  // const screenHeight = useSelector((state) => state.screen.screenHeight);
  // const router = useRouter();
  // const dispatch = useDispatch();
  // const allColors = ["#efc22b", "#72A3D2", "#FA9255", "#F06761", "#AEB861", "#E699A6", "#ffffff"];


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
  const [photo, setPhoto] = useState('');

  const handleOpenImageModal = () => {
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
  };

  // Fonction pour gérer l'événement de sélection du fichier
  const handlePDFSelect = (event) => {
    const file = event.target.files[0];
    setDoc(file); // Stockez le fichier dans l'état de votre composant React

  };

  //------------------------------------- Gestion pdf ----------------------------------------------------

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [doc, setDoc] = useState('');

  const handleOpenPdfModal = () => {
    setIsPdfModalOpen(true);
  };

  const handleClosePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  // Fonction pour gérer l'événement de sélection du fichier
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setPhoto(file); // Stockez le fichier dans l'état de votre composant React

  };
 
  //-------------------------------------------------------------------------------------------

  const [isEditing, setIsEditing] = useState({
    orgName: false,
    respRole: false,
    respCivility: false,
    respName: false,
    respNameDisplay: false,
    phonePrivate: false,
    emailPrivate: false,
    organismSort: false,
    orgName: false,
    location: false,
    emailPublic: false,
    phonePublic: false,
    website: false,
    doc: false,
    image: false,
    description: false,
    visible: false,
    location: false
  });

  //------------------------------------------------------------------------------------------------------

  const createClassicInput = (name) => {
    return (
      <div className={styles.orgDataTextUpdate}>
        <p>
          {isEditing[name] ? (
            <div className={styles.inputAndIconContainer}>
              {/* <FontAwesomeIcon icon={faSave} onClick={(e) => handleFieldBlur(e, name)} className={styles.saveIcon} /> */}
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, name)} className={styles.saveIcon} />
              <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={styles.circleXmark} />

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
            </div>
          ) : (
            <span className={styles.dataOfOrganism}>
              <FontAwesomeIcon style={{ color: '#000' }} onClick={() => handleFieldClick(name)} icon={faPencil} className={styles.pencilIcon} /> {divElements[name]}
            </span>
          )}
        </p>
      </div>
    )
  }

  //-----------------------------------------------------------------------------------------------------------

  const optionsRespCivility =
    [{ value: "monsieur", nom: "Monsieur" },
    { value: "madame", nom: "Madame" }]

  const optionsOrganismSort =
    [{ value: "mairie", nom: "Service de la Mairie" },
    { value: "association", nom: "Association" }]

  const optionsRespRole =
    [{ value: "president", nom: "Président(e)" },
    { value: "directeur", nom: "Directeur(trice)" },
    { value: "responsable", nom: "Responsable" },
    { value: "autre", nom: "Autre" }]

  const createDropDownMenu = (name, optionsArray) => {

    return (
      <div className={styles.orgDataTextUpdate}>
        <p>
          {isEditing[name] ? (
            <div className={styles.inputAndIconContainer}>
              {/* <FontAwesomeIcon icon={faSave} onClick={(e) => handleFieldBlur(e, name)} className={styles.saveIcon} /> */}
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, name)} className={styles.saveIcon} />
              <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={styles.circleXmark} />

              <select
                className={styles.changeDropDownMenu + ' ' + styles.placeholderOption}
                id={name}
                value={divElements[name]}
                onChange={(e) => handleInputChange(name, e.target.value)}
              >

                <option value="">-</option>
                {optionsArray.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.nom}
                  </option>
                ))}
              </select>

            </div>
          ) : (
            <span className={styles.dataOfOrganism}>
              <FontAwesomeIcon style={{ color: '#000' }} onClick={() => handleFieldClick(name)} icon={faPencil} className={styles.pencilIcon} /> {divElements[name]}
            </span>
          )}
        </p>
      </div>
    )
  }

  //-----------------------------------------------------------------------------------------------------------

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
          console.log(data.organism);
        }
        setDivElements(data.organism);
        setInitialDivElements(data.organism);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  //----------------------------------------------------------------------------------------------------------

  const handleFieldClick = (field) => {
    const updatedIsEditing = {};
    setDivElements(initialDivElements)

    for (const key in isEditing) {
      if (key === field) {
        updatedIsEditing[key] = true;
      } else {
        updatedIsEditing[key] = false;
      }
    }

    setIsEditing(updatedIsEditing);
  };

  //----------------------------------------------------------------------------------------------------------

  const handleFieldBlur = async (e, field) => {
    if (field === "location") {
      divElements.location = location
      initialDivElements.location = location
    }

    // Désactive le mode d'édition et met à jour la valeur dans l'état

    if (e.type === "click" || e.type === "keyup") {

      // Vous pouvez envoyer la nouvelle valeur au serveur ici
      try {
        const response = await fetch(`http://localhost:3000/organisms/updateField`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token, field: field, value: divElements[field] }),
        });
        const data = await response.json();
        if (data.success) {
          console.log(`Champ ${field} mis à jour avec succès.`);
        } else {
          console.error(`Erreur lors de la mise à jour du champ ${field}.`);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du champ:', error);
        setInitialDivElements(divElements)
        setIsEditing({ ...isEditing, [field]: false });

      }
    }
  };

  //---------------------------------------------------------------------------------------------------------

  const handleInputChange = (field, value) => {
    // Mettre à jour la valeur dans l'état lorsque l'utilisateur modifie l'input
    setDivElements({ ...divElements, [field]: value });
  };

  //----------------------------------------------------------------------------------------------------------

  return (
    <main className={styles.orgContent}>
      <Header />
      {divElements && initialDivElements && initialDivElements.location && (
        <div className={styles.orgDataUpdate}>

          <h1>Données du Responsable</h1>

          {createDropDownMenu('respCivility', optionsRespCivility)}
          {createClassicInput('respName')}
          {createDropDownMenu('respRole', optionsRespRole)}

          {/* ----------------------------------- Switch responsable name display ---------------------------------------- */}

          <div>
            <FormControlLabel
              className={styles.orgSwitchUpdate}
              control={
                <Switch
                  checked={respNameDisplay}
                  onChange={(e) => setRespNameDisplay(e.target.checked)}
                  color="default"
                />
              }
              label={<span style={{ fontSize: '18px' }}>{respNameDisplay ? 'Responsable visible par l\'internaute' : 'Responsable non visible par l\'internaute'}</span>}
              style={{ color: respNameDisplay ? '#000000' : '#a0a7b2', marginBottom: '50px' }}
            />
          </div>

          {/* -------------------------------------------------------------------------------------------------- */}


          {createClassicInput('phonePrivate')}
          {createClassicInput('emailPrivate')}

          <h1>Données de l'organisme</h1>

          {createClassicInput('orgName')}
          {createDropDownMenu('organismSort', optionsOrganismSort)}

          {/* ---------------------------------------------- LOCATION ------------------------------------------------ */}


          <div className={styles.orgDataTextUpdate}>
            <p>
              {isEditing.location ? (
                <div className={styles.inputAndIconContainer}>
                  <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, 'location')} className={styles.saveIcon} />
                  <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={styles.circleXmark} />
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

                  <div>
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
                  <FontAwesomeIcon onClick={() => handleFieldClick('location')} icon={faPencil} className={styles.pencilIcon} /> {initialDivElements.location.route} - {initialDivElements.location.postalCode} {initialDivElements.location.city}
                </span>
              )}
            </p>
          </div>

          {/* ---------------------------------------------- DESCRIPTION ------------------------------------------------ */}


          <div className={styles.orgDataTextUpdate}>
            <p>
              {isEditing.description ? (
                <div className={styles.inputAndIconContainer}>
                  <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, 'description')} className={styles.saveIcon} />
                  <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={styles.circleXmark} />

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
                  <FontAwesomeIcon style={{ color: '#000' }} onClick={() => handleFieldClick("description")} icon={faPencil} className={styles.pencilIcon} /> {divElements.description}
                </span>
              )}
            </p>
          </div>

          {/* -------------------------------------------------------------------------------------------------- */}

          {createClassicInput('emailPublic')}
          {createClassicInput('phonePublic')}
          {createClassicInput('website')}

          {/* ---------------------------------------------- PDF ------------------------------------------------ */}

          <div className={styles.orgDataTextUpdate}>
            <p>
              {isEditing.doc ? (
                <div className={styles.inputAndIconContainer}>
                  <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, 'doc')} className={styles.saveIcon} />
                  <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={styles.circleXmark} />

                  <div className={styles.changeInput} style={{ width: "300px" }}>
                    <p className={styles.uploadLabel}>Fichier PDF</p>
                    <input className={styles.uploadInput} type="file" accept=".pdf" onChange={handlePDFSelect} style={{ color: 'gray' }} />
                  </div>

                </div>
              ) : (
                <span className={styles.dataOfOrganism}>
                  <FontAwesomeIcon style={{ marginRight: '7px' }} onClick={handleOpenPdfModal} icon={faEye} className={styles.eyeIcon} />
                  <FontAwesomeIcon style={{ marginRight: '7px' }} onClick={() => handleFieldClick("doc")} icon={faPencil} className={styles.pencilIcon} />
                  {divElements.doc ? 'Un document est enregistré' : 'Aucun document n\'est enregistré'}

                  {/* Affichez la modale si isPdfModalOpen est true */}
                  {isPdfModalOpen && (
                    <ModalPDF pdfUrl={divElements.doc} onClose={handleClosePdfModal} />
                  )}


                </span>
              )}
            </p>
          </div>

          {/* ---------------------------------------------- Image ------------------------------------------------ */}

          <div className={styles.orgDataTextUpdate}>
            <p>
              {isEditing.image ? (
                <div className={styles.inputAndIconContainer}>
                  <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faSave} onClick={(e) => handleFieldBlur(e, 'image')} className={styles.saveIcon} />
                  <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleFieldClick('')} className={styles.circleXmark} />

                  <div>
                    <p className={stylesRegistration.uploadLabel}>Photo de l'organisme</p>
                    <input className={stylesRegistration.uploadInput} type="file" accept="image/*" onChange={handleFileSelect} style={{ color: 'gray' }} />
                  </div>

                </div>
              ) : (
                <span className={styles.dataOfOrganism}>
                  <FontAwesomeIcon style={{ marginRight: '7px' }} onClick={handleOpenImageModal} icon={faEye} className={styles.eyeIcon} />
                  <FontAwesomeIcon style={{ marginRight: '7px' }} onClick={() => handleFieldClick("image")} icon={faPencil} className={styles.pencilIcon} />
                  {divElements.image ? 'Une image est enregistrée' : 'Aucune image n\'est enregistrée'}


                  {/* Affichez la modale si isImageModalOpen est true */}
                  {isImageModalOpen && (
                    <ModalImage imageUrl={divElements.image} onClose={handleCloseImageModal} />
                  )}

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
                  onChange={(e) => setOrgVisible(e.target.checked)}
                  color="default"
                />
              }
              label={<span style={{ fontSize: '18px' }}>{orgVisible ? 'Organisme visible' : 'Organisme non visible'}</span>}
              style={{ color: orgVisible ? '#000000' : '#a0a7b2', marginBottom: '50px' }}
            />
          </div>

        </div>
      )}
    </main>
  );
};

export default OrganismUpdate;