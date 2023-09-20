import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import stylesRegistration from '../../styles/Registration.module.css';
import stylesGeneral from '../../styles/General.module.css';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Header from '../SmallElements/Header';
import { updateOrganismData } from '../../reducers/organism';
import { useRouter } from 'next/router';
import { respCivilityList, respRoleList } from '../../utils/dataObjects';

////////////////////////////////////////////////////////////////////////////////

function RegistrationPrivateDataOrg() {
  const [respRole, setRespRole] = useState('');
  const [respCivility, setRespCivility] = useState('');
  const [respName, setRespName] = useState('');
  const [respNameDisplay, setRespNameDisplay] = useState(0);
  const [phonePrivate, setPhonePrivate] = useState('');
  const [emailPrivate, setEmailPrivate] = useState('');
  const [errors, setErrors] = useState({}); // State pour les erreurs

  const dispatch = useDispatch();
  const router = useRouter();

  //oooooooooooo Réinitialisation des erreurs à la validation d'un input ooooooooooo

  useEffect(() => {
    setErrors({});
  }, [respName, phonePrivate, emailPrivate]);

  //oooooooooooooooooooooooooo Vérification des erreurs oooooooooooooooooooooooooo

  const handleValidPrivateData = () => {
    const validationErrors = {};

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!respName) {
      validationErrors.respName = "Veuillez remplir le champ 'Nom du responsable'";
    } else if (respName.length < 2) {
      validationErrors.respName = "Le nom du responsable doit contenir au moins 2 caractères";
    } else if (!/^[a-zA-Z\sÀ-ÿ]+$/.test(respName)) {
      validationErrors.respName = "Le nom du responsable ne doit contenir que des lettres";
    }

    if (!respRole) {
      validationErrors.respRole = "Veuillez remplir le champ 'Rôle du responsable'";
    } else if (respName.length < 2) {
      validationErrors.respRole = "Le rôle du responsable doit contenir au moins 2 caractères";
    } else if (!/^[a-zA-Z\sÀ-ÿ]+$/.test(respName)) {
      validationErrors.respRole = "Le rôle du responsable ne doit contenir que des lettres";
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


//ooooooooooooooooooooooo Réinitialisation du formulaire oooooooooooooooooooooooooo

  const resetForm = () => {
    setRespRole('');
    setRespName('');
    setPhonePrivate('');
    setEmailPrivate('');
    setErrors({});
  };

  //oooooooooooooo Stockage des données du formulaire dans le réducer ooooooooooo

  function registrationData() {

    const privateOrgData =
    {
      respCivility: respCivility,
      respName: respName,
      respRole: respRole,
      respNameDisplay: respNameDisplay,
      phonePrivate: phonePrivate,
      emailPrivate: emailPrivate
    }

    dispatch(updateOrganismData(privateOrgData))
    router.push('/registrationPublicDataOrg');

  }

  ////////////////////////////////////////////////////////////////////////////////

  return (
    <main className={stylesGeneral.orgContent}>

      <Header />

      <div className={stylesRegistration.formContainer}>

        <div className={stylesRegistration.orgFormBackground}>
          <h1 className={stylesRegistration.formTitle}>Le (la) responsable de l'organisme</h1>

          <h1 className={stylesRegistration.formTitle}></h1>

          <form className="w-full">

            {/* ----------- Menu déroulant civilité du responsable -------------- */}

            <div className={stylesRegistration.inputRegistrationContainer}>

              <p className={stylesRegistration.orgInputTitle}>Civilité</p>

              <select
                className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                id="respCivility"
                value={respCivility}
                onChange={(e) => setRespCivility(e.target.value)}
              >
                <option value="">-</option>
                {Object.entries(respCivilityList).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* --------------- Input nom du responsable ------------------ */}

            <div className={stylesRegistration.inputRegistrationContainer}>

              <p className={stylesRegistration.orgInputTitle}>Nom</p>

              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Martin"
                aria-label="respName"
                id="respName"
                onChange={(e) => setRespName(e.target.value)}
                value={respName}
              />
              {errors.respName && <p className={stylesRegistration.error}>{errors.respName}</p>}
            </div>

            {/* --------------------- Menu déroulant  ------------------- */}

            <div className={stylesRegistration.inputRegistrationContainer}>

              <p className={stylesRegistration.orgInputTitle}>Rôle</p>

              <select
                className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
                id="respRole"
                value={respRole}
                onChange={(e) => setRespRole(e.target.value)}
              >
                <option value="">-</option>
                {Object.entries(respRoleList).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              
              
                          </div>

            {/* ----------- Switch affichage du nom du responsable  -------------- */}

            <div className={stylesRegistration.orgSwitch}>
              <FormControlLabel
                control={
                  <Switch
                    checked={respNameDisplay}
                    onChange={(e) => setRespNameDisplay(e.target.checked)}
                    color="default"
                  />
                }
                label={respNameDisplay ? "Nom affiché pour les internautes" : "Nom masqué pour les internautes"}
                style={{ color: respNameDisplay ? '#000000' : '#a0a7b2', marginBottom: '20px' }}

              />
            </div>

            {/* ----------------- Input téléphone du responsable ------------------- */}

            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.orgInputTitle}>Téléphone (non public)</p>

              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="0123232323"
                aria-label="phonePrivate"
                id="phonePrivate"
                onChange={(e) => setPhonePrivate(e.target.value)}
                value={phonePrivate}
              />
              {errors.phonePrivate && <p className={stylesRegistration.error}>{errors.phonePrivate}</p>}
            </div>

            {/* ----------------- Input mail du responsable ------------------- */}

            <div className={stylesRegistration.inputRegistrationContainer}>

              <p className={stylesRegistration.orgInputTitle}>Email (non public)</p>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="martin@mail.fr"
                aria-label="emailPrivate"
                id="emailPrivate"
                onChange={(e) => setEmailPrivate(e.target.value)}
                value={emailPrivate}
              />
              {errors.emailPrivate && <p className={stylesRegistration.error}>{errors.emailPrivate}</p>}
            </div>

            {/* ------- Bouton d'envoi des données du formulaire dans le réducer -----*/}

            <button
              className={stylesRegistration.validButton}
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
