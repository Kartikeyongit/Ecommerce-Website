
import { useEffect, useState } from "react"
import axios from "axios"

export default function Cart() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState("")

  const token = localStorage.getItem("token")
  const auth = { headers: { Authorization: `Bearer ${token}` } }

  const load = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", auth)
      setItems(res.data || [])
    } catch (e) {
      alert(e.response?.data?.message || "Failed to load cart")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const updateQty = async (idOrProductId, qty) => {
    if (qty < 1) return
    try {
      setBusyId(idOrProductId)
      const res = await axios.put(`http://localhost:5000/api/cart/${idOrProductId}`, { quantity: qty }, auth)
      setItems(res.data || [])
      window.dispatchEvent(new Event("cartUpdated"))
    } catch (e) {
      alert(e.response?.data?.message || "Failed to update")
    } finally {
      setBusyId("")
    }
  }

  const removeItem = async (idOrProductId) => {
    try {
      setBusyId(idOrProductId)
      const res = await axios.delete(`http://localhost:5000/api/cart/${idOrProductId}`, auth)
      setItems(res.data || [])
      window.dispatchEvent(new Event("cartUpdated"))
    } catch (e) {
      alert(e.response?.data?.message || "Failed to remove")
    } finally {
      setBusyId("")
    }
  }

  const subtotal = items.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0)
  const totalItems = items.reduce((s, i) => s + i.quantity, 0)

  if (!token) return <div className="container mt-4"><h4>Please login to see your cart.</h4></div>
  if (loading) return <div className="container mt-4"><h4>Loading...</h4></div>
  if (!items.length) return <div className="container mt-4"><h4>Your cart is empty.</h4></div>

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Your Cart</h2>
      <div className="row g-3">
        {items.map(item => (
          <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                <img src={item.product?.image || "https://via.placeholder.com/500x350?text=No+Image"} alt={item.product?.name} className="p-2" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-1">{item.product?.name}</h5>
                <p className="text-success fw-bold mb-1">${item.product?.price}</p>

                <div className="d-flex align-items-center mb-3">
                  <button className="btn btn-outline-secondary btn-sm" disabled={busyId===item._id||busyId===item.product?._id} onClick={()=>updateQty(item._id, item.quantity-1)}>–</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="btn btn-outline-secondary btn-sm" disabled={busyId===item._id||busyId===item.product?._id} onClick={()=>updateQty(item._id, item.quantity+1)}>+</button>
                </div>

                <button className="btn btn-danger w-100 mt-auto" disabled={busyId===item._id||busyId===item.product?._id} onClick={()=>removeItem(item._id)}>
                  {busyId===item._id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4 shadow-sm mb-5">
        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
          <h5 className="mb-2 mb-md-0">
            Subtotal ({totalItems} {totalItems===1 ? "item" : "items"}): <span className="text-success">${subtotal.toFixed(2)}</span>
          </h5>
          <button className="btn btn-primary btn-lg">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}
