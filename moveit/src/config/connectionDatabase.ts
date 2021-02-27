import mongoose from 'mongoose';

export async function connectToDatabase() {
  // verificando se já existe uma conexão
  if(mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  );
}