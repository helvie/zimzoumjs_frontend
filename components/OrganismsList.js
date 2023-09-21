import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';

import Header from './SmallElements/Header';
import OrganismsListOneOrg from '../components/OrganismsListOneOrg';
import { BACKEND_URL } from '../utils/urls';
import Loading from './SmallElements/Loading';

////////////////////////////////////////////////////////////////////////////////

const Map = dynamic(() => import('./SmallElements/Map'), { ssr: false });

function OrganismList() {

  const allColors = ["#efc22b","#72A3D2", "#FA9255", "#F06761", "#AEB861", "#E699A6", "#ffffff"];
  let numberOfBackground = 0; // Utilisez "let" au lieu de "const" pour permettre la mise à jour

  const [divElements, setDivElements] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Ajoutez un état isLoading initial à true

  // Récupération des données de tous les organismes

  useEffect(() => {
    fetch(`${BACKEND_URL}/organisms/allOrganisms`)
      .then(response => response.json())
      .then(data => {
        setDivElements(data.data);
        setIsLoading(false); // Mettez isLoading à false une fois les données chargées
      });
  }, []);

  // Initialisation de l'affichage des organismes

  const organisms = divElements.map((data, i) => {
     numberOfBackground = numberOfBackground === allColors.length ? 0 : numberOfBackground + 1;

    return <OrganismsListOneOrg key={i} orgName={data.orgName} route={data.location.route}
      postalCode={data.location.postalCode} city={data.location.city}
      organismNumber={data.orgNumber} backgroundColor={allColors[numberOfBackground]} />;

  });

  return (
    <main className={styles.orgContent}>
      <Header />
      <div className={styles.organismsContainer}>
        {isLoading ? (
          <Loading /> // Affichez le composant de chargement tant que les données ne sont pas chargées
        ) : (
          organisms // Affichez les organismes une fois les données chargées
        )}
      </div>
    </main>
  );

}

export default OrganismList;
