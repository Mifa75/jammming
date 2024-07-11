import React from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove }) {
  const addTrack = () => {
    onAdd && onAdd(track);
  };

  const removeTrack = () => {
    onRemove && onRemove(track);
  };

  return (
    <div className={styles.Track}>
      <div className={styles.TrackInformation}>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {onAdd && <button className={styles.TrackAction} onClick={addTrack}>+</button>}
      {onRemove && <button className={styles.TrackAction} onClick={removeTrack}>-</button>}
    </div>
  );
}

export default Track;



