import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import stylesBurger from '../../styles/Burger.module.css';
import { useRouter } from 'next/router';

import { updateCreatedOrganism, updateOrganismRegularClass } from '../../reducers/user';
import { logout } from '../../reducers/user';
import { BACKEND_URL } from '../../utils/urls';

////////////////////////////////////////////////////////////////////////////////

function Burger() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const mail = useSelector((state) => state.user.mail);
 
  const createdOrganism = useSelector((state) => state.user.createdOrganism);
  const organismRegularClass = useSelector((state) => state.user.organismRegularClass);
  const [menuActive, setMenuActive] = useState(false);
  const router = useRouter();

  //oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/organisms/createdOrganism`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token }),
        });
        const data = await response.json();
        data.organism ? dispatch(updateCreatedOrganism(true)) : dispatch(updateCreatedOrganism(false));
        console.log("result rg + "+data.regularClass)
        data.regularClass ? dispatch(updateOrganismRegularClass(true)) : dispatch(updateOrganismRegularClass(false));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  //oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  //oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

  const handlePageClick = (path) => {
    router.push(path);
  };

  //oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

  const handleLogout = (path) => {
    dispatch(logout())
    // router.push(path);
  };

  ////////////////////////////////////////////////////////////////////////////////

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
          {token && (
            <li>
              <a style={{ color: "#fa9255" }}>{mail}</a>
            </li>
          )}
          <li>
            <a onClick={() => handlePageClick('/')}>Home</a>
          </li>
          {!token && (
            <li>
              <a onClick={() => handlePageClick('/registrationUser')}>Enregistrement utilisateur</a>
            </li>
          )}
          {token && !createdOrganism && (
            <li>
              <a onClick={() => handlePageClick('/registrationPrivateDataOrg')}>Enregistrement organisme</a>
            </li>
          )}
          {token && createdOrganism ? (
            <li>
              <a onClick={() => handlePageClick('/registrationRegularClass')}>Ajout d'une activité</a>
            </li>
          ) : null}
          {token && createdOrganism && organismRegularClass ? (
            <li>
              <a onClick={() => handlePageClick('/organismUpdate')}>Modification organisme</a>
            </li>
          ) : null}
          {token && (
            <li>
              <a onClick={() => handleLogout()}>Logout</a>
            </li>
          )}
          {!token && (
            <li>
              <a onClick={() => handlePageClick('/connectionUser')}>Login</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Burger;