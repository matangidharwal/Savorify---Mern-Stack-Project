import express from "express";
import cors from "cors";
// cors is a middleware that allows or blocks requests based on the origin of the request
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config

const app = express();
const port = 4000;

//middleware
app.use(express.json());
//we are telling our app to use json as the body parser for the request from frontend to backend

app.use(cors());
//we can access backend from any frontend

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);

//we are telling our app to use the foodRouter whenever the request is made to /api/food
app.use("/images", express.static("uploads"));
//we can access any image in upload folder by using /images/filename in the browser url
//so basically i mounted uploads folder to /images/filename
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

//listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
