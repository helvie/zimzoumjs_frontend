import React from 'react';
import stylesRegistration from '../styles/Registration.module.css';

const SelectAge = (props) => {
  const ageOptions = Array.from({ length: 100 }, (_, index) => index);
  const ageMenu = ageOptions.map((age) => (
    <option key={age} value={age}>
      {age} ans
    </option>
  ));

  return (
    <select
      value={props.value}
      onChange={props.onChange}
      className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
    >
      {ageMenu}
    </select>
  );
};

export default SelectAge;