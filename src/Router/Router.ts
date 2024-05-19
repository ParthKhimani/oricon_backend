import expressAsyncHandler from "express-async-handler";
import express from "express";
import {
  addProduct,
  addSize,
  getSizes,
  getStock,
} from "../Controller/StockManageController";

const router = express();

router.post("/add-product", expressAsyncHandler(addProduct));

router.get("/get-stock", expressAsyncHandler(getStock));

router.get("/get-sizes", expressAsyncHandler(getSizes));

router.post("/add-size", expressAsyncHandler(addSize));

export default router;
