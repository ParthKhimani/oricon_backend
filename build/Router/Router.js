"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_1 = __importDefault(require("express"));
const StockManageController_1 = require("../Controller/StockManageController");
const router = (0, express_1.default)();
router.post("/add-product", (0, express_async_handler_1.default)(StockManageController_1.addProduct));
router.get("/get-stock", (0, express_async_handler_1.default)(StockManageController_1.getStock));
exports.default = router;
