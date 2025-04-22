"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackingSleep = exports.getCompanies = exports.deleteCompany = exports.updateComapny = exports.createCompany = void 0;
const Company_1 = __importDefault(require("../Model/Company"));
const createCompany = async (req, res) => {
    const { name } = req.body;
    const newCompany = new Company_1.default({ name: name });
    await newCompany.save();
    res.status(200).json({ message: "Company created successfully !" });
};
exports.createCompany = createCompany;
const updateComapny = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    await Company_1.default.findByIdAndUpdate(id, { name });
    res.status(200).json({ message: "Company updated successfully !" });
};
exports.updateComapny = updateComapny;
const deleteCompany = async (req, res) => {
    const { id } = req.params;
    await Company_1.default.findByIdAndDelete(id);
    res.status(200).json({ message: "Company deleted successfully !" });
};
exports.deleteCompany = deleteCompany;
const getCompanies = async (req, res) => {
    const result = await Company_1.default.find();
    res
        .status(200)
        .json({ message: "Companies found successfully !", data: result });
};
exports.getCompanies = getCompanies;
const getPackingSleep = async (req, res) => { };
exports.getPackingSleep = getPackingSleep;
