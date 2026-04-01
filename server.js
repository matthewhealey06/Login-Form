const express = require("express");
const app = express();
const User = require("./User");

app.use(express.static("public"));
app.use(express.json());
app.post("/api/register", (req, res) => {
  console.log(req.body);
  User.create(req.body)
    .then((user) => {
      res.json({ message: "User created" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to create user" });
    });
});

app.listen(3000, () => {
  console.log("The Server is Running");
});
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (user === null) {
        res.json({ success: false, message: "User not found" });
      } else if (user.password !== password) {
        res.json({ success: false, message: "Wrong password" });
      } else {
        res.json({ success: true });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Server error" });
    });
});
