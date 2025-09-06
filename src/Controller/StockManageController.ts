import { Request, Response } from "express";
import Product from "../Model/Product";
import { FilterStock, LatestStock } from "../util/FilterStock";
import Size from "../Model/Size";
import Pusher from "pusher";

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
    const pusher = new Pusher({
      appId: process.env.APP_ID || "",
      key: process.env.PUSHER_KEY || "",
      secret: process.env.PUSHER_SECRET || "",
      cluster: process.env.CLUSTER || "",
      useTLS: Boolean(process.env.USE_TLS) || true,
    });

    if (type !== "DPC")
      await pusher.trigger("my-channel", "data-update", {
        message: "hello world",
      });
    res.json({
      message: "Product added successfully",
      data: { id: newProduct._id },
    });
  }
};

const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Product.findById(id).populate("size");
  if (!result) res.json({ message: "Product not found !" });
  else {
    res.json({
      message: "Product found successfully",
      data: result,
    });
  }
};

const getStock = async (req: Request, res: Response) => {
  const [seProducts, dpcProducts] = await Promise.all([
    Product.find({ type: "SE" }).populate("size").lean(),
    Product.find({ type: "DPC" }).populate("size").lean(),
  ]);
  const seFilteredProducts = FilterStock(seProducts);
  const dpcFilteredProducts = FilterStock(dpcProducts);
  res.json({
    message: "Stock found successfully",
    data: { seFilteredProducts, dpcFilteredProducts },
  });
  // const result = await Product.find().populate("size");
  // const seProducts = result.filter((item) => item.type === "SE");
  // const dpcProducts = result.filter((item) => item.type === "DPC");
  // const seFilteredProducts = FilterStock(seProducts);
  // const dpcFilteredProducts = FilterStock(dpcProducts);
  // res.json({
  //   message: "Stock found successfully",
  //   data: { seFilteredProducts, dpcFilteredProducts },
  // });
};

const getLatestStock = async (req: Request, res: Response) => {
  try {
    const [seProducts, dpcProducts] = await Promise.all([
      Product.aggregate([
        { $match: { type: "SE" } },
        { $sort: { createdAt: -1 } },
        // { $group: { _id: "$sku", doc: { $first: "$$ROOT" } } }, // keep only latest per SKU
        // { $replaceRoot: { newRoot: "$doc" } },
        {
          $lookup: {
            from: "sizes", // collection name for Size
            localField: "size",
            foreignField: "_id",
            as: "size",
          },
        },
        { $unwind: "$size" },
      ]),
      Product.aggregate([
        { $match: { type: "DPC" } },
        { $sort: { createdAt: -1 } },
        // { $group: { _id: "$sku", doc: { $first: "$$ROOT" } } },
        // { $replaceRoot: { newRoot: "$doc" } },
        {
          $lookup: {
            from: "sizes",
            localField: "size",
            foreignField: "_id",
            as: "size",
          },
        },
        { $unwind: "$size" },
      ]),
    ]);

    // console.log(seProducts);
    // console.log(dpcProducts);

    const seFilteredProducts = LatestStock(seProducts);
    const dpcFilteredProducts = LatestStock(dpcProducts);

    res.json({
      message: "Stock found successfully",
      data: { seFilteredProducts, dpcFilteredProducts },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stock", error });
  }
};

// const getLatestStock = async (req: Request, res: Response) => {
//   const [seProducts, dpcProducts] = await Promise.all([
//     Product.find({ type: "SE" }).populate("size").lean(),
//     Product.find({ type: "DPC" }).populate("size").lean(),
//   ]);
//   const seFilteredProducts = LatestStock(seProducts);
//   const dpcFilteredProducts = LatestStock(dpcProducts);
//   res.json({
//     message: "Stock found successfully",
//     data: { seFilteredProducts, dpcFilteredProducts },
//   });
//   // const result = await Product.find().populate("size");
//   // const seProducts = result.filter((item) => item.type === "SE");
//   // const dpcProducts = result.filter((item) => item.type === "DPC");
//   // const seFilteredProducts = LatestStock(seProducts);
//   // const dpcFilteredProducts = LatestStock(dpcProducts);
//   // res.json({
//   //   message: "Stock found successfully",
//   //   data: { seFilteredProducts, dpcFilteredProducts },
//   // });
// };

const getDailyStock = async (req: Request, res: Response) => {
  const result = await Product.find().populate("size");
  const seProducts = result.filter((item) => item.type === "SE");
  const dpcProducts = result.filter((item) => item.type === "DPC");
  const seFilteredProducts = FilterStock(LatestStock(seProducts));
  const dpcFilteredProducts = FilterStock(LatestStock(dpcProducts));
  res.json({
    message: "Stock found successfully",
    data: { seFilteredProducts, dpcFilteredProducts },
  });
};

const getLastProduct = async (req: Request, res: Response) => {
  try {
    const lastProduct = await Product.findOne({ type: "SE" })
      .populate("size")
      .sort({ created_at: -1 }); // assumes you have timestamps enabled

    // if (!lastProduct) {
    //   return res.status(404).json({ message: "No product found" });
    // }

    res.json({
      message: "Product found successfully",
      data: lastProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// const getLastProduct = async (req: Request, res: Response) => {
//   const result = await Product.find().populate("size");
//   res.json({
//     message: "Product found successfully",
//     data: result.pop(),
//   });
// };

const deleteStock = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({
    message: "Stock deleted successfully",
    data: {},
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
  const { id } = req.params;
  await Size.findByIdAndDelete(id);
  res.json({ message: "Size deleted successfully", data: {} });
};

export {
  addProduct,
  getProduct,
  getStock,
  getLatestStock,
  getDailyStock,
  getLastProduct,
  deleteStock,
  getSizes,
  addSize,
  deleteSize,
};
