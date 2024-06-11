import { Request, Response } from "express";
import Product, { IProduct } from "../Model/Product";
import { FilterStock } from "../util/FilterStock";
import Size from "../Model/Size";

const addProduct = async (req: Request, res: Response) => {
  const { netWeight, type, size } = req.body;
  const result = await Size.findOne({ size: size });
  if (!result) res.status(404).json({ message: "Size not found !" });
  else {
    const newProduct = new Product({
      netWeight: netWeight,
      type: type,
      size: result?._id,
    });
    newProduct.save();
    res.json({
      message: "Product added successfully",
      data: { id: newProduct._id },
    });
  }
};

const getStock = async (req: Request, res: Response) => {
  const result = await Product.find().populate("size");
  const seProducts = result.filter((item) => item.type === "SE");
  const dpcProducts = result.filter((item) => item.type === "DPC");
  const seFilteredProducts = FilterStock(seProducts);
  const dpcFilteredProducts = FilterStock(dpcProducts);
  res.json({
    message: "Stock found successfully",
    data: { seFilteredProducts, dpcFilteredProducts },
  });
};

const getSizes = async (req: Request, res: Response) => {
  const result = await Size.find();
  res.json({
    message: "Sizes found successfully",
    data: { result },
  });
};

const addSize = async (req: Request, res: Response) => {
  const { size } = req.body;
  const newSize = new Size({ size: size });
  newSize.save();
  res.json({
    message: "Size added successfully!",
    data: {},
  });
};

const deleteSize = async (req: Request, res: Response) => {
  const { size } = req.body;
  Size.findByIdAndDelete(size);
  res.json({ message: "Size deleted successfully", data: {} });
};

export { addProduct, getStock, getSizes, addSize, deleteSize };
