import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
