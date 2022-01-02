// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { getSessionCookie } from "utils/cookies";
import axios from "axios";
import { API_URL } from "utils/constants";
import { setAuthHeaders } from "utils/spotify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { range = "medium_term" },
    } = req;

    const cookies = cookie.parse(req.headers.cookie || "");
    const session = await getSessionCookie(cookies);
    let tracks = [];

    await axios
      .get(
        `${API_URL}/v1/me/top/tracks?offset=0&limit=50&time_range=${range}`,
        setAuthHeaders(session)
      )
      .then((response) => tracks.push(...response.data.items));

    await axios
      .get(
        `${API_URL}/v1/me/top/tracks?offset=49&limit=50`,
        setAuthHeaders(session)
      )
      .then((response) => tracks.push(...response.data.items));

    const albums = tracks.map((track) => track.album);

    let unique = [];

    albums.forEach((album) => {
      if (unique.findIndex((value) => value.uri === album.uri) === -1)
        unique.push(album);
    });

    unique = unique.filter((album) => album.album_type !== "SINGLE");

    res.status(200).json(unique);
  } catch {
    return res.status(404);
  }
};

export default handler;
