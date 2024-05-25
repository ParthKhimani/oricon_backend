import { Request, Response } from "express";
import User from "../Model/User";
import jwt from "jsonwebtoken";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email: email });
  if (!result) {
    res.status(303).json({ msg: "User not found !" });
  } else {
    const passCheck = password.localeCompare(result.password);
    if (passCheck == 0) {
      const token = jwt.sign({ role: "admin" }, "secret-key");
      res.status(200).json({ msg: "User Logged In !", token });
    } else {
      res.status(400).json({ msg: "Incorrect Password !" });
    }
  }
};

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const result = await User.findOne({ email: email });
  if (result != null) {
    res.status(400).json({ msg: "user already registered!" });
  } else {
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(200).json({ msg: "user registered successfully!" });
  }
};

export { loginUser, registerUser };
