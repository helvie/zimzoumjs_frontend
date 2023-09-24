import React from 'react';

import SelectTime from '../SmallElements/SelectTime';
import SelectAge from '../SmallElements/SelectAge';
import stylesRegistration from '../../styles/Registration.module.css';
import { availabilityList, daysList, gradeList } from '../../utils/dataObjects';

////////////////////////////////////////////////////////////////////////////////

function RegularclassdetailForm(props) {

  const errors = props.errors;

  const handleInputChange = (fieldName, value) => {
    props.onFieldChange(fieldName, value);
  };

  console.log (props.data.detailStartAge+ " " +props.data.detailEndAge)
  console.log (errors)

  ////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="w-full">
      <div className={stylesRegistration.detailActivityForm}>

        {/* ------------------ Menu déroulant disponibilité --------------------- */}

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <p className={stylesRegistration.inputTitle}>Disponibilité</p>
            <select
              className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
              id="availability"
              value={props.data.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
            >
              <option value="">-</option>
              {Object.entries(availabilityList).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ------------------------ Input age minimum ------------------------ */}

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <p className={stylesRegistration.inputTitle}>Age minimum</p>
            <div className={stylesRegistration.inputSelectContainer}>
              <SelectAge
                value={props.data.detailStartAge}
                onChange={(value) => handleInputChange('detailStartAge', value)}
                maxValue={98}
                name="detailStartAge"
              />
            </div>
            {errors && errors.age && <p className={stylesRegistration.error}>{errors.age}</p>}
          </div>
        </div>

        {/* ------------------------ Input age maximum ------------------------ */}

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <p className={stylesRegistration.inputTitle}>Age maximum</p>
            <div className={stylesRegistration.inputSelectContainer}>
              <SelectAge
                value={props.data.detailEndAge}
                onChange={(value) => handleInputChange('detailEndAge', value)}
                maxValue={99}
              />
            </div>
          </div>
        </div>

        {/* --------------------- Menu déroulant jour ------------------------ */}

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <p className={stylesRegistration.inputTitle}>Jour</p>
            <select
              className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
              id="day"
              value={props.data.day}
              onChange={(e) => handleInputChange('day', e.target.value)}
            >
              <option value="">-</option>
              {Object.entries(daysList).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ------------------- Menu déroulant heure de début --------------------- */}

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
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
        </div>

        {/* ---------------------- Menu déroulant heure de fin --------------------- */}

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
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
          </div>
        </div>

        {/* -------------------- Menu déroulant niveau du cours -------------------- */}

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <p className={stylesRegistration.inputTitle}>Niveau</p>
            <select
              className={`${stylesRegistration.inputRegistration} ${stylesRegistration.placeholderOption}`}
              id="grade"
              value={props.data.grade}
              onChange={(e) => handleInputChange('grade', e.target.value)}
            >
              <option value="">-</option>
              {Object.entries(gradeList).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ------------------------ Input animateur ------------------------ */}

        <div className={stylesRegistration.formDetailActivityElement}>
          <div className={stylesRegistration.formDetailActivitySubelement}>
            <p className={stylesRegistration.inputTitle}>Animateur</p>
            <input
              className={stylesRegistration.inputRegistration}
              type="text"
              aria-label="Animator"
              id="Animator"
              onChange={(e) => handleInputChange('animator', e.target.value)}
              value={props.data.animator}
            />
            {errors && errors.animator && <p className={stylesRegistration.error}>{errors.animator}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegularclassdetailForm;

