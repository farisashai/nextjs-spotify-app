// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { getSessionCookie } from "utils/cookies";
import { createSpotifyApi } from "utils/spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { id },
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
