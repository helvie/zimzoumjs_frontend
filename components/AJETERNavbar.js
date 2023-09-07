import React, { useState } from 'react';
import stylesHeader from '../styles/Header.module.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="burger-container" className={isOpen ? stylesHeader.open : ''} onClick={handleClick}>        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </div>

  );
};

export default Navbar;