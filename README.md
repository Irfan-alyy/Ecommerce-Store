
E-commerce Store

📌 Project Overview

This is a fully responsive E-commerce Store built using React.js, inspired by the Flone Electronics Demo. The project includes multiple pages and uses Redux Toolkit for state management along with Redux Persist to retain cart data in local storage.


---

📑 Features

✅ Fully responsive design 📱💻
✅ Multiple pages: Home, Product Page, Cart, Checkout, Login & Registration
✅ Redux Toolkit for managing cart state 🛒
✅ Redux Persist for saving cart data after refresh 🔄
✅ User Authentication (Login & Registration) 🔑
✅ Product Listings with details 📦
✅ Add to Cart & Remove from Cart functionality 🛍️
✅ Checkout Process 💳
✅ Organized folder structure for scalability 🚀


---

🏗️ Project Structure
```bash
/src
│── components/         # All components related to pages
│── customHooks/        # Custom React hooks
│── features/           # Reusable app logic (e.g., scroll-to-top)
│── layout/             # Page layout components (Header, Footer, etc.)
│── pages/              # Main page components and their folders
│── style/              # Page-specific styles
│── store/              # Redux Toolkit store and slices
│── UI/                 # Reusable small components, animations, etc.
│── App.jsx             # Main application component
│── main.jsx            # Entry point of the application

```


---

⚡ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/Irfan-alyy/Ecommerce-Store.git
cd ecommerce-store

2️⃣ Install dependencies

npm install

3️⃣ Start the development server

npm run dev

The app will run on http://localhost:5173/ 🚀


---

🛒 Using Redux for Cart Management

We use Redux Toolkit to manage the cart state and Redux Persist to store it in localStorage.

Example: Add an item to the cart

dispatch(addToCart(item));

Example: Remove an item from the cart

dispatch(removeItem(productId));

You can find the configuration for Redux and Redux Persist in the store/ folder.


---

🚀 Deployment

To build and deploy the app:

npm run build

Then, deploy the dist/ folder using Vercel, Netlify, or GitHub Pages.


---

🛠️ Technologies Used

React.js ⚛️

Redux Toolkit & Redux Persist 🛒

React Router 🚏

Tailwind CSS or Styled Components 🎨

Material UI (e.g., badge)

LocalStorage (via Redux Persist) 💾



---

📞 Contact

For any issues or suggestions, feel free to open an issue or reach out!
Ali Irfan


---

Let me know if you'd like a markdown file version of this or help creating a visual diagram for your project structure.

