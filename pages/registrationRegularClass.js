import RegistrationRegularClass from '../components/OrganismUpdateAndRegistration/RegistrationRegularClass';
import Header from '../components/SmallElements/Header';
import stylesGeneral from '../styles/General.module.css';
import stylesRegistration from '../styles/Registration.module.css';

////////////////////////////////////////////////////////////////////////////////

function RegistrationRegularClassPage() {

    return (

        <main className={stylesGeneral.orgContent}>
        <Header />
        <div className={stylesRegistration.formContainer}>
          <div className={stylesRegistration.formBackground}>
            <h1 className={stylesRegistration.formTitle}>Ajouter une activité</h1>

        <div><RegistrationRegularClass activityUpdate={false}/></div>

        </div>
      </div>
    </main>
    )
  }
  
  export default RegistrationRegularClassPage;
  
