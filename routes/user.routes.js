const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const { UserModel } = require("../model/user.model");

const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  let { email, password } = req.body;
  try {
    bcrypt.hash(password, 6, async (err, secured_password) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        const user = new UserModel({
          email,
         password: secured_password,
        });
        await user.save();
        res.send("Registered New user");
      }
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await UserModel.find({ email });
    console.log(user)
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { email, password, userId: user[0]._id },
            "masai"
          );
          res.send({ msg: "Login Successfull", token });
        } else {
          res.send({ msg: "Wrong credentials__", err });
        }
      });
    } else {
      res.send("User not found");
    }
  } catch (err) {
    res.send("Something went wrong while logging in");
  }
});

module.exports = { userRouter };
