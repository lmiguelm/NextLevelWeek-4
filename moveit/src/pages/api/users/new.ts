import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../../config/connectionDatabase';
import { User } from '../../../models/User';

export default async function NewUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    connectToDatabase();
  } catch(e) {
    return res.status(500);
  }
  
  try {
    const {user} = req.body;

    const existUser = await User.findOne({ githubId: user.id });

    if(!existUser) {
      const currentUser = await User.create(user);
      return res.json(currentUser);
    } else {
      User.updateOne({ githubId: user.id }, user);
      const currentUser = await User.findOne({ githubId: user.id });
      return res.json(currentUser);
    }
    
  } catch (e) {
    return res.status(400);
  }
}