import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) return alert("Please fill all fields")
    try {
      setLoading(true)
      const res = await axios.post("http://localhost:5000/api/auth/register", form)
      .then(res => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        window.dispatchEvent(new Event("userChanged")) 
        alert("Registered successfully!")
        navigate("/") 
      })
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Register</h3>
        <form onSubmit={submit}>
          <input placeholder="Name" className="form-control mb-3" onChange={e => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Email" className="form-control mb-3" onChange={e => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" className="form-control mb-3" onChange={e => setForm({ ...form, password: e.target.value })} />
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  )
}
