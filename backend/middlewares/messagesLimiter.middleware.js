import rateLimit from "express-rate-limit";

export const createMessageLimiter = rateLimit({
  windowMs: 2000,
  max: 1,
  message: "You can only send one message per 2 seconds",
});

export const editMessageLimiter = rateLimit({
  windowMs: 3000,
  max: 1,
  message: "You can only edit one message per 3 seconds",
});

export const deleteMessageLimiter = rateLimit({
  windowMs: 5000,
  max: 5,
  message: "You can only delete 5 messages per 10 seconds",
});
