import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ActivityDetailBeforeUpdate from './ActivityDetailBeforeUpdate';

////////////////////////////////////////////////////////////////////////////////

function ActivityBeforeUpdate(props) {

  const data = props.data;
  const [detailsArray, setDetailsArray] = useState([]);

  const {
    startAge,
    endAge,
    activity,
    description,
    regularclassesdetails,
    visible,
    _id,
  } = props.data;

  //ooooooooooooooooooooooo Récupération des données d'activité oooooooooooooooooooooo

  useEffect(() => {
    const newDetails = data.regularclassesdetails.map((regularclassdetail, i) => {
      const {
        availability,
        availabilityDate,
        detailStartAge,
        detailEndAge,
        day,
        startHours,
        startMinutes,
        endMinutes,
        endHours,
        grade,
        animator
      } = regularclassdetail;

      return {
        id: i,
        data: {
          availability,
          availabilityDate,
          detailStartAge,
          detailEndAge,
          day,
          startHours,
          startMinutes,
          endMinutes,
          endHours,
          grade,
          animator
        }
      };
    });

    setDetailsArray(newDetails);
  }, [data.regularclassesdetails]);

  //oooooooooooooooooooooooo Mise en édition de données ooooooooooooooooooooooooo

  const handleEditClick = () => {
    props.onEditActivity(_id);
  };

  //ooooooooooooo Initialisation des champs/textes de créneaux d'activité ooooooooooo

  const details = detailsArray.map((data, i) => {
    return (
      <ActivityDetailBeforeUpdate key={i} detail={data.data} />
    )
  });

  ////////////////////////////////////////////////////////////////////////////////

  return (

    <div className={styles.activityBeforeUpdate}>
      <div className="flex w-full flex-col items-center">

        {/* ---------------------Icone édition formulaire ----------------- */}


        <FontAwesomeIcon
          style={{ color: '#000' }}
          onClick={handleEditClick}
          icon={faPencil}
          className={styles.pencilIcon}
        />

        {/* ------------------ Nom de l'activité et tranche d'âge---------------- */}

        <h2>{activity}</h2>
        <p>(de {startAge} à {endAge} ans)</p>

        {/* ----------------- Switch activité visible/non visible ----------------- */}
        
        <div>
          <FormControlLabel
            className={styles.orgSwitchUpdate}
            control={
              <Switch
                checked={visible}
                onChange={async (e) => {
                }}
                color="default"
              />
            }
            label={<span style={{ fontSize: '18px' }}>{visible ? 'Visible' : 'Non visible'}</span>}
            style={{ color: visible ? '#000000' : '#a0a7b2' }}
          />
        </div>

        {/* ------------------- Description activité-------------------------- */}

        <p>{description}</p>

        {/* --------------- Affichage créneaux d'activité--------------------- */}

      </div>
      
      <div className={styles.detailsContainer}>
        {details}
      </div>

    </div>
  );
}

export default ActivityBeforeUpdate;