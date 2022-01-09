// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";

// These are the application scopes you will be request from each user logging in
const scopes = [
  "user-read-playback-state", // get current track
  "user-read-currently-playing", // get current track
  "user-modify-playback-state", // handle music player
  "user-top-read", // top tracks
  // "user-library-modify", LATER
  // "user-library-read", LATER
  // "streaming", LATER
  // "user-read-recently-played", LATER
  // "playlist-read-private", LATER
  "playlist-modify-private",
  "playlist-modify-public",
];

// Pull the values defined in your .env file
const { CLIENT_ID, REDIRECT_URI } = process.env;

const buildURL = (scopes: string[], callback: string) => {
  return (
    "https://accounts.spotify.com/authorize?" +
    "response_type=code" +
    `&client_id=${CLIENT_ID}` +
    `&scope=${encodeURIComponent(scopes.join(" "))}` +
    `&redirect_uri=${encodeURIComponent(callback)}`
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.redirect(buildURL(scopes, REDIRECT_URI));
};

export default handler;
