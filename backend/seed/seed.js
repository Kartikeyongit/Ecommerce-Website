
import dotenv from "dotenv"
import connectDB from "../config/db.js"
import Product from "../models/product.js"

dotenv.config()
await connectDB()

const products = [
  {
    name: "Smartphone X1",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200",
    price: 699,
    description: "Fast, sleek, and powerful smartphone.",
    category: "Electronics"
  },
  {
    name: "Running Shoes Pro",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200",
    price: 119,
    description: "Lightweight shoes for everyday runs.",
    category: "Footwear"
  },
  {
    name: "Noise-cancelling Headphones",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1200",
    price: 199,
    description: "Immersive sound with active noise cancellation.",
    category: "Audio"
  },
  {
    name: "Classic Denim Jacket",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200",
    price: 89,
    description: "Timeless denim jacket for all seasons.",
    category: "Fashion"
  }
]

try {
  await Product.deleteMany()
  await Product.insertMany(products)
  console.log("Seeded products ✅")
  process.exit(0)
} catch (e) {
  console.error(e)
  process.exit(1)
}
