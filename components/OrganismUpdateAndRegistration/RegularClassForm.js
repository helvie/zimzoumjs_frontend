import stylesRegistration from '../../styles/Registration.module.css';
import { categoryList } from '../../utils/dataObjects';
import SelectAge from '../SmallElements/SelectAge';
import { FormControlLabel } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

function RegularClassForm(props) {

  const handleInputChange = (fieldName, value) => {
    props.updateActivityField(fieldName, value);
  };


  return (
    <>
      {/* ---------------------------------- CATEGORY -------------------------------------- */}

      <div className={`${stylesRegistration.formActivityElement1} ${stylesRegistration.formActivityElement}`}>
        <div className={stylesRegistration.formActivitySubelement}>


          <p className={stylesRegistration.inputTitle}>Catégorie</p>
          <select
            className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
            id="category"
            value={props.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          >

            <option value="">-</option>
            {Object.entries(categoryList).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------------------------------- ACTIVITY -------------------------------------- */}

      <div className={`${stylesRegistration.formActivityElement2} ${stylesRegistration.formActivityElement}`}>
        <div className={stylesRegistration.formActivitySubelement}>

          <p className={stylesRegistration.inputTitle}>Activité</p>

          <input
            className={stylesRegistration.inputRegistration}
            type="text"
            aria-label="Activity"
            name="Activity"
            id="Activity"
            onChange={(e) => handleInputChange("activity", e.target.value)}
            value={props.activity}
          />
          {/* {errors.activity && <p className={stylesRegistration.error}>{errors.activity}</p>} */}
        </div>
      </div>

      {/* --------------------------------- AGE MINIMUM ------------------------------------ */}

      <div className={`${stylesRegistration.formActivityElement1} ${stylesRegistration.formActivityElement}`}>
        <div className={stylesRegistration.formActivitySubelement}>
          <p className={stylesRegistration.inputTitle}>Age minimum</p>
          <div className={stylesRegistration.inputSelectContainer}>
            <SelectAge
              value={props.startAge}
              name="startAge"
              onChange={(selectedValue) => handleInputChange("startAge", selectedValue)}
              maxValue={98}
            />
          </div>
        </div>
      </div>

      {/* --------------------------------- AGE MAXIMUM ------------------------------------ */}

      <div className={`${stylesRegistration.formActivityElement1} ${stylesRegistration.formActivityElement}`}>
        <div className={stylesRegistration.formActivitySubelement}>
          <p className={stylesRegistration.inputTitle}>Age maximum</p>
          <div className={stylesRegistration.inputSelectContainer}>
          <SelectAge
              value={props.endAge}
              name="endAge"
              onChange={(selectedValue) => handleInputChange("endAge", selectedValue)}
              maxValue={99}
            />
          </div>
        </div>
      </div>

      {/* ------------------------------ AGE DESCRIPTION ------------------------------------ */}

      <div className={`${stylesRegistration.formActivityElement3} ${stylesRegistration.formActivityElement}`}>
        <div className={stylesRegistration.formActivitySubelement}>
          <p className={stylesRegistration.inputTitle}>Description</p>

          <textarea
            className={stylesRegistration.inputRegistration}
            type="text"
            name="description"
            aria-label="description"
            id="description"
            onChange={(e) => handleInputChange("description", e.target.value)}
            value={props.description}
          />
          {/* {errors.description && <p className={stylesRegistration.error}>{errors.description}</p>} */}
        </div>
      </div>

      {/* ------------------------- VISIBLE / NON VISIBLE ------------------------------ */}

      <div className={`${stylesRegistration.formActivityElement2} ${stylesRegistration.formActivityElement}`}>
        <div className={stylesRegistration.formActivitySubelement2}>

          <FormControlLabel
            className={stylesRegistration.switchActivity}
            control={
              <Switch
                name="visible"
                checked={props.visible}
                onChange={(e) => handleInputChange("visible", e.target.value)}
                color="default"
              />
            }
            label="Activité visible par l'internaute"

            style={{ color: props.visible ? '#F97C2F' : '#000000', marginBottom: '50px' }} />
        </div>
      </div>
    </>
  )
}

export default RegularClassForm;

