import Product from "../models/product.js"

// Create a new product (admin only)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body
    if (!name || !price) return res.status(400).json({ message: "Name and price are required" })

    const product = await Product.create({ name, description, price, category, image })
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ message: "Failed to create product" })
  }
}

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" })
  }
}

// Get single product by ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" })
  }
}

// Update product by ID (admin only)
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" })

    product.name = name || product.name
    product.description = description || product.description
    product.price = price || product.price
    product.category = category || product.category
    product.image = image || product.image

    await product.save()
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" })
  }
}

// Delete product by ID (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" })

    await product.remove()
    res.json({ message: "Product deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" })
  }
}
