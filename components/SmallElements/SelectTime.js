import React from 'react';

function SelectTime({ value, onChange, maxValue }) {
  const options = Array.from({ length: maxValue + 1 }, (_, index) => index);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.toString().padStart(2, '0')}
        </option>
      ))}
    </select>
  );
}

export default SelectTime;
