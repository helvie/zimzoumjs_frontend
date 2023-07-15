import React from 'react';
import stylesRegistration from '../styles/Registration.module.css';

const SelectTime = (props) => {
  const options = [...Array(props.maxValue).keys()]; // Crée un tableau de 0 à (maxValue - 1) pour les options

  return (
    <select value={props.value} onChange={props.onChange} className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.toString().padStart(2, '0')}
        </option>
      ))}
    </select>
  );
};

export default SelectTime;