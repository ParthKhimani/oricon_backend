import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Router/Router";
// import { errorHandler } from "./exceptions/errorHandler";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { Server } from "socket.io";
import { createServer } from "http";
import { setIoInstance } from "./Controller/StockManageController";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Adjust according to your security requirements
    methods: ["GET", "POST"],
  },
});
setIoInstance(io);

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
// app.use(errorHandler);

// io.on("connection", (socket) => {
//   socket.on("product_added", (data) => console.log(data));
// });

mongoose
  .connect(
    `mongodb+srv://parth:${process.env.MONGODB_PASSWORD}@cluster0.eixcpta.mongodb.net/oricon?retryWrites=true&w=majority`
  )
  .then(() => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`server started at port: ${process.env.PORT}`);
    });
  });

export default app;
