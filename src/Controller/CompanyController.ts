import { Request, Response } from "express";
import Company from "../Model/Company";

const createCompany = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newCompany = new Company({ name: name });
  await newCompany.save();
  res.status(200).json({ message: "Company created successfully !" });
};

const getCompanies = async (req: Request, res: Response) => {
  const result = await Company.find();
  res
    .status(200)
    .json({ message: "Companies found successfully !", data: result });
};

const getPackingSleep = async (req: Request, res: Response) => {};

export { createCompany, getCompanies, getPackingSleep };
