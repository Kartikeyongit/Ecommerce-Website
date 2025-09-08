
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/product.js"
import cartRoutes from "./routes/cart.js"
import orderRoutes from "./routes/order.js"

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }))
app.use(morgan("dev"))

app.get("/", (req, res) => res.send("API running"))

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
