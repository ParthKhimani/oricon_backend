import expressAsyncHandler from "express-async-handler";
import express from "express";
import {
  addProduct,
  addSize,
  deleteSize,
  getProduct,
  getSizes,
  getStock,
  getLatestStock,
  deleteStock,
  getLastProduct,
  getDailyStock,
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
  updateComapny,
} from "../Controller/CompanyController";

const router = express();

router.post("/add-product", expressAsyncHandler(addProduct));

router.post("/get-product", expressAsyncHandler(getProduct));

router.get("/get-stock", expressAsyncHandler(getStock));

router.get("/get-latest-stock", expressAsyncHandler(getLatestStock));

router.get("/get-daily-stock", expressAsyncHandler(getDailyStock));

router.get("/get-last-product", expressAsyncHandler(getLastProduct));

router.delete("/delete-stock/:id", expressAsyncHandler(deleteStock));

router.get("/get-sizes", expressAsyncHandler(getSizes));

router.post("/add-size", expressAsyncHandler(addSize));

router.delete("/delete-size/:id", expressAsyncHandler(deleteSize));

router.post("/login-user", expressAsyncHandler(loginUser));

router.post("/register-user", expressAsyncHandler(registerUser));

router.post("/submit-otp", expressAsyncHandler(submitOtp));

router.post("/create-company", expressAsyncHandler(createCompany));

router.patch("/update-company/:id", expressAsyncHandler(updateComapny));

router.delete("/delete-company/:id", expressAsyncHandler(deleteCompany));

router.get("/get-companies", expressAsyncHandler(getCompanies));

export default router;
