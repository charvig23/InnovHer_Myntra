const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require("dotenv").config({path: "server/config/.env"});

mongoose
.connect("mongodb+srv://charvigu231990:"+process.env.mongo_password+"@cluster0.jylbx2h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then((x) => {
    console.log("Connected to Mongo");
})
.catch((err) => {
    console.log("Error connecting to Mongo");
});
app.use(express.json());

app.listen(port, () => {
  console.log("Server is running on port "+port );
});