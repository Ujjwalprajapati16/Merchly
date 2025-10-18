import mongoose from "mongoose";
import type { User } from "../types/User-types.ts";

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  }
}, {
  timestamps: true
});

export default mongoose.model<User>('User', userSchema);