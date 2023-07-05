import React, { useState, useEffect } from 'react';
import stylesRegistration from '../styles/Registration.module.css';
// import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { updateOrganismData } from '../reducers/organism';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Header from './Header';

function RegistrationPrivateDataOrg() {
  const [respCivility, setRespCivility] = useState('mme');
  const [respName, setRespName] = useState('dubon');
  const [respNameDisplay, setRespNameDisplay] = useState(1);
  const [phonePrivate, setPhonePrivate] = useState(2123333311);
  const [emailPrivate, setEmailPrivate] = useState('essai@essai.fr');
  const [errors, setErrors] = useState({}); // State pour les erreurs

  const orgData = useSelector((state) => state.organismData)
  const dispatch = useDispatch();

  const router = useRouter();


  // Effet pour réinitialiser les erreurs lorsque les champs sont modifiés
  useEffect(() => {
    setErrors({});
  }, [respName, phonePrivate, emailPrivate]);

  const handleValidPrivateData = () => {
    const validationErrors = {};

    if (!respName) {
      validationErrors.respName = "Veuillez remplir le champ 'Nom du responsable'";
    } else if (respName.length < 2) {
      validationErrors.respName = "Le nom de l'organisme doit contenir au moins 2 caractères";
    } else if (!/^[a-zA-Z]+$/.test(respName)) {
      validationErrors.respName = "Le nom de l'organisme ne doit contenir que des lettres";
    }

    if (!phonePrivate) {
      validationErrors.phonePrivate = "Veuillez remplir le champ 'Téléphone du responsable'";
    } else if (!/^\d+$/.test(phonePrivate)) {
      validationErrors.phonePrivate = "Le numéro de téléphone doit contenir uniquement des chiffres";
    } else if (phonePrivate.length < 10) {
      validationErrors.phonePrivate = "Le numéro de téléphone doit contenir au moins 10 chiffres";
    }

    if (!emailPrivate) {
      validationErrors.emailPrivate = "Veuillez remplir le champ 'Email du responsable'";
    } else if (!validateEmail(emailPrivate)) {
      validationErrors.emailPrivate = "Veuillez saisir une adresse e-mail valide";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Toutes les vérifications ont réussi, procéder à l'étape d'inscription
    registrationData();
    resetForm();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetForm = () => {
    setRespName('');
    setPhonePrivate('');
    setEmailPrivate('');
    setErrors({});
  };

  function registrationData() {
    const privateOrgData =
    {
      respCivility: respCivility,
      respName: respName,
      respNameDisplay: respNameDisplay,
      phonePrivate: phonePrivate,
      emailPrivate: emailPrivate
    }

    dispatch(updateOrganismData(privateOrgData))
    // console.log(respCivility + ' ' + respName + ' ' + emailPrivate + ' ' + phonePrivate +" "+ respNameDisplay);
    console.log(orgData)
    router.push('/registrationPublicDataOrg');

  }

  return (
    <main className={stylesRegistration.orgContent}>
      {/* <div className={styles.orgFirstScreen}> */}

      <Header />

      <div className={stylesRegistration.formContainer}>


        <div className={stylesRegistration.formBackground}>

          <h1 className={stylesRegistration.formTitle}>Données de l'organisme (privées)</h1>

          <form className="w-full">
            <div className={stylesRegistration.inputRegistrationContainer}>
              <select
                className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                id="respCivility"
                value={respCivility}
                onChange={(e) => setRespCivility(e.target.value)}
              >
                <option value="">Civilité</option>
                <option value="Madame">Madame</option>
                <option value="Monsieur">Monsieur</option>
              </select>
            </div>

            <div className={stylesRegistration.inputRegistrationContainer}>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Nom du responsable"
                aria-label="respName"
                id="respName"
                onChange={(e) => setRespName(e.target.value)}
                value={respName}
              />
              {errors.respName && <p className={stylesRegistration.error}>{errors.respName}</p>}
            </div>

            <FormControlLabel
              control={<Switch checked={respNameDisplay}
                onChange={(e) => setRespNameDisplay(e.target.checked)}
              />}
              label="Affichage du nom du responsable"
            />

            <div className={stylesRegistration.inputRegistrationContainer}>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Téléphone du responsable"
                aria-label="phonePrivate"
                id="phonePrivate"
                onChange={(e) => setPhonePrivate(e.target.value)}
                value={phonePrivate}
              />
              {errors.phonePrivate && <p className={stylesRegistration.error}>{errors.phonePrivate}</p>}
            </div>

            <div className={stylesRegistration.inputRegistrationContainer}>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Email du responsable"
                aria-label="emailPrivate"
                id="emailPrivate"
                onChange={(e) => setEmailPrivate(e.target.value)}
                value={emailPrivate}
              />
              {errors.emailPrivate && <p className={stylesRegistration.error}>{errors.emailPrivate}</p>}
            </div>

            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={handleValidPrivateData}
              disabled={Object.keys(errors).length > 0} // Désactiver le bouton si des erreurs sont présentes
            >
              Suivant
            </button>
          </form>
        </div>
      </div>

    </main>
  );
}

export default RegistrationPrivateDataOrg;
