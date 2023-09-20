import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import stylesRegistration from '../styles/Registration.module.css';
import stylesGeneral from '../styles/General.module.css';

import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import Header from './SmallElements/Header';

////////////////////////////////////////////////////////////////////////////////

function ConnectionUserForm() {

  const router = useRouter();
  const dispatch = useDispatch();

  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [errors, setErrors] = useState({});

  //oooooooooooooooo Vérification des erreurs avant enregistrement ooooooooooooooo

  const handleSignin = () => {
    const validationErrors = {};

    const validateEmail = (email) => {
      // Vérification de l'adresse e-mail à l'aide d'une expression régulière
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };


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

    connectionUser();
    resetForm();
  };

  //ooooooooooooooooooo Mise à vide des champs de formulaire oooooooooooooooooooo

  const resetForm = () => {
    setSigninEmail('');
    setSigninPassword('');
    setErrors({});
  };

  //oooooooooooo Récupération des données de l'utilisateur en base de données oooooooooo

  function connectionUser() {

    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signinEmail, password: signinPassword })
    })
      .then(response => response.json())

      // Transfert vers page d'accueil
      .then(data => {
        if (data.result) {

          dispatch(login(data))
          router.push('/');
          return true
        }
        else {

          return false
        }
      })
  }

  ////////////////////////////////////////////////////////////////////////////////

  return (
    <main className={stylesGeneral.orgContent}>

      <Header />

      <div className={stylesRegistration.formContainer}>


        <div className={stylesGeneral.loginFormBackground}>

          <h1 className={stylesRegistration.formTitle}>Connection d'un utilisateur</h1>

          <form className="w-full">

            {/* --------------------------- Input email -------------------------- */}

            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.orgInputTitle}>Email de connexion</p>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="contact@mjc.fr"
                aria-label="signinEmail"
                id="signinEmail"
                onChange={(e) => setSigninEmail(e.target.value)}
                value={signinEmail}
              />
              {errors.email && <p className={stylesRegistration.error}>{errors.email}</p>}
            </div>

            {/* ------------------------ Input mot de passe ----------------------- */}

            <div className={stylesRegistration.inputRegistrationContainer}>
              <p className={stylesRegistration.orgInputTitle}>Mot de passe</p>

              <input
                className={stylesRegistration.inputRegistration}
                type="password"
                placeholder="***"
                aria-label="Full name"
                id="signinPassword"
                onChange={(e) => setSigninPassword(e.target.value)}
                value={signinPassword}
              />
              {errors.password && <p className={stylesRegistration.error}>{errors.password}</p>}

            </div>

            {/* ------------------ Bouton de validation du formulaire ------------- */}


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

