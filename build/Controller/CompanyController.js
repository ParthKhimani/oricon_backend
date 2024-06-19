"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackingSleep = exports.getCompanies = exports.createCompany = void 0;
const Company_1 = __importDefault(require("../Model/Company"));
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const newCompany = new Company_1.default({ name: name });
    yield newCompany.save();
    res.status(200).json({ message: "Company created successfully !" });
});
exports.createCompany = createCompany;
const getCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Company_1.default.find();
    res
        .status(200)
        .json({ message: "Companies found successfully !", data: result });
});
exports.getCompanies = getCompanies;
const getPackingSleep = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getPackingSleep = getPackingSleep;
