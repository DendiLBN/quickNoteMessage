import express from "express";
import {
  createMessageValidator,
  editMessageValidator,
  validateMessageId,
} from "../middlewares/messagesValidators.middleware.js";
import {
  createMessageLimiter,
  editMessageLimiter,
  deleteMessageLimiter,
} from "../middlewares/messagesLimiter.middleware.js";
import {
  createMessage,
  getAllMessages,
  deleteMessage,
  editMessage,
} from "../services/messages.service.js";

const router = express.Router();

router.get("/", getAllMessages);
router.post("/", createMessageValidator, createMessageLimiter, createMessage);
router.patch("/:id", editMessageValidator, editMessageLimiter, editMessage);
router.delete("/:id", validateMessageId, deleteMessageLimiter, deleteMessage);

export default router;
