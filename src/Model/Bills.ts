import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";

export interface IBill extends Document {
  company: mongoose.Types.ObjectId;
  boxes: [
    {
      cartoon: number;
      products: Array<mongoose.Types.ObjectId> | Array<IProduct>;
    }
  ];
}

const billSchema = new Schema<IBill>(
  {
    company: Schema.Types.ObjectId,
    boxes: [
      {
        cartoon: Number,
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

const Bill = mongoose.model<IBill>("Bill", billSchema);

export default Bill;
