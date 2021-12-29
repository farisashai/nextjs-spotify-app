// pages/api/auth/callback.ts

import axios from 'axios'
import querystring from 'querystring'
import { NextApiRequest, NextApiResponse } from 'next'

import createSpotifyApi from 'utils/spotify'
import { setAuthCookie } from 'utils/cookies'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const sendRefreshRedirect = (res: NextApiResponse, path = '/') => {
  return res.status(200).send(
    `<html><head><meta http-equiv="refresh" content=1;url="${path}"></head></html>`,
  )
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query

  try {
    const { data } = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }),
    )
    console.log(data)
    const spotify = createSpotifyApi(data.access_token)

    const profile = await spotify.getMe()

    const session = {
      user: profile,
      token: data,
    }

    // Send the session information to our user in the form of a cookie header.
    // We'll describe this function in the next step
    await setAuthCookie(res, session, {
      maxAge: data.expires_in * 1000,
    })
    return sendRefreshRedirect(res)
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Something went wrong',
    })
  }
}

export default handler
