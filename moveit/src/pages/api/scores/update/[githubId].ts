import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../../../config/connectionDatabase';
import { Score } from '../../../../models/Score';
import { User } from '../../../../models/User';

export default async function UpdateUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    connectToDatabase();
  } catch(e) {
    return res.status(500);
  }

  try {
    const { query: { githubId } } = req;
    const data = req.body;

    console.log('update', data);
    console.log('githubId', githubId);
    
    const user = await User.findOne({ githubId });
    
    await Score.updateOne({ user: { _id: user.id } }, data);

    return res.status(200);

  } catch(e) {
    console.log(e);
    return res.status(400);
  }
}
