import mongoose from 'mongoose';
import { User } from './User';

const ScoreSchema = new mongoose.Schema({
  level: {
    type: Number,
    requireD: true,
    default: 1
  },
  currentExperience: {
    type: Number,
    required: true,
    default: 0
  },
  totalExperience: {
    type: Number,
    required: true,
    default: 0
  },
  challengesCompleted: {
    type: Number,
    required: true,
    default: 0
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: User,
  }
});

export const Score = mongoose.models.Score || mongoose.model('Score', ScoreSchema);