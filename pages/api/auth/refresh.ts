import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring'
import axios from 'axios';

const { CLIENT_ID, CLIENT_SECRET } = process.env

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

const getAccessToken = async (refresh_token) => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token
      })
    });
  
    return response.json();
  };


  const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { refresh_token } = req.body;

    //  await axios.post(TOKEN_ENDPOINT, 
    //     querystring.stringify({
    //     grant_type: 'refresh_token',
    //     refresh_token
    //   }),
    //   {
    //       headers: {
    //         Authorization: `Basic ${basic}`,
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //       }
    //   })
    // //   .then((e => e.json()))
    //   .then(e => res.status(200).json(e))
    //   .catch(err => res.status(404).send(err))
    
    return res.status(200).json(getAccessToken(refresh_token))
  }
  
  export default handler