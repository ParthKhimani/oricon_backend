import mongoose, { Document, Schema } from "mongoose";
import { IBill } from "./Bills";

export interface ICompany extends Document {
  name: string;
  // bills: Array<mongoose.Types.ObjectId> | Array<IBill>;
}

const companySchema = new Schema({
  name: String,
  // bills: [{ type: Schema.Types.ObjectId, ref: "Bill" }],
});

const Company = mongoose.model<ICompany>("Company", companySchema);

export default Company;
