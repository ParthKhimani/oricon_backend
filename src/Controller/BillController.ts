import { Request, Response } from "express";
import LoosePacking from "../Model/LoosePacking";

const createLoosePacking = async (req: Request, res: Response) => {
  try {
    const { company, products } = req.body;
    await LoosePacking.create({ company, products });
    res.json({
      message: "Loose packing created successfully",
    });
  } catch (error) {
    res.json({ message: "Error in Loose Packing creation" });
  }
};

export { createLoosePacking };
