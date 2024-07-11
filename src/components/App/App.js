import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import styles from './App.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Song A", artist: "Artist A", album: "Album A" },
    { id: 2, name: "Song B", artist: "Artist B", album: "Album B" },
    { id: 3, name: "Song C", artist: "Artist C", album: "Album C" }
  ]);

  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 4, name: "Song D", artist: "Artist D", album: "Album D" },
    { id: 5, name: "Song E", artist: "Artist E", album: "Album E" }
  ]);

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
    console.log('Saving playlist:', playlistName, trackURIs);

    // Mock saving to Spotify
    mockSavePlaylistToSpotify(playlistName, trackURIs).then(() => {
      // Reset playlist
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };

  // Mock function to simulate saving playlist to Spotify
  const mockSavePlaylistToSpotify = (name, uris) => {
    return new Promise((resolve) => {
      console.log(`Mock saving playlist "${name}" to Spotify with URIs:`, uris);
      setTimeout(resolve, 1000);
    });
  };

  return (
    <div className={styles.App}>
      <h1>Jammming</h1>
      <SearchBar />
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




