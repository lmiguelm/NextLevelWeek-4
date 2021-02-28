import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../config/connectionDatabase';
import { User } from '../../models/User';
import { Score } from '../../models/Score';


export default async function NewUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    connectToDatabase();
  } catch(e) {
    return res.status(500);
  }

  const { query: { token } } = req;

  const userGitHub = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`
    }
  });

  const user = await User.findOne({ githubId: userGitHub.data.id });

  if(user) {
    const score = await Score.findOne({ user: user._id });
    return res.json({user, score});
  } else {

    const userData = {
      githubId: userGitHub.data.id,
      login: userGitHub.data.login,
      avatar_url: userGitHub.data.avatar_url,
      email: userGitHub.data.email,
      name: userGitHub.data.name,
    }
    const user = await User.create(userData as any);

    const scoreData = {
      user: user._id,
      currentExperience: 0,
      challengesCompleted: 0,
      level: 1,
      totalExperience: 0,
    }

    const score = await Score.create(scoreData as any);

    return res.json({user, score});
  }
}

