
import Cart from "../models/cart.js"
import Order from "../models/order.js"

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product")
    if (!cart || !cart.items.length) return res.status(400).json({ message: "Cart is empty" })

    const total = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map(i => ({ product: i.product._id, quantity: i.quantity })),
      total
    })

    cart.items = []
    await cart.save()

    res.status(201).json(order)
  } catch (e) {
    res.status(500).json({ message: "Failed to create order" })
  }
}

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product")
    res.json(orders)
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch orders" })
  }
}
