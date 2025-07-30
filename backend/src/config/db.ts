import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('📊 MongoDB URI:', process.env.MONGO_URI ? 'Configured' : 'Not configured');
    
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection state: ${conn.connection.readyState}`);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    console.error('🔍 Connection details:', {
      uri: process.env.MONGO_URI ? 'Present' : 'Missing',
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT
    });
    process.exit(1);
  }
};

export default connectDB;
