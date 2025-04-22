"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuantityDescription = exports.getLoosePacking = exports.deleteLoosePacking = exports.getLoosePackingBills = exports.updateLoosePacking = exports.createLoosePacking = void 0;
const LoosePacking_1 = __importDefault(require("../Model/LoosePacking"));
const FilterStock_1 = require("../util/FilterStock");
const Product_1 = __importDefault(require("../Model/Product"));
const Size_1 = __importDefault(require("../Model/Size"));
const createLoosePacking = async (req, res) => {
    try {
        let { company, products } = req.body;
        if (!company) {
            throw new Error("Please select company");
        }
        if (!products || !Array.isArray(products) || products.length === 0) {
            throw new Error("Please add at least one product");
        }
        products = await Promise.all(products.map(async (product) => {
            if (typeof product !== "string") {
                try {
                    const result = await Size_1.default.findOne({ size: product.size });
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
                    res
                        .status(500)
                        .json({ message: "Something went wrong with product creation" });
                    return;
                }
            }
            else {
                return product;
            }
        }));
        await LoosePacking_1.default.create({ company, products });
        res.json({
            message: "Loose packing created successfully",
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
exports.createLoosePacking = createLoosePacking;
const updateLoosePacking = async (req, res) => {
    try {
        let { id } = req.params;
        let { company, products } = req.body;
        if (!company) {
            throw new Error("Please select company");
        }
        if (!products || !Array.isArray(products) || products.length === 0) {
            throw new Error("Please add at least one product");
        }
        products = await Promise.all(products.map(async (product) => {
            if (typeof product !== "string") {
                try {
                    const result = await Size_1.default.findOne({ size: product.size });
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
                    res
                        .status(500)
                        .json({ message: "Something went wrong with product creation" });
                    return;
                }
            }
            else {
                return product;
            }
        }));
        await LoosePacking_1.default.findByIdAndUpdate(id, { company, products });
        res.json({
            message: "Loose packing updated successfully",
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
exports.updateLoosePacking = updateLoosePacking;
const getLoosePackingBills = async (req, res) => {
    try {
        const result = await LoosePacking_1.default.find()
            .populate("company")
            .sort({ created_at: -1 });
        res.json({
            message: "Loose packings found successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getLoosePackingBills = getLoosePackingBills;
const deleteLoosePacking = async (req, res) => {
    try {
        const { id } = req.params;
        await LoosePacking_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: "Loose packing deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.deleteLoosePacking = deleteLoosePacking;
const getLoosePacking = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await LoosePacking_1.default.findById(id).populate([
            "company",
            {
                path: "products",
                populate: { path: "size", model: "Size" },
            },
        ]);
        res.status(200).json({
            message: "Loose packing found successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getLoosePacking = getLoosePacking;
const getQuantityDescription = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await LoosePacking_1.default.findById(id).populate([
            "company",
            {
                path: "products",
                populate: { path: "size", model: "Size" },
            },
        ]);
        const updatedProducts = result
            ? (0, FilterStock_1.FilterStock)(result.products)
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
exports.getQuantityDescription = getQuantityDescription;
