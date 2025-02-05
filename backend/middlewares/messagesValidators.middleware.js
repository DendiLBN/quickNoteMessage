import { body } from "express-validator";
import { param } from "express-validator";

export const createMessageValidator = [
  body("content")
    .isString()
    .notEmpty()
    .isLength({ min: 5, max: 50 })
    .withMessage("Content must be at least 5 characters long and not empty"),
];

export const editMessageValidator = [...createMessageValidator];

export const validateMessageId = [
  param("id").isInt().withMessage("Message ID must be a valid integer."),
];
