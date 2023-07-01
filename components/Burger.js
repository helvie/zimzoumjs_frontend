import React, { useState } from 'react';
import stylesBurger from '../styles/Burger.module.css';
import { useRouter } from 'next/router';

function Burger() {
  const [menuActive, setMenuActive] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    console.log("C'est cliqué");
    setMenuActive(!menuActive);
  };

  const handlePageClick = (path) => {
    router.push(path);
  };

  return (
    <div className={stylesBurger.menuCircle}>
      <button
        className={`${stylesBurger.hamburger} ${menuActive ? stylesBurger['hamburger-active'] : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
      </button>

      <div className={`${stylesBurger.owlMenu} ${menuActive ? stylesBurger.active : ''}`}>
        <ul>
          <li>
            <a onClick={() => handlePageClick('/organismCreation')}>Page 1</a>
          </li>
          <li>
            <a onClick={() => handlePageClick('/page2')}>Page 2</a>
          </li>
          <li>
            <a onClick={() => handlePageClick('/page3')}>Page 3</a>
          </li>
          <li>
            <a onClick={() => handlePageClick('/page4')}>Page 4</a>
          </li>
          <li>
            <a onClick={() => handlePageClick('/page5')}>Page 5</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Burger;