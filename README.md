# 🛒 Ecommerce Website  

A full-stack **E-commerce web application** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
This project includes **user authentication, product management, cart system, orders, and admin panel** with role-based access.  

---

## ✨ Features  

### 🔹 User Features  
- 👤 Register and login with JWT authentication  
- 🛍️ Browse products with images, prices, and details  
- 🛒 Add, update, or remove products from cart  
- 📦 Place orders securely  
- 🔑 Persist login using JWT tokens  

### 🔹 Admin Features  
- 🛠️ Add new products  
- ✏️ Edit product details  
- ❌ Delete products  
- 🔐 Only accessible to admin users  

---

## 🛠️ Tech Stack  

### **Frontend**  
- ⚛️ React + Vite  
- 🎨 React-Bootstrap  
- 🔄 Axios  

### **Backend**  
- 🟢 Node.js  
- ⚡ Express.js  
- 🛡️ JWT Authentication  
- 🔑 bcryptjs for password hashing  

### **Database**  
- 🍃 MongoDB (Mongoose ODM)  

---

## 📂 Project Structure  

```
ecommerce-website/
│── backend/
│   ├── config/         # DB connection
│   ├── controllers/    # Logic for routes
│   ├── middleware/     # Auth & admin middlewares
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── server.js       # Main server file
│
│── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components (Navbar, etc.)
│   │   ├── pages/      # Screens (Home, Cart, Login, Register)
│   │   ├── App.jsx     # App entry
│   │   ├── main.jsx    # React entry
│
│── .env                # Environment variables
│── README.md           # Project documentation
```

---

## ⚙️ Installation  

1. **Clone the repository**  
```bash
git clone https://github.com/your-username/Ecommerce-Website.git
cd Ecommerce-Website
```

2. **Setup Backend**  
```bash
cd backend
npm install
```

3. **Setup Frontend**  
```bash
cd ../frontend
npm install
```

---

## 🚀 Running the Project  

1. Start **backend server**:  
```bash
cd backend
npm run dev
```
Backend runs on [http://localhost:5000](http://localhost:5000)

2. Start **frontend**:  
```bash
cd frontend
npm run dev
```
Frontend runs on [http://localhost:5173](http://localhost:5173)

---

## 🔑 Admin Credentials  

When you first set up, create an **admin user**:  
```bash
node backend/createAdmin.js
```

Default:  
- **Email:** `admin@example.com`  
- **Password:** `Admin@123`  

---

## 📸 Screenshots  

(Add later if you want: Home page, Cart, Admin Panel, etc.)  

---

## 📌 Future Improvements  
- ✅ Payment gateway integration (Stripe / Razorpay)  
- ✅ Product categories & filters  
- ✅ Wishlist feature  
- ✅ Order history for users  

---

## 👨‍💻 Author  

Developed by **Kartikey Gautam** ✨  
