import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  size: string;
  type: "DPC" | "SE";
  netWeight: string;
}

const productSchema: Schema = new Schema({
  size: Number,
  type: { type: String, enum: ["DPC", "SE"] },
  netWeight: Number,
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
