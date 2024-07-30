const express = require("express");
require("dotenv").config();
const { sequelize } = require("./models");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const { logger } = require("./middleware/loggerMiddleware");
const apiRoutes = require("./routes/routers");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();
const bodyParser = require("body-parser");
const { webhookListener } = require("./controllers/paymentController");

// middleware
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static folder
const uploadDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadDir));

// register routes
app.use("/api", apiRoutes);

// error handling middleware
app.use(errorHandler);

const connectDb = async () => {
  console.log("Connecting...");
  try {
    await sequelize.authenticate();
    console.log("connection established.");
  } catch (err) {
    console.log("connection failed", err);
    process.exit(1);
  }
};

const runServer = async () => {
  await connectDb();
  app.listen(PORT, () => console.log(`Running on ${PORT}.`));
};

runServer();
