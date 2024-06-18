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
exports.deleteSize = exports.addSize = exports.getSizes = exports.getStock = exports.addProduct = void 0;
const Product_1 = __importDefault(require("../Model/Product"));
const FilterStock_1 = require("../util/FilterStock");
const Size_1 = __importDefault(require("../Model/Size"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { netWeight, type, size } = req.body;
    const result = yield Size_1.default.findOne({ size: size });
    if (!result)
        res.status(404).json({ message: "Size not found !" });
    else {
        const newProduct = new Product_1.default({
            netWeight: netWeight,
            type: type,
            size: result === null || result === void 0 ? void 0 : result._id,
        });
        newProduct.save();
        res.json({
            message: "Product added successfully",
            data: { id: newProduct._id },
        });
    }
});
exports.addProduct = addProduct;
const getStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_1.default.find().populate("size");
    const seProducts = result.filter((item) => item.type === "SE");
    const dpcProducts = result.filter((item) => item.type === "DPC");
    const seFilteredProducts = (0, FilterStock_1.FilterStock)(seProducts);
    const dpcFilteredProducts = (0, FilterStock_1.FilterStock)(dpcProducts);
    res.json({
        message: "Stock found successfully",
        data: { seFilteredProducts, dpcFilteredProducts },
    });
});
exports.getStock = getStock;
const getSizes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Size_1.default.find();
    res.json({
        message: "Sizes found successfully",
        data: { result },
    });
});
exports.getSizes = getSizes;
const addSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { size } = req.body;
    const newSize = new Size_1.default({ size: size });
    newSize.save();
    res.json({
        message: "Size added successfully!",
        data: {},
    });
});
exports.addSize = addSize;
const deleteSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { size } = req.body;
    Size_1.default.findByIdAndDelete(size);
    res.json({ message: "Size deleted successfully", data: {} });
});
exports.deleteSize = deleteSize;
