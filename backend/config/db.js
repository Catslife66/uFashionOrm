const { Sequelize } = require("sequelize");
require("dotenv").config();

const DB_URI = process.env.DB_URI;

// option1 passing connection string
const sequelize = new Sequelize(DB_URI);

// option2 passing parameters
// const sequelize = new Sequelize(
//   process.env.PGDATABASE,
//   process.env.PGUSER,
//   process.env.PGPASSWORD,
//   {
//     host: process.env.PGHOST,
//     dialect: "postgres",
//     port: process.env.PGPORT,
//     dialectOptions: {
//       ssl: {
//         require: true,
//       },
//     },
//   }
// );

module.exports = sequelize;
