// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { getSessionCookie } from "utils/cookies";
import { createSpotifyApi } from "utils/spotify";
import { splitArray } from "utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const session = await getSessionCookie(cookies);

    const { id, tracks = [] } = req.body;

    const spotifyApi = createSpotifyApi(session.token.access_token);

    const x = await Promise.all(
      splitArray(tracks, 50).map(async (trackList: string[]) => {
        return await spotifyApi.addTracksToPlaylist(id, trackList);
      })
    );

    res.status(200).end();
  } catch {
    return res.status(404);
  }
};

export default handler;
