import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  login: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String,
  },
  name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
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
  challengesCompleted: {
    type: Number,
    required: true,
    default: 0
  },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);