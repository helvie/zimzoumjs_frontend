import styles from '../styles/Home.module.css'
import React from 'react';
import { useEffect, useState } from 'react';
import OrgActivity from './OrganismActivity';
import { shuffleArray } from '../utils/shuffleArray';
import dynamic from 'next/dynamic';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { updateScreenHeight } from '../reducers/screen';
import { updateScreenWidth } from '../reducers/screen';
import OrganismsListOneOrg from '../components/OrganismsListOneOrg';

const Map = dynamic(() => import('./Map'), { ssr: false });

function OrganismList() {

  const screenHeight = useSelector((state) => state.screen.screenHeight);
  const screenWidth = useSelector((state) => state.screen.screenWidth);

  const dispatch = useDispatch();
  let colorsArray = [];
  let color = "#000000"

  const [allColors, setAllColors] = useState([]);
  const [divElements, setDivElements] = useState([]);

  function handleChange() {
    console.log("essai")
  }

  useEffect(() => {
    fetch('http://localhost:3000/organisms/allOrganisms')
      .then(response => response.json())
      .then(data => {
        setDivElements(data.data);
      });
  }, []);

      const organisms = divElements.map((data, i) => {
        // console.log(data.organismNumber)
        return <OrganismsListOneOrg key={i} orgName={data.orgName} route={data.location.route} 
        postalCode={data.location.postalCode} city={data.location.city} 
        organismNumber={data.orgNumber}/>;
      });

  let backgroundColor = "#ffffff";
  let backgroundArrowColor = "#ffffff";
  let thirdScreen = screenHeight / 3;

  return (
    <div className={styles.organismsContainer}>
      {organisms}
    </div>
  );

}

export default OrganismList;
