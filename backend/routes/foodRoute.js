import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

//multer config
//we are configuring multer to store the file in the uploads folder
const foodRouter = express.Router();

//Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
    //we are renaming the file to the current date and time and the original name of the file and passing it to the callback function to avoid any conflicts of file names in the uploads folder
  },
});
const upload = multer({ storage: storage });
//we are passing the storage engine to multer to store the file in the uploads folder
foodRouter.post("/add", upload.single("image"), addFood);
//we are telling our app to use the addFood function whenever the request is made to /api/food/add and we are passing the image file to the addFood function

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
