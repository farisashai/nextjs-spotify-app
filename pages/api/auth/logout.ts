// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";

// Pull the values defined in your .env file

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    "auth.session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
  res.redirect("/");
};

export default handler;
