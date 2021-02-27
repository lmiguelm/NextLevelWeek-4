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

    const existUser = await User.findOne({ id: user.id });

    if(!existUser) {
      await User.create(user);
    } else {
      await User.updateOne({ id: user.id }, user);
    }

    return res.status(200);
    
  } catch (e) {
    return res.status(400);
  }
}