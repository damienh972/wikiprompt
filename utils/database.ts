import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  } else {
    try {
      console.log(process.env.MONGODB_URI);
      await mongoose.connect(process.env.MONGODB_URI as string, {
        dbName: 'wikiprompt',
      });

      isConnected = true;
      console.log('MongoDB connected');
    } catch (error) {
      console.log('Error connecting to MongoDB', error);
      return;
    }
  }
};
