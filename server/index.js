const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require('mongoose');
const errorHandler = require("./middlewares/errorHandler.js");
require('dotenv').config({ path: './config/.env' });

const mongoURI = "mongodb+srv://charvigu231990:" + process.env.mongo_password + "@cluster0.w3o6xgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

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
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(errorHandler);
// Import routes here
const EntryRoutes = require("./routes/entry.js");

// Use routes here

app.use("/submit", upload.fields([
  { name: 'uploaded_images', maxCount: 1 },
  { name: 'other_images', maxCount: 1 }
]), EntryRoutes);

app.use("/api", EntryRoutes);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});