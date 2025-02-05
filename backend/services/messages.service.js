import { validationResult } from "express-validator";
import Messages from "../models/messages.model.js";

// Get all messages
export const getAllMessages = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count: total, rows: messages } = await Messages.findAndCountAll({
      offset,
      limit,
    });

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      data: messages,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new message
export const createMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newMessage = new Messages({
      message: req.body.content,
    });

    await newMessage.save();

    res.status(201).json({ data: newMessage });
  } catch (err) {
    next(err);
  }
};

// Delete message
export const deleteMessage = async (req, res, next) => {
  try {
    const deleteMessage = await Messages.findByPk(req.params.id);

    if (!deleteMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    await deleteMessage.destroy();

    res.status(200).json({ message: "Message deleted" });
  } catch (err) {
    next(err);
  }
};

// Edit message
export const editMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const response = await Messages.findByPk(req.params.id);

    if (!response) {
      return res.status(404).json({ message: "Message not found" });
    }

    response.message = req.body.content;

    await response.save();

    res.status(200).json({ data: response });
  } catch (err) {
    next(err);
  }
};
