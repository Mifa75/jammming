import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange }) {
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div className={styles.Playlist}>
      <input
        value={playlistName}
        onChange={handleNameChange}
        className={styles.PlaylistName}
      />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} />
      <button className={styles.SaveButton}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;



