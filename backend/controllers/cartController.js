
import Cart from "../models/cart.js"
import Product from "../models/product.js"

const ensureCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId })
  if (!cart) cart = await Cart.create({ user: userId, items: [] })
  return cart
}

// GET /api/cart -> items[]
export const getCart = async (req, res) => {
  try {
    const cart = await ensureCart(req.user._id)
    await cart.populate("items.product")
    res.json(cart.items)
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch cart" })
  }
}

// POST /api/cart { productId, quantity? }
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: "Product not found" })

    const cart = await ensureCart(req.user._id)
    const idx = cart.items.findIndex(i => i.product.toString() === productId)
    if (idx > -1) cart.items[idx].quantity += quantity
    else cart.items.push({ product: productId, quantity })

    await cart.save()
    await cart.populate("items.product")
    res.json(cart.items)
  } catch (e) {
    res.status(500).json({ message: "Failed to add to cart" })
  }
}

// PUT /api/cart/:id  (id = cart item id OR product id)
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body
    if (!quantity || quantity < 1) return res.status(400).json({ message: "Quantity must be >= 1" })

    const cart = await ensureCart(req.user._id)
    let item = cart.items.id(req.params.id)
    if (!item) {
      item = cart.items.find(i => i.product.toString() === req.params.id)
    }
    if (!item) return res.status(404).json({ message: "Cart item not found" })

    item.quantity = quantity
    await cart.save()
    await cart.populate("items.product")
    res.json(cart.items)
  } catch (e) {
    res.status(500).json({ message: "Failed to update cart item" })
  }
}

// DELETE /api/cart/:id  (id = cart item id OR product id)
export const removeFromCart = async (req, res) => {
  try {
    const cart = await ensureCart(req.user._id)
    cart.items = cart.items.filter(i => i._id.toString() !== req.params.id && i.product.toString() !== req.params.id)
    await cart.save()
    await cart.populate("items.product")
    res.json(cart.items)
  } catch (e) {
    res.status(500).json({ message: "Failed to remove from cart" })
  }
}
