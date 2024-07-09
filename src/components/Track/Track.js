import React from 'react';
import styles from './Track.module.css';

function Track() {
  return (
    <div className={styles.Track}>
      <div className={styles.TrackInformation}>
        <h3>Track Name</h3>
        <p>Artist Name | Album Name</p>
      </div>
      <button className={styles.TrackAction}>+</button>
    </div>
  );
}

export default Track;

