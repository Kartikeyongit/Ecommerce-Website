
import { useEffect, useState } from "react"
import axios from "axios"
import { Carousel } from "react-bootstrap"

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, [])

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token")
    if (!token) return alert("Please login to add items to cart")
    try {
      await axios.post("http://localhost:5000/api/cart", { productId, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      window.dispatchEvent(new Event("cartUpdated"))
      alert("Item added to cart!")
    } catch (e) {
      alert(e.response?.data?.message || "Error adding to cart")
    }
  }

  return (
    <div className="container-fluid p-0">
      <Carousel fade interval={3000}>
        <Carousel.Item>
          <img className="d-block w-100" src="https://cdn.mos.cms.futurecdn.net/M4nigVN3vvA5EEnNX9atxY-1200-80.jpg" alt="Big Sale" style={{ height: "700px", objectFit: "cover" }} />
          <Carousel.Caption><h2>Big Sale – 50% OFF</h2><p>Shop your favorite products at half price!</p></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://staticassets.oxfam.org.uk/oxfamgb-production/images/Blog_What_to_do_with_your_old_clothes.width-1000.jpg" alt="New Arrivals" style={{ height: "700px", objectFit: "cover" }} />
          <Carousel.Caption><h2>New Arrivals</h2><p>Check out the latest trends and products.</p></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://redtape.com/cdn/shop/files/RSL1017_1.jpg?v=1755859973" alt="Exclusive Deals" style={{ height: "700px", objectFit: "cover" }} />
          <Carousel.Caption><h2>Exclusive Deals</h2><p>Get special discounts only for you!</p></Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="p-4">
        <h1 className="mb-4">Products</h1>
        <div className="row g-3">
          {products.map(p => (
            <div key={p._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="card h-100 shadow-sm">
                <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                  <img src={p.image || "https://via.placeholder.com/500x350?text=No+Image"} alt={p.name} className="p-2" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p><b>Category:</b> {p.category}</p>
                  <p className="text-success fw-bold">${p.price}</p>
                  <button className="btn btn-primary w-100 mt-auto" onClick={() => addToCart(p._id)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
