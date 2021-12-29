// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next'

// These are the application scopes you will be request from each user logging in
const scopes = [
  'streaming',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
]

// Pull the values defined in your .env file
const { CLIENT_ID, REDIRECT_URI } = process.env

const buildURL = (scopes: string[], callback: string) => {
  return (
    'https://accounts.spotify.com/authorize?'
    + 'response_type=code'
    + `&client_id=${CLIENT_ID}`
    + `&scope=${encodeURIComponent(scopes.join(' '))}`
    + `&redirect_uri=${encodeURIComponent(callback)}`
    // + `&show_dialog=${encodeURIComponent(true)}`
  )
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.redirect(buildURL(scopes, REDIRECT_URI))
}

export default handler