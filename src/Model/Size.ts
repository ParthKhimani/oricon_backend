import mongoose, { Document, Schema } from "mongoose";

export interface ISize extends Document {
  size: string;
}

const sizeSchema: Schema = new Schema({
  size: String,
});

const Size = mongoose.model<ISize>("Size", sizeSchema);

export default Size;
