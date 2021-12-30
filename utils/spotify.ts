// utils/spotify.ts
import SpotifyWebApi from "spotify-web-api-node";

// Create a new instance of the Spotify API
const createSpotifyApi = (access_token: string): SpotifyWebApi => {
  const spotify = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  spotify.setAccessToken(access_token);

  return spotify;
};

export default createSpotifyApi;
