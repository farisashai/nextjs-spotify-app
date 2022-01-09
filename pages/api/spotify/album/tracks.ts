// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { getSessionCookie } from "utils/cookies";
import axios from "axios";
import { API_URL } from "utils/constants";
import { createSpotifyApi, setAuthHeaders } from "utils/spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { id = "4zUW6lwQf3wHRdYawFEEWQ" },
    } = req;

    const cookies = cookie.parse(req.headers.cookie || "");
    const session = await getSessionCookie(cookies);
    const spotifyApi = createSpotifyApi(session.token.access_token);

    if (typeof id == "string") {
      const tracks = await spotifyApi.getAlbumTracks(id);
      res.status(200).json(tracks);
    } else {
      res.status(404).end();
    }
  } catch {
    return res.status(404).end();
  }
};

export default handler;
