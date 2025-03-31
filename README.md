# E-commerce Store

## 📌 Project Overview
This is a fully responsive **E-commerce Store** built using **React.js**, inspired by the Flone Electronics Demo. The project includes multiple pages and uses **Redux Toolkit** for state management along with **Redux Persist** to retain cart data in local storage.

---
## 📑 Features
✅ Fully responsive design 📱💻
✅ Multiple pages: **Home, Product Page, Cart, Checkout, Login & Registration**
✅ **Redux Toolkit** for managing cart state 🛒
✅ **Redux Persist** for saving cart data after refresh 🔄
✅ User Authentication (Login & Registration) 🔑
✅ Product Listings with details 📦
✅ Add to Cart & Remove from Cart functionality 🛍️
✅ Checkout Process 💳
✅ Organized folder structure for scalability 🚀

---
## 🏗️ Project Structure
```
/src
│── components/       # Reusable UI components (Header, Footer, etc.),  Different pages (Home, Product, Cart, Checkout, etc.)    
│── features/redux            # Redux store, slices, and persistor setup
│── assets/           # Images and static assets
│── App.jsx            # Main application file
│── main.jsx          # Entry point of the app
```

---
## ⚡ Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/Irfan-alyy/Ecommerce-Store.git
cd ecommerce-store
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Start the development server
```sh
npm run dev
```

The app will run on `http://localhost:5173/` 🚀

---
## 🛒 Using Redux for Cart Management
We use **Redux Toolkit** to manage the cart state.

### Add an item to the cart:
```js
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";

const dispatch = useDispatch();

const handleAddToCart = (item) => {
  dispatch(increment(item));
};
```

### Remove an item from the cart:
```js
import { removeItem } from "../redux/cartSlice";

dispatch(removeItem(productId));
```

### Redux Persist Setup
The cart state is saved using **Redux Persist**, ensuring data is retained after refresh. You can find the configuration in `redux/store.js`.

---
## 🚀 Deployment
To build and deploy the app:
```sh
npm run build
```
Then, deploy the `build/` folder using **Vercel, Netlify, or GitHub Pages**.

---
## 🛠️ Technologies Used
- **React.js** ⚛️
- **Redux Toolkit & Redux Persist** 🛒
- **React Router** 🚏
- **CSS (Styled Components / Tailwindcss)** 🎨
- **LocalStorage (via Redux Persist)** 💾
- **Material UI (for cart badge)** 💾


---
## 📞 Contact
For any issues or suggestions, feel free to open an issue or reach out!
[Ali Irfan](https://www.linkedin.com/in/aly-irfan?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)



