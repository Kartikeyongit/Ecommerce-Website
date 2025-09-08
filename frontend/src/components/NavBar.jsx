import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Nav, Container, Badge, Button } from "react-bootstrap"
import { ShoppingCart, Home as HomeIcon } from "lucide-react"

export default function NavBar() {
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const navigate = useNavigate()

  // Load user from localStorage & listen for login/register changes
  useEffect(() => {
    const handleUserChange = () => {
      const storedUser = localStorage.getItem("user")
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }
    handleUserChange()
    window.addEventListener("userChanged", handleUserChange)
    return () => window.removeEventListener("userChanged", handleUserChange)
  }, [])

  // Load cart count from API & listen for cart updates
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        const total = data.reduce((sum, item) => sum + item.quantity, 0)
        setCartCount(total)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCartCount()
    const updateListener = () => fetchCartCount()
    window.addEventListener("cartUpdated", updateListener)
    return () => window.removeEventListener("cartUpdated", updateListener)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setCartCount(0)
    navigate("/login")
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>

        {/* Left: Home Icon */}
        <Nav className="me-auto">
          <Link to="/" className="nav-link d-flex align-items-center">
            <HomeIcon size={25} className="me-1 text-light" /> Home
          </Link>
        </Nav>

        {/* Center: Brand Logo */}
        <Navbar.Brand className="mx-auto fs-3 fw-bold text-light">
          🛍️ ShopEase
        </Navbar.Brand>

        {/* Right: Cart + User */}
        <Nav className="ms-auto d-flex align-items-center">
          <Link to="/cart" className="nav-link position-relative me-3">
            <ShoppingCart size={25} className="text-light" />
            {cartCount > 0 && (
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-0 translate-middle"
              >
                {cartCount}
              </Badge>
            )}
          </Link>

          {user ? (
            <>
              <span className="me-3 fw-bold text-light">{user.name}</span>
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/register" className="btn btn-light">Register</Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}
