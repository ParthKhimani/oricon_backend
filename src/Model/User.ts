import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: String,
  password: String,
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
