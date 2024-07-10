const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
const mongoURI = "mongodb+srv://charvigu231990:"+process.env.mongo_password+"@cluster0.w3o6xgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.json());

app.listen(port, () => {
  console.log("Server is running on port " + port);
});