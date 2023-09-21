import React from 'react';
import styles from "../../styles/Home.module.css"

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>Chargement en cours...</p>
    </div>
  );
};

export default Loading;