const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.status(200).json({message:"Welcome to the Supprt Desck API"}));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
