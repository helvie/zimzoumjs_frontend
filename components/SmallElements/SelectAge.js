import React from 'react';

function SelectAge({ value, onChange, maxValue, name }) {
  const options = Array.from({ length: maxValue + 1 }, (_, index) => index);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <select value={value} onChange={handleSelectChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option} ans
        </option>
      ))}
    </select>
  );
}

export default SelectAge;

