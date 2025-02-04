const express = require("express");
const { app, server } = require("./middleware/socket");
const cors = require("cors");
const bodyParser = require('body-parser');
const connectDB = require("./db");
const Route = require("./routes/Routes");
const cookieParser = require('cookie-parser');
require('dotenv').config()

app.use(
  cors({
    origin: process.env.APP_LOCAL_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"));
app.use(express.static("build"));

app.use('/api', Route)

connectDB()
  .then(() => {
    server.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

