import React, { useState } from 'react';
import stylesBurger from '../styles/Burger.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function Burger() {

  const token = useSelector((state) => state.user.token);

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
            <a onClick={() => handlePageClick('/')}>Home</a>
          </li>
          {!token && (
            <li>
              <a onClick={() => handlePageClick('/registrationUser')}>Enregistrement utilisateur</a>
            </li>
          )}
          <li>
            <a onClick={() => handlePageClick('/registrationPrivateDataOrg')}>Enregistrement organisme</a>
          </li>
          {token ? (
            <li>
              <a onClick={() => handlePageClick('/logout')}>Logout</a>

            </li>
          ) : (
            <li>
              <a onClick={() => handlePageClick('/connectionUser')}>Login</a>

            </li>
          )}
          {/* <li>
            <a onClick={() => handlePageClick('/page5')}>Page 5</a>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default Burger;