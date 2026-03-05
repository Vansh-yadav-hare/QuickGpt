import express from "express";
import {protect} from "../middlewares/auth.js";   


import { textMesageController, imageMesageController } from "../controllers/messageController.js";

const messageRouter=express.Router();


messageRouter.post("/text",protect, textMesageController);
messageRouter.post("/image", protect, imageMesageController);

export default messageRouter;