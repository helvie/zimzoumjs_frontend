import React, { useState } from 'react';
import Enfant from './Enfant';
import stylesRegistration from '../styles/Registration.module.css';

function Parent() {
  const [enfants, setEnfants] = useState([]);
  const [errors, setErrors] = useState({});

  const handleAddEnfant = () => {
    setEnfants([...enfants, { id: enfants.length + 1, data: {} }]);
    setErrors({});
  };

  const handleRemoveEnfant = () => {
    setEnfants((prevState) => prevState.slice(0, -1));
    setErrors({});
  };

  const handleEnfantDataChange = (enfantId, fieldName, fieldValue) => {
    setEnfants((prevState) =>
      prevState.map((enfant) =>
        enfant.id === enfantId ? { ...enfant, data: { ...enfant.data, [fieldName]: fieldValue } } : enfant
      )
    );
    setErrors((prevErrors) => ({ ...prevErrors, [enfantId]: {} }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const validationErrors = {};

    // Vérifier les erreurs pour chaque enfant
    enfants.forEach((enfant) => {
      const enfantErrors = {};

      if (enfant.data.detailStartAge >= enfant.data.detailEndAge) {
        enfantErrors.detailEndAge = "L'âge maximum doit être supérieur à l'âge minimum";
      }

      if (!enfant.data.animator) {
        enfantErrors.animator = "Veuillez indiquer l'animateur";
      } else if (enfant.data.animator.length < 2) {
        enfantErrors.animator = "Le nom de l'animateur doit contenir au moins 2 caractères";
      }

      validationErrors[enfant.id] = enfantErrors;
    });

    // Afficher les erreurs (vous pouvez les stocker dans un état si nécessaire)
    console.log(validationErrors);
    setErrors(validationErrors);

    // Enregistrer les données des enfants
    console.log(enfants);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <button onClick={handleAddEnfant}>Ajouter un enfant</button>
      {enfants.length > 0 && <button onClick={handleRemoveEnfant}>Supprimer le dernier enfant</button>}
      <form onSubmit={handleFormSubmit}>
        {enfants.map((enfant) => (
          <div key={enfant.id}>
            <Enfant
              data={enfant.data}
              onFieldChange={(fieldName, fieldValue) => handleEnfantDataChange(enfant.id, fieldName, fieldValue)}
            />
            {errors[enfant.id] && (
              <div>
                {errors[enfant.id].detailEndAge && (
                  <p className={stylesRegistration.error}>{errors[enfant.id].detailEndAge}</p>
                )}
                {errors[enfant.id].animator && (
                  <p className={stylesRegistration.error}>{errors[enfant.id].animator}</p>
                )}
              </div>
            )}
          </div>
        ))}
        <button type="submit">Enregistrer</button>
      </form>
      <hr />
      <h2>Données de tous les enfants :</h2>
      <ul>
        {enfants.map((enfant) => (
          <li key={enfant.id}>{JSON.stringify(enfant.data)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Parent;