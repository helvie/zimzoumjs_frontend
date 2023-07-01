import React, { useState } from 'react';
import styles from '../styles/Burger.module.css';

function OrganismCreation() {


    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    return (
        <div className={styles.registerSection}>
        <p>Sign-up</p>
        <input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
        <input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
        <button id="register" onClick={() => handleRegister()}>Register</button>
    </div>
    )
  }
  
  export default OrganismCreation;
  
