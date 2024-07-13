import React from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove, isRemoval }) {
  const addTrack = () => {
    onAdd(track);
  };

  const removeTrack = () => {
    onRemove(track);
  };

  return (
    <div className={styles.Track}>
      <div className={styles.TrackInformation}>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {isRemoval ? (
        <button className={styles.TrackAction} onClick={removeTrack}>
          -
        </button>
      ) : (
        <button className={styles.TrackAction} onClick={addTrack}>
          +
        </button>
      )}
    </div>
  );
}

export default Track;



