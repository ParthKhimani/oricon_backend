"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.submitOtp = exports.loginUser = void 0;
const User_1 = __importDefault(require("../Model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
let localOtp;
const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    const result = await User_1.default.findOne({ userName: userName });
    localOtp = String(Math.floor(Math.random() * 1000000)).padEnd(6, "0");
    const transporter = nodemailer_1.default.createTransport({
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
    if (!result) {
        res.status(303).json({ message: "User not found !" });
    }
    else {
        const passCheck = password.localeCompare(result.password);
        if (passCheck == 0) {
            transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json({ message: "Otp sent to your email address !" });
                }
            });
        }
        else {
            res.status(400).json({ message: "Incorrect Password !" });
        }
    }
};
exports.loginUser = loginUser;
const submitOtp = async (req, res) => {
    const { otp } = req.body;
    if (otp.padEnd(6, "0").localeCompare(localOtp) === 0) {
        const token = jsonwebtoken_1.default.sign({ role: "admin" }, "secret-key");
        res.status(200).json({ message: "user logged in", token });
    }
    else
        res.status(400).json({ message: "Incorrect OTP!" });
};
exports.submitOtp = submitOtp;
const registerUser = async (req, res) => {
    const { firstName, lastName, userName, password } = req.body;
    const result = await User_1.default.findOne({ userName: userName });
    if (result != null) {
        res.status(400).json({ message: "user already registered!" });
    }
    else {
        const newUser = new User_1.default({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
        });
        await newUser.save();
        res.status(200).json({ message: "user registered successfully!" });
    }
};
exports.registerUser = registerUser;
