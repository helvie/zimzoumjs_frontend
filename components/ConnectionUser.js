import React, { useState } from 'react';
import stylesRegistration from '../styles/Registration.module.css';
import stylesGeneral from '../styles/General.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';

import Header from './Header';

function ConnectionUserForm() {
  const dispatch = useDispatch();

  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignin = () => {
    const validationErrors = {};

    if (!signinEmail) {
      validationErrors.email = "Veuillez remplir le champ email";
    } else if (!validateEmail(signinEmail)) {
      validationErrors.email = "Veuillez saisir une adresse e-mail valide";
    }

    if (!signinPassword) {
      validationErrors.password = "Veuillez remplir le champ password";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Toutes les vérifications ont réussi, procéder à l'étape de connexion
    connectionUser();
    resetForm();
  };

  const validateEmail = (email) => {
    // Vérification de l'adresse e-mail à l'aide d'une expression régulière
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetForm = () => {
    setSigninEmail('');
    setSigninPassword('');
    setErrors({});
  };

  function connectionUser() {

    // Envoi sur le back inscription
    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signinEmail, password: signinPassword })
    })
      .then(response => response.json())

      // Transfert vers page d'accueil
      .then(data => {
        if (data.result) {
          // modalContent= "coucou"

          // updateOnRegistration(regUsername)

          // window.location.assign('/')
          dispatch(login(data.token))
          return true
        }
        else {

          return false
        }
      })
  }

  return (
    <main className={stylesGeneral.orgContent}>
      {/* <div className={styles.orgFirstScreen}> */}

      <Header />

      <div className={stylesRegistration.formContainer}>


        <div className={stylesGeneral.loginFormBackground}>

          <h1 className={stylesRegistration.formTitle}>Connection d'un utilisateur</h1>
          <form className="w-full">
            <div className={stylesRegistration.inputRegistrationContainer}>
            <p className={stylesRegistration.orgInputTitle}>Email de connexion</p>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="contact@mjc.fr"
                aria-label="signinEmail"
                id="signinEmail"
                // onBlur={handleEmailBlur}
                onChange={(e) => setSigninEmail(e.target.value)}
                value={signinEmail}
              />
              {errors.email && <p className={stylesRegistration.error}>{errors.email}</p>}
            </div>

            <div className={stylesRegistration.inputRegistrationContainer}>
            <p className={stylesRegistration.orgInputTitle}>Mot de passe</p>

              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="***"
                aria-label="Full name"
                id="signinPassword"
                // onBlur={handlePasswordBlur}
                onChange={(e) => setSigninPassword(e.target.value)}
                value={signinPassword}
              />
              {errors.password && <p className={stylesRegistration.error}>{errors.password}</p>}

            </div>


            <button
              className={stylesRegistration.validButton}
              type="button"
              onClick={handleSignin}
              // disabled={!!error} // Désactiver le bouton si une erreur est présente
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ConnectionUserForm;

