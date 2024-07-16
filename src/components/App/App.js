import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import styles from './App.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = '../../util/images/music.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks(prevTracks => [...prevTracks, track]);
    }
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylistToSpotify = () => {
    const trackURIs = playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };

  const search = (term) => {
    Spotify.search(term).then(tracks => {
      setSearchResults(tracks);
    });
  };

  

  return (
    <div className={`${styles.App} ${imageLoaded ? styles.ImageLoaded : styles.Loading}`}>
      <h1>Ja<span id="mcolor"><em>mmm</em></span>ing</h1>
      <SearchBar onSearch={search} />
      <div className={styles.AppPlaylist}>
        <SearchResults searchResults={searchResults} onAdd={addTrackToPlaylist} />
        <Playlist 
          playlistName={playlistName} 
          playlistTracks={playlistTracks} 
          onRemove={removeTrackFromPlaylist} 
          onNameChange={updatePlaylistName}
          onSave={savePlaylistToSpotify}
        />
      </div>
    </div>
  );
}

export default App;






