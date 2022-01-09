// utils/spotify.ts
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { splitArray } from "utils";
import { UserSession } from "./cookies";

// Create a new instance of the Spotify API
export const createSpotifyApi = (access_token: string): SpotifyWebApi => {
  const spotify = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  spotify.setAccessToken(access_token);

  return spotify;
};

export const setAuthHeaders = (session: UserSession) => {
  return {
    headers: {
      Authorization: `Bearer ${session.token.access_token}`,
    },
  };
};

export const savePlaylist = async (
  title = "Top Tracks",
  description,
  tracks = []
) => {
  const { id } = await axios
    .post("/api/spotify/playlist/create", {
      title: title,
      description,
      ispublic: false,
      collaborative: false,
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));

  const success = await Promise.all(
    splitArray(tracks, 25).map((tracklist) => {
      axios.post("/api/spotify/playlist/saveTracks", {
        id,
        tracks: tracklist,
      });
    })
  );
  return Boolean(success);
};
