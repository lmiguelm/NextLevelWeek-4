import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cookies from 'js-cookie';

export default async function Oauth(req: NextApiRequest, res: NextApiResponse) {

  const { query: { code } } = req;

  try {
    const { data: { access_token } } = await axios.post(`https://github.com/login/oauth/access_token`, {
      client_id: String(process.env.GITHUB_CLIENT_ID),
      client_secret: String(process.env.GITHUB_CLIENTE_SECRET),
      code: String(code),
    }, {
      headers: {
        Accept: 'application/json'
      }
    }); 

    return res.redirect(`${process.env.MOVEIT_BASE_URL}/login/github/auth?access_token=${access_token}`)

  } catch(e) {
    console.log(e);
    return res.redirect(`${process.env.MOVEIT_BASE_URL}/login`);
  }
}