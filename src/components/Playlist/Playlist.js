import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist() {
  return (
    <div className={styles.Playlist}>
      <input value="New Playlist" />
      <Tracklist />
      <button className={styles.SaveButton}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;

