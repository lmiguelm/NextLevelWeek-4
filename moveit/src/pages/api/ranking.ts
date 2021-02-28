import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../config/connectionDatabase';
import { Score } from '../../models/Score';

export default async function UpdateUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    connectToDatabase();
  } catch(e) {
    return res.status(500);
  }
  
  const scores = await Score.find().sort([[ 'totalExperience', -1 ]]).populate('user')
  return res.json(scores);
}
