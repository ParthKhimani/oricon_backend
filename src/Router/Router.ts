import expressAsyncHandler from "express-async-handler";
import express from "express";
import {
  addProduct,
  addSize,
  deleteSize,
  getSizes,
  getStock,
} from "../Controller/StockManageController";
import { loginUser, registerUser } from "../Controller/UserAuthenticationController";

const router = express();

router.post("/add-product", expressAsyncHandler(addProduct));

router.get("/get-stock", expressAsyncHandler(getStock));

router.get("/get-sizes", expressAsyncHandler(getSizes));

router.post("/add-size", expressAsyncHandler(addSize));

router.delete("/delete-size", expressAsyncHandler(deleteSize));

router.post("/login-user", expressAsyncHandler(loginUser));

router.post("/register-user", expressAsyncHandler(registerUser));

export default router;
