import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';

import Header from './SmallElements/Header';
import OrganismsListOneOrg from '../components/OrganismsListOneOrg';
import { BACKEND_URL } from '../utils/urls';

////////////////////////////////////////////////////////////////////////////////

const Map = dynamic(() => import('./SmallElements/Map'), { ssr: false });

function OrganismList() {

  const allColors = ["#efc22b","#72A3D2", "#FA9255", "#F06761", "#AEB861", "#E699A6", "#ffffff"];
  const numberOfBackground = 0;
  const [divElements, setDivElements] = useState([]);

  //oooooooooooooo Récupération des données de tous les organismes ooooooooooooooooo

  useEffect(() => {
    fetch(`${BACKEND_URL}/organisms/allOrganisms`)
      .then(response => response.json())
      .then(data => {
        setDivElements(data.data);
      });
  }, []);

  //oooooooooooooooooo Initialisation de l'affichage des organismes oooooooooooooooo

  const organisms = divElements.map((data, i) => {
     numberOfBackground = numberOfBackground === allColors.length ? 0 : numberOfBackground + 1;

    return <OrganismsListOneOrg key={i} orgName={data.orgName} route={data.location.route}
      postalCode={data.location.postalCode} city={data.location.city}
      organismNumber={data.orgNumber} backgroundColor = {allColors[numberOfBackground]}/>;

  });

////////////////////////////////////////////////////////////////////////////////////

  return (
    <main className={styles.orgContent}>
      <Header />
      <div className={styles.organismsContainer}>
        {organisms}
      </div>
    </main>
  );

}

export default OrganismList;
