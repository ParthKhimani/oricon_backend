import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";

export interface ILoosePacking extends Document {
  company: mongoose.Types.ObjectId;
  products: Array<mongoose.Types.ObjectId> | Array<IProduct>;
}

const loosePackingSchema = new Schema<ILoosePacking>(
  {
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: { createdAt: "created_at" } }
);

const LoosePacking = mongoose.model<ILoosePacking>(
  "LoosePacking",
  loosePackingSchema
);

export default LoosePacking;
