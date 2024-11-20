import { Request, Response } from "express";
import LoosePacking from "../Model/LoosePacking";
import { FilterStock } from "../util/FilterStock";
import { IProduct } from "../Model/Product";

const createLoosePacking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { company, products } = req.body;
    if (!company) {
      throw new Error("Please select company");
    }
    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new Error("Please add at least one product");
    }
    await LoosePacking.create({ company, products });
    res.json({
      message: "Loose packing created successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

const getLoosePackingBills = async (req: Request, res: Response) => {
  try {
    const result = await LoosePacking.find().populate("company");
    res.json({
      message: "Loose packings found successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteLoosePacking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await LoosePacking.findByIdAndDelete(id);
    res.status(200).json({
      message: "Loose packing deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getLoosePacking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await LoosePacking.findById(id).populate([
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
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getQuantityDescription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await LoosePacking.findById(id).populate([
      "company",
      {
        path: "products",
        populate: { path: "size", model: "Size" },
      },
    ]);

    const updatedProducts = result
      ? FilterStock(result.products as Array<IProduct>)
      : [];

    const updatedResponse = {
      ...result?.toObject(),
      products: updatedProducts,
    };

    res.status(200).json({
      message: "Quantity Description found successfully",
      data: updatedResponse,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export {
  createLoosePacking,
  getLoosePackingBills,
  deleteLoosePacking,
  getLoosePacking,
  getQuantityDescription,
};
