import React, { useState, useEffect } from 'react';
import stylesBurger from '../styles/Burger.module.css';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { updateCreatedOrganism } from '../reducers/user';
import { logout } from '../reducers/user';

function Burger() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const createdOrganism = useSelector((state) => state.user.createdOrganism);


  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/organisms/createdOrganism`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token }),
        });
        const data = await response.json();
        if(data.organism){
          dispatch(updateCreatedOrganism(true))
        }
        else{
          dispatch(updateCreatedOrganism(false))
        }

        // setDivElements(data.organism);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  
  }, []);





  const [menuActive, setMenuActive] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handlePageClick = (path) => {
    router.push(path);
  };

  const handleLogout = (path) => {
    dispatch(logout())
    // router.push(path);
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
          {token && !createdOrganism && (
            <li>
              <a onClick={() => handlePageClick('/registrationPrivateDataOrg')}>Enregistrement organisme</a>
            </li>
          )}
          {token && createdOrganism ? (
            <>
              <li>
                <a onClick={() => handlePageClick('/registrationRegularClass')}>Enregistrement activité</a>
              </li>
              <li>
                <a onClick={() => handleLogout()}>Logout</a>
              </li>
            </>
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