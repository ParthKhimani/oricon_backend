import expressAsyncHandler from "express-async-handler";
import express from "express";
import {
  addProduct,
  addSize,
  deleteSize,
  getProduct,
  getSizes,
  getStock,
} from "../Controller/StockManageController";
import {
  loginUser,
  registerUser,
  submitOtp,
} from "../Controller/UserAuthenticationController";
import {
  createCompany,
  deleteCompany,
  getCompanies,
} from "../Controller/CompanyController";

const router = express();

router.post("/add-product", expressAsyncHandler(addProduct));

router.post("/get-product", expressAsyncHandler(getProduct));

router.get("/get-stock", expressAsyncHandler(getStock));

router.get("/get-sizes", expressAsyncHandler(getSizes));

router.post("/add-size", expressAsyncHandler(addSize));

router.delete("/delete-size", expressAsyncHandler(deleteSize));

router.post("/login-user", expressAsyncHandler(loginUser));

router.post("/register-user", expressAsyncHandler(registerUser));

router.post("/submit-otp", expressAsyncHandler(submitOtp));

router.post("/create-company", expressAsyncHandler(createCompany));

router.delete("/delete-company/:id", expressAsyncHandler(deleteCompany));

router.get("/get-companies", expressAsyncHandler(getCompanies));

export default router;
