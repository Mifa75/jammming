import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css';

function Tracklist({ tracks, onAdd, onRemove }) {
  return (
    <div className={styles.Tracklist}>
      {tracks.map(track => (
        <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default Tracklist;





