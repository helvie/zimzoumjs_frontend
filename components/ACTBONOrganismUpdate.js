import Header from '../SmallElements/Header';
import stylesGeneral from '../../styles/General.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ActivityBeforeUpdate from './ActivityBeforeUpdate';
import styles from '../../styles/Home.module.css';
import ActivityUpdate from './ActivityUpdate';

const OrganismUpdate = () => {

  const [divElements, setDivElements] = useState({});
  const token = useSelector((state) => state.user.token);
  const [isEditingActivity, setIsEditingActivity] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/organisms/organismDisplayForUpdate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token }),
        });
        const data = await response.json();
        if (data.organism) {
          setDivElements(data.organism);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // N'oubliez pas d'appeler la fonction fetchData ici pour déclencher la requête au chargement du composant.
  }, [token]); // Assurez-vous d'inclure la dépendance token ici pour que le useEffect s'exécute lorsque le token change.


    // Ajoutez une fonction pour gérer la mise à jour de l'activité en édition
    const handleEditActivity = (activityId) => {
      setIsEditingActivity(activityId);
    };


  const activities = divElements.regularClasses && divElements.regularClasses.map((data, i) => (
    <div className={styles.orgDataUpdate} style={{ marginTop: "0px" }} key={i}>
      {isEditingActivity===data._id ? (
        <>
        <ActivityUpdate
          data={data}
          isEditing={isEditingActivity === data._id}
          onEditActivity={handleEditActivity} // Passez la fonction comme une prop
        />
        </>
      ) : (
        <>
        {/* <p>"raté {isEditingActivity} {data._id}"</p> */}

        <ActivityBeforeUpdate
          data={data}
          isEditing={isEditingActivity === data._id}
          onEditActivity={handleEditActivity} // Passez la fonction comme une prop
        />
                </>

      )}
    </div>
  ));


  return(
    <main className={stylesGeneral.orgContent}>
         <Header />

         {divElements && <div>{activities}</div>}
    </main>
    )
};

export default OrganismUpdate;
