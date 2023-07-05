import React, { useState } from 'react';
import stylesRegistration from '../styles/Registration.module.css';


function RegistrationUserForm() {
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSignUp = () => {
      if (!signUpEmail || !signUpPassword || !confirmPassword) {
        setError("Veuillez remplir tous les champs");
        return;
      }
  
      if (!validateEmail(signUpEmail)) {
        setError("Veuillez saisir une adresse e-mail valide");
        return;
      }
  
      if (signUpPassword.length < 8 || !hasSpecialChar(signUpPassword) || !hasUppercase(signUpPassword)) {
        setError("Le mot de passe doit contenir au moins 8 caractères avec un signe spécial et une majuscule");
        return;
      }
  
      if (signUpPassword !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }
  
      // Toutes les vérifications ont réussi, procéder à l'étape d'inscription
      console.log(signUpEmail+" "+signUpPassword);
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
      setError('');
    };
  
    const handleEmailBlur = () => {
      if (!signUpEmail) {
        setError("Veuillez remplir le champ email");
      } else if (!validateEmail(signUpEmail)) {
        setError("Veuillez saisir une adresse e-mail valide");
      } else {
        setError('');
      }
    };
  
    const handlePasswordBlur = () => {
      if (!signUpPassword) {
        setError("Veuillez remplir le champ password");
      } else if (signUpPassword.length < 8 || !hasSpecialChar(signUpPassword) || !hasUppercase(signUpPassword)) {
        setError("Le mot de passe doit contenir au moins 8 caractères avec un signe spécial et une majuscule");
      } else {
        setError('');
      }
    };
  
    const handleConfirmPasswordBlur = () => {
      if (!confirmPassword) {
        setError("Veuillez remplir le champ de confirmation du mot de passe");
      } else if (signUpPassword !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
      } else {
        setError('');
      }
    };

    function registrationUser(){
    
        // Envoi sur le back inscription
    fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:signUpEmail, password:signUpPassword})
    })
    .then(response => response.json())
    
    // Transfert vers page d'accueil
    .then(data => {
        if(data.result){
            // modalContent= "coucou"

            // updateOnRegistration(regUsername)

            // window.location.assign('/')
            console.log("c ok")
            return true
        }
        else{
            return false
        }
        })
    }
  
    return (
      <main className={stylesRegistration.orgContent}>
        <div className={stylesRegistration.formContainer}>
          <form className="w-full">
            <div className={stylesRegistration.inputRegistrationContainer}>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Votre email"
                aria-label="signupEmail"
                id="signupEmail"
                onBlur={handleEmailBlur}
                onChange={(e) => setSignUpEmail(e.target.value)}
                value={signUpEmail}
              />
              {error && <p className={stylesRegistration.error}>{error}</p>}
            </div>
  
            <div className={stylesRegistration.inputRegistrationContainer}>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Password"
                aria-label="Full name"
                id="signUpPassword"
                onBlur={handlePasswordBlur}
                onChange={(e) => setSignUpPassword(e.target.value)}
                value={signUpPassword}
              />
            </div>
  
            {/* Ajouter le champ de confirmation du mot de passe */}
            <div className={stylesRegistration.inputRegistrationContainer}>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                placeholder="Confirm Password"
                aria-label="Confirm password"
                id="confirmPassword"
                onBlur={handleConfirmPasswordBlur}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
  
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={handleSignUp}
              disabled={!!error} // Désactiver le bouton si une erreur est présente
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>
    );
  }
  
  export default RegistrationUserForm;
  
