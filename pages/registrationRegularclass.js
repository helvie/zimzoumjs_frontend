import RegistrationRegularclass from '../components/OrganismUpdateAndRegistration/RegistrationRegularclass';
import Header from '../components/SmallElements/Header';
import stylesGeneral from '../styles/General.module.css';
import stylesRegistration from '../styles/Registration.module.css';

////////////////////////////////////////////////////////////////////////////////

function RegistrationRegularclassPage() {

    return (

        <main className={stylesGeneral.orgContent}>
        <Header />
        <div className={stylesRegistration.formContainer}>
          <div className={stylesRegistration.formBackground}>
            <h1 className={stylesRegistration.formTitle}>Ajouter une activité</h1>

        <div><RegistrationRegularclass activityUpdate={false}/></div>

        </div>
      </div>
    </main>
    )
  }
  
  export default RegistrationRegularclassPage;
  
