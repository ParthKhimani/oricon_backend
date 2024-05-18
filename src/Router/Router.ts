import expressAsyncHandler from "express-async-handler";
import express from "express";
import { addProduct, getStock } from "../Controller/StockManageController";

const router = express();

router.post("/add-product", expressAsyncHandler(addProduct));

router.get("/get-stock", expressAsyncHandler(getStock));

export default router;
