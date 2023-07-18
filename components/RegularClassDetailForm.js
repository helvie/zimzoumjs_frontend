import React from 'react';
import SelectTime from './SelectTime';
import SelectAge from './SelectAge';
import stylesRegistration from '../styles/Registration.module.css';

function RegularClassDetailForm(props) {
  const handleInputChange = (fieldName, value) => {
    props.onFieldChange(fieldName, value);
  };

  return (
    <div className="w-full">
      <div className={stylesRegistration.detailActivityForm}>
        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            {/* <div className={stylesRegistration.inputRegistrationContainer}> */}
              <p className={stylesRegistration.inputTitle}>Disponibilité</p>
              <select
                className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
                id="availability"
                value={props.data.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
              >
                <option value="">Sans indication</option>
                <option value="plenty">Disponible</option>
                <option value="limited">Quelques places disponibles</option>
                <option value="full">Complet</option>
              </select>
            </div>
          {/* </div> */}
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            {/* <div className={stylesRegistration.inputRegistrationContainer2}> */}
              <p className={stylesRegistration.inputTitle}>Age minimum</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <SelectAge
                  value={props.data.detailStartAge}
                  onChange={(value) => handleInputChange('detailStartAge', value)}
                  maxValue={98}
                />
              </div>
            {/* </div> */}
          </div>
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            {/* <div className={stylesRegistration.inputRegistrationContainer2}> */}
              <p className={stylesRegistration.inputTitle}>Age maximum</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <SelectAge
                  value={props.data.detailEndAge}
                  onChange={(value) => handleInputChange('detailEndAge', value)}
                  maxValue={99}
                />
              </div>
            </div>
          {/* </div> */}
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            {/* <div className={stylesRegistration.inputRegistrationContainer}> */}
              <p className={stylesRegistration.inputTitle}>Jour</p>
              <select
                className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
                id="day"
                value={props.data.day}
                onChange={(e) => handleInputChange('day', e.target.value)}
              >
                <option value="undefined" defaultValue>Indéfini</option>
                <option value="lundi">Lundi</option>
                <option value="mardi">Mardi</option>
                <option value="mercredi">Mercredi</option>
                <option value="jeudi">Jeudi</option>
                <option value="vendredi">Vendredi</option>
                <option value="samedi">Samedi</option>
                <option value="dimanche">Dimanche</option>
              </select>
            {/* </div> */}
          </div>
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            {/* <div className={stylesRegistration.inputRegistrationContainer2}> */}
              <p className={stylesRegistration.inputTitle}>Heure de début</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <SelectTime
                  value={props.data.startHours}
                  onChange={(value) => handleInputChange('startHours', value)}
                  maxValue={24}
                />
                <SelectTime
                  value={props.data.startMinutes}
                  onChange={(value) => handleInputChange('startMinutes', value)}
                  maxValue={60}
                />
              </div>
            </div>
          {/* </div> */}
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            {/* <div className={stylesRegistration.inputRegistrationContainer2}> */}
              <p className={stylesRegistration.inputTitle}>Heure de fin</p>
              <div className={stylesRegistration.inputSelectContainer}>
                <SelectTime
                  value={props.data.endHours}
                  onChange={(value) => handleInputChange('endHours', value)}
                  maxValue={24}
                />
                <SelectTime
                  value={props.data.endMinutes}
                  onChange={(value) => handleInputChange('endMinutes', value)}
                  maxValue={60}
                />
              </div>
            {/* </div> */}
          </div>
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            {/* <div className={stylesRegistration.inputRegistrationContainer}> */}
              <p className={stylesRegistration.inputTitle}>Niveau</p>
              <select
                className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
                id="grade"
                value={props.data.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
              >
                <option value="tous niveaux" defaultValue>Tous niveaux</option>
                <option value="debutant">Débutant</option>
                <option value="debInter">Débutant-inter</option>
                <option value="inter">Intermédiaire</option>
                <option value="interAvance">Inter-avancé</option>
                <option value="avance">Avancé</option>
              </select>
            </div>
          {/* </div> */}
        </div>

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            {/* <div className={stylesRegistration.inputRegistrationContainer}> */}
              <p className={stylesRegistration.inputTitle}>Animateur</p>
              <input
                className={stylesRegistration.inputRegistration}
                type="text"
                // placeholder="John Doe"
                aria-label="Animator"
                id="Animator"
                onChange={(e) => handleInputChange('animator', e.target.value)}
                value={props.data.animator}
              />
            </div>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default RegularClassDetailForm;

