import { NextApiRequest, NextApiResponse } from 'next';
import query from '../../../config/database';
import jwt from 'next-auth/jwt';

export default async function Update(req: NextApiRequest, res: NextApiResponse) {
  const { 
    level,
    currentExperience,
    challengesCompleted,
    totalExperience,
  } = req.body;

  const id = req.query.id;

  try {
    await query({
      query: 'UPDATE users SET level=?, current_experience=?, total_experience=?, challenges_completed=? WHERE id=?',
      values: [ level, currentExperience, totalExperience, challengesCompleted, id ]
    });
  } catch (e) {
    console.log(e);
  } finally {
    return res.status(200);
  }
}