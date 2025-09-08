
import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, default: "" },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "General" },
    countInStock: { type: Number, default: 100 }
  },
  { timestamps: true }
)

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)
export default Product
