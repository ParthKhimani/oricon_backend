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
const http_1 = require("http");
// import { setIoInstance } from "./Controller/StockManageController";
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "*", // Adjust according to your security requirements
//     methods: ["GET", "POST"],
//   },
//   path: "/socket",
// });
// setIoInstance(io);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(Router_1.default);
// app.use(errorHandler);
// io.on("connection", (socket) => {
//   socket.on("product_added", (data) => console.log(data));
// });
mongoose_1.default
    .connect(`mongodb+srv://parth:${process.env.MONGODB_PASSWORD}@cluster0.eixcpta.mongodb.net/oricon?retryWrites=true&w=majority`)
    .then(() => {
    httpServer.listen(process.env.PORT, () => {
        console.log(`server started at port: ${process.env.PORT}`);
    });
});
exports.default = app;
