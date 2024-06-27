const express = require("express");
require("dotenv").config();
const sequelize = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const logger = require("./middleware/loggerMiddleware");
const apiRoutes = require("./routes/routers");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();

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

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => console.log(`Running on ${PORT}.`));
  })
  .catch((error) => console.error("Unable to connect to the database:", error));
