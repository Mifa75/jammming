const clientId = '1ef948a9d0fc410699cb86263cc0255a'; // Replace with your Spotify client ID
const redirectUri = 'http://localhost:3000';
let accessToken;
let expiresIn;

const Spotify = {
    getAccessToken() {
      if (accessToken) {
        return accessToken;
      }
  
      const urlParams = window.location.href.match(/access_token=([^&]*)/);
      const expirationParams = window.location.href.match(/expires_in=([^&]*)/);
  
      if (urlParams && expirationParams) {
        accessToken = urlParams[1];
        expiresIn = Number(expirationParams[1]);
  
        // Clear the parameters from the URL
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = accessUrl;
      }
    },
  
    async search(term) {
      const accessToken = Spotify.getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const jsonResponse = await response.json();
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    },
  
    async savePlaylist(name, trackUris) {
      if (!name || !trackUris.length) {
        return;
      }
  
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userId;
  
      // Get the user's ID
      const response = await fetch('https://api.spotify.com/v1/me', { headers: headers });
      const jsonResponse = await response.json();
      userId = jsonResponse.id;
  
      // Create a new playlist
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: name })
      });
      const createPlaylistJson = await createPlaylistResponse.json();
      const playlistId = createPlaylistJson.id;
  
      // Add tracks to the new playlist
      return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ uris: trackUris })
      });
    }
  };
  
  export default Spotify;
