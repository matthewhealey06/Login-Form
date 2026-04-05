const express = require("express");
const app = express();
app.disable("x-powered-by");
const User = require("./User");
const bcrypt = require("bcrypt");

app.use(express.static("public"));
app.use(express.json());
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }
  console.log(req.body);
  bcrypt.hash(password, 10).then((hashedPassword) => {
    User.create({
      username: username,
      email: email,
      password: hashedPassword,
    })
      .then((user) => {
        res.json({ message: "User created" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to create user" });
      });
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

  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }

  User.findOne({ username: username })
    .then((user) => {
      if (user === null) {
        res.json({ success: false, message: "User not found" });
      } else {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            res.json({ success: true });
          } else {
            res.json({ success: false, message: "Wrong password" });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Server error" });
    });
});
