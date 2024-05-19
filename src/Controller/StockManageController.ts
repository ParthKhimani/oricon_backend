import { Request, Response } from "express";
import Product, { IProduct } from "../Model/Product";
import { FilterStock } from "../util/FilterStock";
import Size from "../Model/Size";

export const addProduct = async (req: Request, res: Response) => {
  const { netWeight, type, size } = req.body;
  const result = await Size.findOne({ size: size });
  const newProduct = new Product({
    netWeight: netWeight,
    type: type,
    size: result?._id,
  });
  newProduct.save();
  res.json({ message: "Product added successfully" });
};

export const getStock = async (req: Request, res: Response) => {
  const result = await Product.find().populate("size");
  console.log(result);
  const seProducts = result.filter((item) => item.type === "SE");
  const dpcProducts = result.filter((item) => item.type === "DPC");
  const seFilteredProducts = FilterStock(seProducts);
  const dpcFilteredProducts = FilterStock(dpcProducts);
  res.json({
    message: "Stock found successfully",
    data: { seFilteredProducts, dpcFilteredProducts },
  });
};

export const getSizes = async (req: Request, res: Response) => {
  const result = await Size.find();
  res.json({
    message: "Sizes found successfully",
    data: { result },
  });
};

export const addSize = async (req: Request, res: Response) => {
  const { size } = req.body;
  const newSize = new Size({ size: size });
  newSize.save();
  res.json({
    message: "Size added successfully!",
    data: {},
  });
};
