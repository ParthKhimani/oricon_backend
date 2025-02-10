import { Request, Response } from "express";
import Bill from "../Model/Bills";
import { FilterStock } from "../util/FilterStock";
import Product, { IProduct } from "../Model/Product";
import Size from "../Model/Size";

const createBill = async (req: Request, res: Response): Promise<void> => {
  try {
    let { company, boxes } = req.body;
    if (!company) {
      throw new Error("Please select company");
    }
    if (!boxes || !Array.isArray(boxes) || boxes.length === 0) {
      throw new Error("Please add at least one product");
    }

    boxes = await Promise.all(
      boxes.map(async (box) => {
        const processedProducts = await Promise.all(
          box.products.map(async (product: IProduct | string) => {
            if (typeof product !== "string") {
              try {
                const result = await Size.findOne({
                  size: product.size as unknown as string,
                });
                if (!result) {
                  throw new Error(`Size ${product.size} not found`);
                }
                const newProduct = new Product({
                  netWeight: product.netWeight,
                  type: product.type,
                  size: result._id,
                });
                await newProduct.save();
                return newProduct._id;
              } catch (error) {
                res.status(500).json({
                  message: "Something went wrong with product creation",
                });
                return;
              }
            } else {
              return product;
            }
          })
        );
        return {
          cartoon: box.cartoon,
          products: processedProducts,
        };
      })
    );

    await Bill.create({ company, boxes });
    res.json({
      message: "Cartoon dispatch created successfully",
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

const updateBill = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let { company, boxes } = req.body;
    if (!company) {
      throw new Error("Please select company");
    }
    if (!boxes || !Array.isArray(boxes) || boxes.length === 0) {
      throw new Error("Please add at least one product");
    }
    boxes = await Promise.all(
      boxes.map(async (box) => {
        const processedProducts = await Promise.all(
          box.products.map(async (product: IProduct | string) => {
            if (typeof product !== "string") {
              try {
                const result = await Size.findOne({
                  size: product.size as unknown as string,
                });
                if (!result) {
                  throw new Error(`Size ${product.size} not found`);
                }
                const newProduct = new Product({
                  netWeight: product.netWeight,
                  type: product.type,
                  size: result._id,
                });
                await newProduct.save();
                return newProduct._id;
              } catch (error) {
                res.status(500).json({
                  message: "Something went wrong with product creation",
                });
                return;
              }
            } else {
              return product;
            }
          })
        );
        return {
          cartoon: box.cartoon,
          products: processedProducts,
        };
      })
    );
    await Bill.findByIdAndUpdate(id, { company, boxes });
    res.json({
      message: "Cartoon dispatch updated successfully",
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

const getBills = async (req: Request, res: Response) => {
  try {
    const result = await Bill.find()
      .populate("company")
      .sort({ created_at: -1 });

    res.json({
      message: "Cartoon dispatches found successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteBill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Bill.findByIdAndDelete(id);
    res.status(200).json({
      message: "Cartoon dispatch deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getBill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Bill.findById(id).populate([
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
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getQuantityDescriptionBill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Bill.findById(id).populate([
      "company",
      {
        path: "boxes.products",
        populate: { path: "size", model: "Size" },
      },
    ]);
    const updatedProducts = result
      ? FilterStock(
          result.boxes.flatMap((box) => box.products as Array<IProduct>)
        )
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
  createBill,
  updateBill,
  getBills,
  deleteBill,
  getBill,
  getQuantityDescriptionBill,
};
