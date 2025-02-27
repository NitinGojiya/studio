import express from 'express';
import multer from "multer";
import path from "path";
import {fetchuser,user,loginstudio,create,fetchstudio,createstudio,fetchcity,fetchbooking,updateBooking,deleteBooking,updateStudio,deleteStudio,createbooking,fetchstudio1} from "../controller/usercontroller.js";
const route=express.Router();
// ✅ Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});

const upload = multer({ storage });
route.post("/user",user);
route.post("/loginstudio",loginstudio);
route.post("/create",create);
route.post("/createstudio",upload.single("file"), createstudio);
route.get("/fetchstudio",fetchstudio);
route.get("/fetchstudio1/:id",fetchstudio1);
route.get("/fetchcity",fetchcity);
route.get("/fetchuser/:id",fetchuser);
route.post("/createbooking",createbooking);
route.get("/fetchbooking",fetchbooking);
route.put("/updatestudio/:id",updateStudio);
route.put("/updatebooking/:id",updateBooking);
route.delete("/deletebooking/:id",deleteBooking);
route.delete("/deletestudio/:id",deleteStudio);

export default route;