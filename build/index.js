"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const Router_1 = __importDefault(require("./Router/Router"));
// import { errorHandler } from "./exceptions/errorHandler";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(Router_1.default);
// app.use(errorHandler);
mongoose_1.default
    .connect(`mongodb+srv://parth:${process.env.MONGODB_PASSWORD}@cluster0.eixcpta.mongodb.net/oricon?retryWrites=true&w=majority`)
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server started at port: ${process.env.PORT}`);
    });
});
exports.default = app;
