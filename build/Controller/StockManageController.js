"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSize = exports.addSize = exports.getSizes = exports.deleteStock = exports.getLastProduct = exports.getDailyStock = exports.getLatestStock = exports.getStock = exports.getProduct = exports.addProduct = void 0;
const Product_1 = __importDefault(require("../Model/Product"));
const FilterStock_1 = require("../util/FilterStock");
const Size_1 = __importDefault(require("../Model/Size"));
const pusher_1 = __importDefault(require("pusher"));
const addProduct = async (req, res) => {
    const { netWeight, type, size } = req.body;
    const result = await Size_1.default.findOne({ size: size });
    if (!result)
        res.status(404).json({ message: "Size not found !" });
    else {
        const newProduct = new Product_1.default({
            netWeight: netWeight,
            type: type,
            size: result?._id,
        });
        newProduct.save();
        res.json({
            message: "Product added successfully",
            data: { id: newProduct._id },
        });
        const pusher = new pusher_1.default({
            appId: process.env.APP_ID || "",
            key: process.env.PUSHER_KEY || "",
            secret: process.env.PUSHER_SECRET || "",
            cluster: process.env.CLUSTER || "",
            useTLS: Boolean(process.env.USE_TLS) || true,
        });
        pusher.trigger("my-channel", "data-update", {
            message: "hello world",
        });
    }
};
exports.addProduct = addProduct;
const getProduct = async (req, res) => {
    const { id } = req.params;
    const result = await Product_1.default.findById(id).populate("size");
    if (!result)
        res.json({ message: "Product not found !" });
    else {
        res.json({
            message: "Product found successfully",
            data: result,
        });
    }
};
exports.getProduct = getProduct;
const getStock = async (req, res) => {
    const result = await Product_1.default.find().populate("size");
    const seProducts = result.filter((item) => item.type === "SE");
    const dpcProducts = result.filter((item) => item.type === "DPC");
    const seFilteredProducts = (0, FilterStock_1.FilterStock)(seProducts);
    const dpcFilteredProducts = (0, FilterStock_1.FilterStock)(dpcProducts);
    res.json({
        message: "Stock found successfully",
        data: { seFilteredProducts, dpcFilteredProducts },
    });
};
exports.getStock = getStock;
const getLatestStock = async (req, res) => {
    const result = await Product_1.default.find().populate("size");
    const seProducts = result.filter((item) => item.type === "SE");
    const dpcProducts = result.filter((item) => item.type === "DPC");
    const seFilteredProducts = (0, FilterStock_1.LatestStock)(seProducts);
    const dpcFilteredProducts = (0, FilterStock_1.LatestStock)(dpcProducts);
    res.json({
        message: "Stock found successfully",
        data: { seFilteredProducts, dpcFilteredProducts },
    });
};
exports.getLatestStock = getLatestStock;
const getDailyStock = async (req, res) => {
    const result = await Product_1.default.find().populate("size");
    const seProducts = result.filter((item) => item.type === "SE");
    const dpcProducts = result.filter((item) => item.type === "DPC");
    const seFilteredProducts = (0, FilterStock_1.FilterStock)((0, FilterStock_1.LatestStock)(seProducts));
    const dpcFilteredProducts = (0, FilterStock_1.FilterStock)((0, FilterStock_1.LatestStock)(dpcProducts));
    res.json({
        message: "Stock found successfully",
        data: { seFilteredProducts, dpcFilteredProducts },
    });
};
exports.getDailyStock = getDailyStock;
const getLastProduct = async (req, res) => {
    const result = await Product_1.default.find().populate("size");
    res.json({
        message: "Product found successfully",
        data: result.pop(),
    });
};
exports.getLastProduct = getLastProduct;
const deleteStock = async (req, res) => {
    const { id } = req.params;
    await Product_1.default.findByIdAndDelete(id);
    res.json({
        message: "Stock deleted successfully",
        data: {},
    });
};
exports.deleteStock = deleteStock;
const getSizes = async (req, res) => {
    const result = await Size_1.default.find();
    res.json({
        message: "Sizes found successfully",
        data: { result },
    });
};
exports.getSizes = getSizes;
const addSize = async (req, res) => {
    const { size } = req.body;
    const newSize = new Size_1.default({ size: size });
    newSize.save();
    res.json({
        message: "Size added successfully!",
        data: {},
    });
};
exports.addSize = addSize;
const deleteSize = async (req, res) => {
    const { id } = req.params;
    await Size_1.default.findByIdAndDelete(id);
    res.json({ message: "Size deleted successfully", data: {} });
};
exports.deleteSize = deleteSize;
