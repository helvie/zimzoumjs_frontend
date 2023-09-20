import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import stylesGeneral from '../../styles/General.module.css';
import stylesRegistration from '../../styles/Registration.module.css';
import { useRouter } from 'next/router';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Header from '../SmallElements/Header';
import { organismSortList } from '../../utils/dataObjects';
import { BACKEND_URL } from '../../utils/urls';

////////////////////////////////////////////////////////////////////////////////

function RegistrationPublicDataOrg() {

  const router = useRouter();


  //------------------ Récupération des données privées dans le réducer -------------
  const orgData = useSelector((state) => state.organismData)

  const userToken = useSelector((state) => state.user.token)

  const [organismSort, setOrganismSort] = useState('');
  const [orgName, setOrgName] = useState('');
  const [location, setLocation] = useState({});
  const [emailPublic, setEmailPublic] = useState('');
  const [phonePublic, setPhonePublic] = useState('');
  const [website, setWebsite] = useState('');
  const [doc, setDoc] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [orgVisible, setOrgVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const [errors, setErrors] = useState({}); // State pour les erreurs

  //oooooooooooooo Récupération des adresse de l'API selon saisie ooooooooooooooooooooo

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

  // //ooooooooooooo Stockage de l'adresse sélectionnée dans menu contextuel oooooooooooooo

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

  //oooooooooooooooooo Affichage des données saisies dans l'input ooooooooooooooooooo

  const getCityName = (value) => {
    setSearchTerm(value);
    handleSearchTerm(value);
  };

  //oooooooooooooooooo Stockage de l'image téléchargée dans l'état ooooooooooooooooooooo

  // Fonction pour gérer l'événement de sélection du fichier
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setPhoto(file);

  };

  //oooooooooooooooooooo Stockage du pdf téléchargé dans l'état ooooooooooooooooooooooo

  const handlePDFSelect = (event) => {
    const file = event.target.files[0];
    setDoc(file);

  };

  //oooooooooooooooooooooo Réinitialisation des erreurs ooooooooooooooooooooooooooooo

  // Effet pour réinitialiser les erreurs lorsque les champs sont modifiés
  useEffect(() => {
    setErrors({});
  }, [orgName, phonePublic, emailPublic, website, description]);

  //oooooooooooooooooooooooo Contrôle validité des champs ooooooooooooooooooooooooooo

  const handleValidPublicData = () => {
    const validationErrors = {};

    if (!orgName) {
      validationErrors.orgName = "Veuillez remplir le champ 'Nom de l'organisme'";
    } else if (orgName.length < 2) {
      validationErrors.orgName = "Le nom de l'organisme doit contenir au moins 2 caractères";
    } else if (!/^[a-zA-Z0-9\sÀ-ÿ]+$/.test(orgName)) {
      validationErrors.orgName = "Le nom de l'organisme ne doit contenir que des lettres ou des chiffres";
    }

    if (!phonePublic) {
      validationErrors.phonePublic = "Veuillez remplir le champ 'Téléphone de l'organisme'";
    } else if (!/^\d+$/.test(phonePublic)) {
      validationErrors.phonePublic = "Le numéro de téléphone doit contenir uniquement des chiffres";
    } else if (phonePublic.length < 10) {
      validationErrors.phonePublic = "Le numéro de téléphone doit contenir au moins 10 chiffres";
    }

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!emailPublic) {
      validationErrors.emailPublic = "Veuillez remplir le champ 'Email de l'organisme'";
    } else if (!validateEmail(emailPublic)) {
      validationErrors.emailPublic = "Veuillez saisir une adresse e-mail valide";
    }

    const validateWebsite = (website) => {
      const websiteRegex = /^(http(s)?:\/\/)?(www\.)?[^\s/$.?#].[^\s]*$/;
      return websiteRegex.test(website);
    };

    if (!website) {
      validationErrors.website = "Veuillez remplir le champ 'Site internet'";
    } else if (!validateWebsite(website)) {
      validationErrors.website = "Veuillez saisir une URL valide pour le site web";
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

    // Vérifier la taille de la photo (maximum 5 Mo)
    if (photo && photo.size > 5 * 1024 * 1024) {
      validationErrors.photo = "La taille de la photo dépasse la limite autorisée (5 Mo)";
    }

    // Vérifier la taille du PDF (maximum 10 Mo)
    if (doc && doc.size > 10 * 1024 * 1024) {
      validationErrors.pdf = "La taille du PDF dépasse la limite autorisée (10 Mo)";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registrationData();

  };

  //oooooooooooooooooooooooooooo Mise à vide des champs ooooooooooooooooooooooooooo

  const resetForm = () => {
    setOrganismSort('');
    setOrgName('');
    setLocation({});
    setEmailPublic('');
    setPhonePublic('');
    setWebsite('');
    setDoc('');
    setPhoto('');
    setDescription('');
    setOrgVisible(false);
    setErrors({});
  };

  //ooooooo Enregistrement en BDD des données privées et publiques de l'organisme oooooo

  const registrationData = () => {
    return new Promise((resolve, reject) => {
      const dataOfOrganism = {
        organismSort: organismSort,
        orgName: orgName,
        location: location,
        emailPublic: emailPublic,
        phonePublic: phonePublic,
        website: website,
        description: description,
        orgVisible: orgVisible,
        respCivility: orgData.respCivility,
        respName: orgData.respName,
        respNameDisplay: orgData.respNameDisplay,
        phonePrivate: orgData.phonePrivate,
        emailPrivate: orgData.emailPrivate,
        image: '',
        doc: ''
      };

      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('doc', doc);
      formData.append('orgData', JSON.stringify(dataOfOrganism));
      formData.append('token', userToken);

      fetch(`${BACKEND_URL}/registration/organismRegistration`, {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          resolve();
          router.push('/registrationRegularClass');
        })
        .catch((error) => {
          console.error('Registration failed:', error);
          reject(error);
        });
    });
  };

  ////////////////////////////////////////////////////////////////////////////////

  return (
    <main className={stylesGeneral.orgContent}>

      <Header />

      <div className={stylesRegistration.formContainer}>


        <div className={stylesRegistration.orgFormBackground}>

          <h1 className={stylesRegistration.formTitle}>L'organisme</h1>

          <form className="w-full">

            <div className={stylesRegistration.inputRegistrationContainer}>

              {/* ----------------- Input nom de l'organisme -------------------*/}

              <p className={stylesRegistration.orgInputTitle}>Nom de l'organisme</p>

              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="La maison des jeunes"
                aria-label="orgName"
                id="orgName"
                onChange={(e) => setOrgName(e.target.value)}
                value={orgName}
              />
              {errors.orgName && <p className={stylesRegistration.error}>{errors.orgName}</p>}
            </div>

            <div className={stylesRegistration.inputRegistrationContainer}>

              {/* ----------------- Input nom de l'organisme -------------------*/}

              <p className={stylesRegistration.orgInputTitle}>Type d'organisme</p>

              <select
                className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                id="organismSort"
                value={organismSort}
                onChange={(e) => setOrganismSort(e.target.value)}
              >
                <option value="">-</option>
                {Object.entries(organismSortList).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className={stylesRegistration.inputRegistrationContainer}>

              {/* ---------------- Input adresse l'organisme -------------------*/}

              <p className={stylesRegistration.orgInputTitle}>Adresse</p>

              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Adresse de l'organisme"
                aria-label="cityInput"
                id="cityInput"
                value={searchTerm}
                onChange={(e) => getCityName(e.target.value)}
              />

              <div>
                {results.map((city) => (
                  <div
                    key={city.properties.id}
                    onClick={() => handleCitySelected(city)}
                    className={stylesRegistration.cityItem}
                  >
                    {city.properties.label}
                  </div>
                ))}
              </div>
            </div>

            {/* ---------------- Switch visibilité de l'oganisme ------------------*/}

            <FormControlLabel
              className={stylesRegistration.orgSwitch}
              control={
                <Switch
                  checked={orgVisible}
                  onChange={(e) => setOrgVisible(e.target.checked)}
                  color="default"
                />
              }
              label="Organisme visible après création"

              style={{ color: orgVisible ? '#000000' : '#a0a7b2', marginBottom: '50px' }}
            />

            {/* ---------------- Input téléphone de l'organisme ------------------*/}

            <div className={stylesRegistration.inputRegistrationContainer}>

              <p className={stylesRegistration.orgInputTitle}>Téléphone</p>

              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="0123232323"
                aria-label="phonePublic"
                id="phonePublic"
                onChange={(e) => setPhonePublic(e.target.value)}
                value={phonePublic}
              />
              {errors.phonePublic && <p className={stylesRegistration.error}>{errors.phonePublic}</p>}
            </div>

            {/* ------------------ Input email de l'organisme -------------------*/}

            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.orgInputTitle}>Adresse mail</p>

              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="contact@mjc.fr"
                aria-label="emailPublic"
                id="emailPublic"
                onChange={(e) => setEmailPublic(e.target.value)}
                value={emailPublic}
              />
              {errors.emailPublic && <p className={stylesRegistration.error}>{errors.emailPublic}</p>}
            </div>


            {/* ------------------ Input site de l'organisme -------------------*/}

            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.orgInputTitle}>Site internet</p>

              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="www.mjc.fr"
                aria-label="website"
                id="website"
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
              />
              {errors.website && <p className={stylesRegistration.error}>{errors.website}</p>}
            </div>

            {/* ---------------- Input description de l'organisme ------------------*/}

            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.orgInputTitle}>Descriptif de l'organisme</p>

              <textarea
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Association de sport..."
                aria-label="description"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              {errors.description && <p className={stylesRegistration.error}>{errors.description}</p>}
            </div>

            {/* ------------ Elément formulaire téléchargement image --------------- */}

            <div>
              <p className={stylesRegistration.uploadLabel}>Photo de l'organisme</p>
              <input
                className={stylesRegistration.uploadInput}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ color: 'gray' }}
              />
            </div>

            {/* ------------- Elément formulaire téléchargement PDF --------------- */}

            <div>
              <p className={stylesRegistration.uploadLabel}>Fichier PDF</p>
              <input className={stylesRegistration.uploadInput}
                type="file"
                accept=".pdf"
                onChange={handlePDFSelect}
                style={{ color: 'gray' }}
              />
            </div>

            {/* ---------------------- Bouton de validation --------------------- */}

            <div>
              <button
                className={stylesRegistration.validButton}
                type="button"
                onClick={handleValidPublicData}
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

export default RegistrationPublicDataOrg;