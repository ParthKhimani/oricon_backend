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
exports.getStock = exports.addProduct = void 0;
const Product_1 = __importDefault(require("../Model/Product"));
const addProduct = (req, res) => {
    const { netWeight, type, size } = req.body;
    const newProduct = new Product_1.default({
        netWeight: netWeight,
        type: type,
        size: size,
    });
    newProduct.save();
    res.json({ message: "Product added successfully" });
};
exports.addProduct = addProduct;
const getStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_1.default.find();
    const productsToSend = [];
    console.log("FROM HERE", result);
    res.json({ message: "Stock found successfully", data: result });
});
exports.getStock = getStock;
