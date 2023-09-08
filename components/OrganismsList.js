import styles from '../styles/Home.module.css'
import React from 'react';
import { useEffect, useState } from 'react';
import OrgActivity from './OrganismActivity';
import { shuffleArray } from '../utils/shuffleArray';
import dynamic from 'next/dynamic';
import Header from './SmallElements/Header';
import { useDispatch, useSelector } from 'react-redux';
// import { updateScreenHeight } from '../reducers/screen';
// import { updateScreenWidth } from '../reducers/screen';
import OrganismsListOneOrg from '../components/OrganismsListOneOrg';

const Map = dynamic(() => import('./SmallElements/Map'), { ssr: false });

function OrganismList() {

  const allColors = ["#efc22b","#72A3D2", "#FA9255", "#F06761", "#AEB861", "#E699A6", "#ffffff"];
  const numberOfBackground = 0;

  const screenHeight = useSelector((state) => state.screen.screenHeight);
  const screenWidth = useSelector((state) => state.screen.screenWidth);

console.log(screenWidth)

  const dispatch = useDispatch();
  let colorsArray = [];
  let color = "#000000"

  // const [allColors, setAllColors] = useState([]);
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
     numberOfBackground = numberOfBackground === allColors.length ? 0 : numberOfBackground + 1;

    // console.log(data.organismNumber)
    return <OrganismsListOneOrg key={i} orgName={data.orgName} route={data.location.route}
      postalCode={data.location.postalCode} city={data.location.city}
      organismNumber={data.orgNumber} backgroundColor = {allColors[numberOfBackground]}/>;


  });

  let backgroundColor = "#ffffff";
  let backgroundArrowColor = "#ffffff";
  let thirdScreen = screenHeight / 3;

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
