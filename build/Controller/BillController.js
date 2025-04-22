"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuantityDescriptionBill = exports.getBill = exports.deleteBill = exports.getBills = exports.updateBill = exports.createBill = void 0;
const Bills_1 = __importDefault(require("../Model/Bills"));
const FilterStock_1 = require("../util/FilterStock");
const Product_1 = __importDefault(require("../Model/Product"));
const Size_1 = __importDefault(require("../Model/Size"));
const createBill = async (req, res) => {
    try {
        let { company, boxes } = req.body;
        if (!company) {
            throw new Error("Please select company");
        }
        if (!boxes || !Array.isArray(boxes) || boxes.length === 0) {
            throw new Error("Please add at least one product");
        }
        boxes = await Promise.all(boxes.map(async (box) => {
            const processedProducts = await Promise.all(box.products.map(async (product) => {
                if (typeof product !== "string") {
                    try {
                        const result = await Size_1.default.findOne({
                            size: product.size,
                        });
                        if (!result) {
                            throw new Error(`Size ${product.size} not found`);
                        }
                        const newProduct = new Product_1.default({
                            netWeight: product.netWeight,
                            type: product.type,
                            size: result._id,
                        });
                        await newProduct.save();
                        return newProduct._id;
                    }
                    catch (error) {
                        res.status(500).json({
                            message: "Something went wrong with product creation",
                        });
                        return;
                    }
                }
                else {
                    return product;
                }
            }));
            return {
                cartoon: box.cartoon,
                products: processedProducts,
            };
        }));
        await Bills_1.default.create({ company, boxes });
        res.json({
            message: "Cartoon dispatch created successfully",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
};
exports.createBill = createBill;
const updateBill = async (req, res) => {
    try {
        let { id } = req.params;
        let { company, boxes } = req.body;
        if (!company) {
            throw new Error("Please select company");
        }
        if (!boxes || !Array.isArray(boxes) || boxes.length === 0) {
            throw new Error("Please add at least one product");
        }
        boxes = await Promise.all(boxes.map(async (box) => {
            const processedProducts = await Promise.all(box.products.map(async (product) => {
                if (typeof product !== "string") {
                    try {
                        const result = await Size_1.default.findOne({
                            size: product.size,
                        });
                        if (!result) {
                            throw new Error(`Size ${product.size} not found`);
                        }
                        const newProduct = new Product_1.default({
                            netWeight: product.netWeight,
                            type: product.type,
                            size: result._id,
                        });
                        await newProduct.save();
                        return newProduct._id;
                    }
                    catch (error) {
                        res.status(500).json({
                            message: "Something went wrong with product creation",
                        });
                        return;
                    }
                }
                else {
                    return product;
                }
            }));
            return {
                cartoon: box.cartoon,
                products: processedProducts,
            };
        }));
        await Bills_1.default.findByIdAndUpdate(id, { company, boxes });
        res.json({
            message: "Cartoon dispatch updated successfully",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
};
exports.updateBill = updateBill;
const getBills = async (req, res) => {
    try {
        const result = await Bills_1.default.find()
            .populate("company")
            .sort({ created_at: -1 });
        res.json({
            message: "Cartoon dispatches found successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getBills = getBills;
const deleteBill = async (req, res) => {
    try {
        const { id } = req.params;
        await Bills_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: "Cartoon dispatch deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.deleteBill = deleteBill;
const getBill = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Bills_1.default.findById(id).populate([
            "company",
            {
                path: "boxes.products",
                populate: { path: "size", model: "Size" },
            },
        ]);
        res.status(200).json({
            message: "Cartoon dispatch found successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getBill = getBill;
const getQuantityDescriptionBill = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Bills_1.default.findById(id).populate([
            "company",
            {
                path: "boxes.products",
                populate: { path: "size", model: "Size" },
            },
        ]);
        const updatedProducts = result
            ? (0, FilterStock_1.FilterStock)(result.boxes.flatMap((box) => box.products))
            : [];
        const updatedResponse = {
            ...result?.toObject(),
            products: updatedProducts,
        };
        res.status(200).json({
            message: "Quantity Description found successfully",
            data: updatedResponse,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getQuantityDescriptionBill = getQuantityDescriptionBill;
