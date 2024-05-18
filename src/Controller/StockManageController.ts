import { Request, Response } from "express";
import Product, { IProduct } from "../Model/Product";
import { FilterStock } from "../util/FilterStock";

export const addProduct = (req: Request, res: Response) => {
  const { netWeight, type, size } = req.body;
  const newProduct = new Product({
    netWeight: netWeight,
    type: type,
    size: size,
  });
  newProduct.save();
  res.json({ message: "Product added successfully" });
};

export const getStock = async (req: Request, res: Response) => {
  const result = await Product.find();
  const seProducts = result.filter((item) => item.type === "SE");
  const dpcProducts = result.filter((item) => item.type === "DPC");
  const seFilteredProducts = FilterStock(seProducts);
  const dpcFilteredProducts = FilterStock(dpcProducts);
  res.json({
    message: "Stock found successfully",
    data: { seFilteredProducts, dpcFilteredProducts },
  });
};
