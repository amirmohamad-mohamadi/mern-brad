const express = require("express");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// for To correctly read the body that we receive from the front
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome to the Supprt Desck API" })
);
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
