import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../../../config/connectionDatabase';
import { User } from '../../../../models/User';

export default async function UpdateUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    connectToDatabase();
  } catch(e) {
    return res.status(500);
  }

  try {
    const { query: { id } } = req;
    const data = req.body;

    await User.updateOne({ id }, data);

    return res.status(200);

  } catch(e) {
    console.log(e);
    return res.status(400);
  }
}
