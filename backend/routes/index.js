import express from "express";
import messagesRoutes from "../controllers/messages.controller.js";

const router = express.Router();

router.use("/messages", messagesRoutes);

export default router;
