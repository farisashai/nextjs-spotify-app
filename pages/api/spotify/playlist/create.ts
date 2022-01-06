// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { getSessionCookie } from "utils/cookies";
import { createSpotifyApi } from "utils/spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const session = await getSessionCookie(cookies);

    const {
      title = "Top Tracks",
      description = "",
      ispublic = false,
      collaborative = false,
      tracks = [],
    } = req.body;

    const spotifyApi = createSpotifyApi(session.token.access_token);

    const response = await spotifyApi.createPlaylist(title, {
      description,
      collaborative,
      public: ispublic,
    });

    await spotifyApi.addTracksToPlaylist(response.body.id, tracks);

    res.status(200).end();
  } catch {
    return res.status(404);
  }
};

export default handler;
