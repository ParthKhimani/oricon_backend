import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";

export interface ILoosePacking extends Document {
  company: mongoose.Types.ObjectId;
  products: Array<mongoose.Types.ObjectId> | Array<IProduct>;
}

const loosePackingSchema = new Schema<ILoosePacking>({
  company: Schema.Types.ObjectId,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const LoosePacking = mongoose.model<ILoosePacking>(
  "LoosePacking",
  loosePackingSchema
);

export default LoosePacking;
