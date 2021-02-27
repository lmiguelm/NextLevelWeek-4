import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface UserData {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
}

export default async function Oauth(req: NextApiRequest, res: NextApiResponse) {

  const { code } = req.body;

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

    const { data } = await axios.get<UserData>('https://api.github.com/user', {
      headers: {
        Accept: 'application/json',
        Authorization: `token ${access_token}`
      }
    });

    const user: UserData = {
      id: data.id,
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      email: data.email
    }
    
    return res.json({ user, token: access_token });

  } catch(e) {
    console.log(e);
    return res.redirect(`${process.env.MOVEIT_BASE_URL}/login`);
  }
}