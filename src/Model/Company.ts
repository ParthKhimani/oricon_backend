import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";

export interface ICompany extends Document {
  name: string;
  boxes: [
    {
      cartoon: number;
      products: Array<mongoose.Types.ObjectId> | Array<IProduct>;
    }
  ];
}

const companySchema = new Schema({
  name: String,
  boxes: [
    {
      cartoon: Number,
      products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
  ],
});

const Company = mongoose.model<ICompany>("Company", companySchema);

export default Company;
