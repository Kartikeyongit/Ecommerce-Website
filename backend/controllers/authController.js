import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" })

    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: "Email already in use" })

    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hash, role: role || "user" })

    res.status(201).json({
      token: genToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (e) {
    res.status(500).json({ message: "Registration failed" })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Invalid credentials" })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(400).json({ message: "Invalid credentials" })

    res.json({
      token: genToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (e) {
    res.status(500).json({ message: "Login failed" })
  }
}
