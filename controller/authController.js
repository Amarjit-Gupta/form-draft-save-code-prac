import Jwt from 'jsonwebtoken';
import User from '../model/User.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        if (!name || !email || !password) {
            return res.status(200).json({ success: false, message: "Please provide name, email and passsword..." });
        }
        let existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(200).json({ success: false, message: "User already exist..." });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        let user = new User({ name, email, password: hashPassword });
        let data = await user.save();
        let token = Jwt.sign({ id: data._id }, process.env.JWT_KEY, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ success: true, message: "signup successfully..." });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "something went wrong..." });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(200).json({ success: false, message: "Please provide email and passsword..." });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ success: false, message: "Invalid Email..." });
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(200).json({ success: false, message: "Invalid Password..." });
        }

        let token = Jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ success: true, message: "login successfully..." });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "something went wrong..." });
    }
}

export const isauth = async (req, res) => {
    try {
        let userId = req.user;
       // console.log("user: ",user);
        let userData = await User.findOne({_id:userId}).select("name");
        console.log(userData);
        return res.status(200).json({ success: true, message: "userdata...",userData });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "something went wrong..." });
    }
}



export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        });
        return res.status(200).json({ success: true, message: "logout successfully..." });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "something went wrong..." });
    }
}



