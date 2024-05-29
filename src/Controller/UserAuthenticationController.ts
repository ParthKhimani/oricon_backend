import { Request, Response } from "express";
import User from "../Model/User";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const loginUser = async (req: Request, res: Response) => {
  const { name, userName, password } = req.body;
  const result = await User.findOne({ userName: userName });
  if (!result) {
    res.status(303).json({ msg: "User not found !" });
  } else {
    const passCheck = password.localeCompare(result.password);
    if (passCheck == 0) {
      const token = jwt.sign({ role: "admin" }, "secret-key");
      res.status(200).json({ msg: "User Logged In !", token });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "parthkhimani48@gmail.com",
          pass: "bxukavbknqbpcgeu",
        },
      });

      const mailOptions = {
        from: "parthkhimani48@gmail.com",
        to: "oriconindia1997@gmail.com",
        subject: "New Login Alert",
        text: `${name} logged in`,
      };

      transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email Sent");
        }
      });
    } else {
      res.status(400).json({ msg: "Incorrect Password !" });
    }
  }
};

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, userName, password } = req.body;
  const result = await User.findOne({ userName: userName });
  if (result != null) {
    res.status(400).json({ msg: "user already registered!" });
  } else {
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
    });
    await newUser.save();
    res.status(200).json({ msg: "user registered successfully!" });
  }
};

export { loginUser, registerUser };
