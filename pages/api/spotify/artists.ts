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
    let items = [];

    await axios
      .get(
        `${API_URL}/v1/me/top/artists?offset=0&limit=50&time_range=${range}`,
        setAuthHeaders(session)
      )
      .then((response) => items.push(...response.data.items));

    await axios
      .get(
        `${API_URL}/v1/me/top/artists?offset=49&limit=50`,
        setAuthHeaders(session)
      )
      .then((response) => items.push(...response.data.items));

    res.status(200).json(items);
  } catch {
    return res.status(404);
  }
};

export default handler;
