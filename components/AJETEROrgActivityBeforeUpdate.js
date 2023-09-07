import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil, faTrash, faCaretLeft, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import OrgActivityDetailUpdate from './OrganismUpdate/ActivityDetailUpdate';
import stylesGeneral from '../styles/General.module.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { daysList } from '../utils/dataObjects';
import { gradeList } from '../utils/dataObjects';
import { availabilityList } from '../utils/dataObjects';
import RegistrationRegularClass from './RegistrationRegularClass';
import OrgActivityDetailBeforeUpdate from './OrgActivityDetailBeforeUpdate';

function OrgActivityBeforeUpdate(props) {

  // console.log("is editing "+props.isEditing)

  const {
    startAge,
    endAge,
    activity,
    description,
    regularClassesDetails,
    visible,
    _id,
  } = props.data;



  // console.log("dataaa : " + _id)

  if (props.data[0]) { console.log(props.detail[0].detailStartAge) }

  // const backgroundArrow = { backgroundColor: props.backgroundArrowColor };
  // const color = { color: props.color };
  // const [activityVisible, setActivityVisible] = useState(visible)

  // const [activityArrayItem, setActivityArrayItem] = useState(0);
  // const [activityScreen, setActivityScreen] = useState(0);

  // const nbOfClasses = props.detail.length;




  const classes = regularClassesDetails.map((data, i) => {
    // return <OrgActivityDetailUpdate key={i} detail={data}
    return (
    <OrgActivityDetailBeforeUpdate key={i} detail={data}/>
    )
    // <div key={i} className={styles.detailActivityBeforeUpdate}>
    //   <p>De {data.detailStartAge} à {data.detailEndAge} ans</p>
    //   <p>{daysList[data.day]} de {data.startHours}:{data.startMinutes ? data.startMinutes : "00"} à {data.endHours}:{data.endMinutes ? data.endMinutes : "00"}</p>
    //   <p>Niveau : {gradeList[data.grade]}</p>
    //   <p>Animateur : {data.animator}</p>
    //   <p>Disponibilité : {availabilityList[data.availability]}</p>
    //   <p>{i}</p>

    // </div>
    // />;

  });

  return (
    props.isEditing ? (
              <div className={styles.orgDataUpdate} style={{ marginTop: "0px" }}>

          <RegistrationRegularClass key={"1"} data={props.data} activityUpdate={true} />
        </div>
      // <p>iui</p>

    ) : (
      <div className={styles.activityBeforeUpdate}>
      {/* <FontAwesomeIcon
        style={{ color: '#000' }}
        onClick={() => props.updateIsEditingActivity(_id)}
        icon={faPencil}
        className={styles.pencilIcon}
      /> */}
      <h2>{activity}</h2>
      <p>(de {startAge} à {endAge} ans)</p>
      <div>
        <FormControlLabel
          className={styles.orgSwitchUpdate}
          control={
            <Switch
              checked={visible}
              onChange={async (e) => {
                console.log("checked : " + e.target.checked);
                // await setOrgVisible(e.target.checked);
                // divElements.orgVisible = e.target.checked;
                // await handleFieldBlur({ type: "switch" }, "orgVisible");
              }}
              color="default"
            />
          }
          label={<span style={{ fontSize: '18px' }}>{visible ? 'Visible' : 'Non visible'}</span>}
          style={{ color: visible ? '#000000' : '#a0a7b2' }}
        />
      </div>
      <p>{description}</p>
      {classes}
    </div>
    )
  );
}

export default OrgActivityBeforeUpdate;