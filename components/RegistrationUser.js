import React, { useState } from 'react';
import stylesRegistration from '../styles/Registration.module.css';
import stylesGeneral from '../styles/General.module.css';
import { useDispatch } from 'react-redux';
import { updateToken } from '../reducers/user';
import { useRouter } from 'next/router';

import Header from './Header';

function RegistrationUserForm() {

  const router = useRouter();

  const dispatch = useDispatch();

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleSignUp = () => {
    const errors = {};

    if (!signUpEmail) {
      errors.email = "Veuillez remplir le champ email";
    } else if (!validateEmail(signUpEmail)) {
      errors.email = "Veuillez saisir une adresse e-mail valide";
    }

    if (!signUpPassword) {
      errors.password = "Veuillez remplir le champ password";
    } else if (signUpPassword.length < 8 || !hasSpecialChar(signUpPassword) || !hasUppercase(signUpPassword)) {
      errors.password = "Le mot de passe doit contenir au moins 8 caractères avec un signe spécial et une majuscule";
    }

    if (signUpPassword !== confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Toutes les vérifications ont réussi, procéder à l'étape d'inscription
    console.log(signUpEmail + " " + signUpPassword);
    registrationUser();
    resetForm();
  };

  const validateEmail = (email) => {
    // Vérification de l'adresse e-mail à l'aide d'une expression régulière
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const hasSpecialChar = (password) => {
    // Vérification de la présence d'un signe spécial dans le mot de passe à l'aide d'une expression régulière
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharRegex.test(password);
  };

  const hasUppercase = (password) => {
    // Vérification de la présence d'une majuscule dans le mot de passe à l'aide d'une expression régulière
    const uppercaseRegex = /[A-Z]/;
    return uppercaseRegex.test(password);
  };

  const resetForm = () => {
    setSignUpEmail('');
    setSignUpPassword('');
    setConfirmPassword('');
    setValidationErrors({});
  };



  function registrationUser() {

    // Envoi sur le back inscription
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signUpEmail, password: signUpPassword })
    })
      .then(response => response.json())

      // Transfert vers page d'accueil
      .then(data => {
        if (data.result) {
          // modalContent= "coucou"

          // updateOnRegistration(regUsername)

          // window.location.assign('/')
          console.log(data.token)
          dispatch(updateToken(data.token))
          router.push('/')
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


        <div className={stylesRegistration.formBackground}>

          <h1 className={stylesRegistration.formTitle}>Enregistrement d'un utilisateur</h1>
          <form className="w-full">
            <div className={stylesRegistration.inputRegistrationContainer}>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Votre email"
                aria-label="signupEmail"
                id="signupEmail"
                // onBlur={handleEmailBlur}
                onChange={(e) => setSignUpEmail(e.target.value)}
                value={signUpEmail}
              />
              {validationErrors.email && <p className={stylesRegistration.error}>{validationErrors.email}</p>}
            </div>

            <div className={stylesRegistration.inputRegistrationContainer}>
              <input
                className={stylesRegistration.inputRegistration}
                type="password" // Définir le type sur "password"
                placeholder="Mot de passe"
                aria-label="Mot de passe"
                id="signUpPassword"
                // onBlur={handlePasswordBlur}
                onChange={(e) => setSignUpPassword(e.target.value)}
                value={signUpPassword}
              />
              {validationErrors.password && <p className={stylesRegistration.error}>{validationErrors.password}</p>}
            </div>

            {/* Ajouter le champ de confirmation du mot de passe */}
            <div className={stylesRegistration.inputRegistrationContainer}>
              <input
                className={stylesRegistration.inputRegistration}
                type="password"
                placeholder="Confirmation mot de passe"
                aria-label="Confirmation mot de passe"
                id="confirmPassword"
                // onBlur={handleConfirmPasswordBlur}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              {validationErrors.confirmPassword && <p className={stylesRegistration.error}>{validationErrors.confirmPassword}</p>}
            </div>

            <button
              className={stylesRegistration.validButton}
              type="button"
              onClick={handleSignUp}
            // disabled={!!errors} // Désactiver le bouton si une erreur est présente
            >
              Valider
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default RegistrationUserForm;

