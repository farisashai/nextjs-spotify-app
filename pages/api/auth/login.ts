// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";

// These are the application scopes you will be request from each user logging in
const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-private",
  "user-read-email",
  "user-follow-modify",
  "user-follow-read",
  "user-library-modify",
  "user-library-read",
  "streaming",
  "app-remote-control",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-state",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-read-private",
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
