import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import rateLimit from "express-rate-limit";
import sequelize from "./utils/database.js";
import routes from "./routes/index.js";

// Initialize environment variables
config();

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Interview task" });
});

app.use("/api", routes);

// Global Error Handling Middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ success: false, message: message, data: data });
});

const createMessageLimiter = rateLimit({
  windowMs: 2000,
  max: 1,
  message: "You can only send one message per 2 seconds",
});

// DB Connection
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
