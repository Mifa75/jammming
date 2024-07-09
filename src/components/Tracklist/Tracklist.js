import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css';

function Tracklist() {
  return (
    <div className={styles.Tracklist}>
      <Track />
      <Track />
      <Track />
    </div>
  );
}

export default Tracklist;

