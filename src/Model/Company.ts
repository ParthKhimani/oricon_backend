import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";

export interface ICompany extends Document {
  name: string;
  product: mongoose.Types.ObjectId[] | IProduct[];
}

const companySchema = new Schema({
  name: String,
  product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Company = mongoose.model<IProduct>("Product", companySchema);

export default Company;
