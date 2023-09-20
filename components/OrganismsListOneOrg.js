import styles from '../styles/Home.module.css'
import React from 'react';
import { useRouter } from 'next/router';

////////////////////////////////////////////////////////////////////////////////

function OrganismsListOneOrg(props) {


  const router = useRouter();

  const handleOrganismDisplay = () => {
    router.push("/organismDisplay/[orgNumber]", `/organismDisplay/${props.organismNumber}`);
  }

////////////////////////////////////////////////////////////////////////////////

  return (
      <div id={props.organismNumber} className={styles.organismContainer} style={{backgroundColor:props.backgroundColor}}
      onClick={() => handleOrganismDisplay()}>

        <h2 className={styles.subtitle}>{props.orgName}</h2>
        <p className={styles.text}>{props.route}</p>
        <p className={styles.text}>{props.postalCode} {props.city}</p>
      </div>
      
  );

}

export default OrganismsListOneOrg;
