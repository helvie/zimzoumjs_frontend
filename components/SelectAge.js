import React from 'react';

function SelectAge({ value, onChange, maxValue }) {
  const options = Array.from({ length: maxValue + 1 }, (_, index) => index);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option} ans
        </option>
      ))}
    </select>
  );
}

export default SelectAge;

// import React from 'react';

// function SelectAge({ value, onChange, maxValue }) {
//   const options = Array.from({ length: maxValue + 1 }, (_, index) => index);

//   return (
//     <select value={value} onChange={(e) => onChange(e.target.value)}>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option} ans
//         </option>
//       ))}
//     </select>
//   );
// }

// export default SelectAge;

// import React from 'react';
// import stylesRegistration from '../styles/Registration.module.css';

// const SelectAge = (props) => {
//   const ageOptions = Array.from({ length: 100 }, (_, index) => index);
//   const ageMenu = ageOptions.map((age) => (
//     <option key={age} value={age}>
//       {age} ans
//     </option>
//   ));

//   const handleAgeChange = (e) => {
//     props.onChange(parseInt(e.target.value));
//   };

//   return (
//     <select
//     value={props.value || ''}
//     onChange={handleAgeChange}      
//     className={stylesRegistration.inputRegistration + ' ' + stylesRegistration.placeholderOption}
//     >
//       {ageMenu}
//     </select>
//   );
// };

// export default SelectAge;