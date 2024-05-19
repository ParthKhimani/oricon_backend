import mongoose, { Document, Schema } from "mongoose";
import { ISize } from "./Size";

export interface IProduct extends Document {
  size: mongoose.Types.ObjectId | ISize;
  type: "DPC" | "SE";
  netWeight: string;
}

const productSchema = new Schema({
  size: { type: Schema.Types.ObjectId, ref: "Size" },
  type: { type: String, enum: ["DPC", "SE"] },
  netWeight: Number,
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
