import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'

function Home() {
  return (
    <main className={styles.main}>
      <img className={styles.headerImg} src='images/visuelZimzoum.jpg' />
      <div className={styles.organismNameImgContainer}>
        {/* <div className={styles.organismImgContainer}> */}
        <img className={styles.organismImg} src='images/local.jpg' />

        {/* </div> */}
        <div className={styles.organismNameContainer}>
          <div className={styles.organismNameSubContainer}>
            <h1 className={styles.organismName}>Maison des jeunes de Patoilis</h1>
            <p className={styles.text}>10 rue de Paris – 95200 Villebelle</p>
            <p className={styles.text}>contact@mjcpatoilis.com - 01.56.25.26.89</p>
            <p className={styles.text}>www.mjcpatoilis.com</p>
            <p className={styles.text}>Présidente : Madame Bateau</p>
            <p className={styles.text}><FontAwesomeIcon icon={faFilePdf} /> Télécharger la brochure :</p>

          </div>
        </div>

      </div>


      <div className={styles.organismPresentation}>
        <p>La MJC est un lieu vibrant et dynamique où les jeunes et les membres de la communauté peuvent se rassembler, s'exprimer et participer à une variété d'activités enrichissantes. Notre objectif est de promouvoir l'épanouissement personnel, le développement des talents et l'engagement social à travers un large éventail de programmes culturels, artistiques, sportifs et éducatifs.
        </p>
        <p>
          Que vous soyez passionné par les arts, la musique, le sport ou la découverte de nouvelles compétences, la MJC offre des possibilités pour tous les goûts et toutes les tranches d'âge. Nos ateliers créatifs encouragent l'expression artistique et permettent aux participants de développer leur sensibilité esthétique. De la peinture à la danse, de la photographie au théâtre, vous trouverez certainement une activité qui correspond à vos intérêts.
        </p>
      </div>

    </main>
  );
}

export default Home;
