import mongoose, { Document, Schema } from 'mongoose';

// 1. Define TypeScript interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// 2. Define schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 3. Export model
export default mongoose.model<IUser>('User', userSchema);
