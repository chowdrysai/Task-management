// Required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const tasksRoutes = require("./routes/tasks");
const { sequelize } = require("./config/database");
const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully")
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));

// Sync models with the database
sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing database:", err));

// Routes
app.use("/tasks", tasksRoutes);

module.exports = app;
