import { Request, Response } from "express";
import User from "../Model/User";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

let localOtp = Math.floor(Math.random() * 1000000);

const loginUser = async (req: Request, res: Response) => {
  const { name, userName, password } = req.body;
  const result = await User.findOne({ userName: userName });
  if (!result) {
    res.status(303).json({ msg: "User not found !" });
  } else {
    const passCheck = password.localeCompare(result.password);
    if (passCheck == 0) {
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
        subject: "New Sign In found",
        text: `Welcome to Oricon India,\nHere is your OTP to Sign In: ${localOtp}`,
      };

      transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email Sent");
        }
      });
      res.status(200).json({ msg: "Otp sent to your email address !" });
    } else {
      res.status(400).json({ msg: "Incorrect Password !" });
    }
  }
};

const submitOtp = async (req: Request, res: Response) => {
  const { otp } = req.body;
  if (otp.localeCompare(localOtp) === 0) {
    const token = jwt.sign({ role: "admin" }, "secret-key");
    res.status(200).json({ msg: "user logged in", token });
  } else res.status(400).json({ msg: "Incorrect OTP!" });
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

export { loginUser, submitOtp, registerUser };
