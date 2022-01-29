const dotenv = require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const apiRoutes = require("./routes/api");
const viewRoutes = require("./routes/view")



const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(apiRoutes);
app.use(viewRoutes)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

