import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res)=>{
    try {
        const { name, email, password } = req.body
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "Email already registered" })

        const user = await User.create({ name, email, password });
        res.status(201).json({ message: "User Registered Successfully!", user });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const loginUser = async(req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials"});
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {expiresIn: "1h"})

        res.json({ message: "Login Successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getProfile = async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}