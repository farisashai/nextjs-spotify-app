// pages/api/auth/callback.ts

import axios from 'axios'
import querystring from 'querystring'
import { NextApiRequest, NextApiResponse } from 'next'

import createSpotifyApi from '../../../utils/spotify'

// We'll describe this function in the next section
import { setAuthCookie } from '../../../utils/cookies'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const sendRefreshRedirect = (res: NextApiResponse, path = '/') => {
  res.status(200)
  // Send a 200 response and refresh the page
  return res.send(
    `<html><head><meta http-equiv="refresh" content=1;url="${path}"></head></html>`,
  )
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

    // Send 200 response to set cookies and refresh the page
    return sendRefreshRedirect(res)
  } catch (error) {
    // You might want to log the error here
    res.status(500).json({
      statusCode: 500,
      message: 'Something went wrong',
    })
  }
}