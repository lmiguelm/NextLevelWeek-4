import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  githubId: {
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
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);