import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { admin } from "../middleware/adminMiddleware.js"
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController.js"

const router = express.Router()

// Public routes
router.get("/", getProducts)
router.get("/:id", getProduct)

// Admin-only routes
router.post("/", protect, admin, createProduct)
router.put("/:id", protect, admin, updateProduct)
router.delete("/:id", protect, admin, deleteProduct)

export default router
