# 🚀 QuickGPT – AI Chatbot Platform

QuickGPT is a full-stack AI chatbot application inspired by ChatGPT.
It allows users to create chats, interact with an AI assistant, generate images, and manage conversations in a clean modern interface.

The project is built using the **MERN stack** along with **Gemini API** for AI responses and **ImageKit** for image generation and optimization.

---

# 🌐 Live Demo
https://quick-gpt-vert-six.vercel.app

# ✨ Features

* 🤖 AI powered chatbot using **Gemini API**
* 💬 Create and manage multiple chats
* 🧠 Context-aware conversation
* 🖼️ AI Image generation using **ImageKit**
* 🔐 User authentication system
* 💳 Subscription / payments using **Stripe**
* ⚡ Fast frontend built with **React + Vite**
* 🌍 REST API backend using **Node.js & Express**
* 📦 MongoDB database for storing users and chats
* 🔔 Toast notifications and error handling
* 📱 Responsive UI

---

# 🛠 Tech Stack

### Frontend

* React
* Vite
* Axios
* React Hot Toast
* Tailwind CSS 

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### APIs & Services

* Gemini API (AI responses)
* ImageKit (image generation + CDN)
* Stripe (payments)

---

# 📂 Project Structure

```
QuickGPT
│
├── client          # React frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   └── App.jsx
│
├── server          # Node.js backend
│   ├── controllers
│   ├── routes
│   ├── models
│   └── server.js
│
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file in the **server** directory.

```
PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

IMAGEKIT_URL_ENDPOINT=your_endpoint
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key

STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

# 🖥️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/yourusername/quickgpt.git
cd quickgpt
```

---

### 2️⃣ Install Dependencies

Frontend

```
cd client
npm install
```

Backend

```
cd server
npm install
```

---

### 3️⃣ Run the Project

Run backend

```
cd server
npm run dev
```

Run frontend

```
cd client
npm run dev
```


# 🚀 Future Improvements

* Voice chat support
* Chat export feature
* Dark / Light theme toggle
* File upload support
* Chat history search

---

# 👨‍💻 Author

**Vansh Yadav**

GitHub: https://github.com/yourusername

---

# ⭐ Support

If you like this project, please consider giving it a **star ⭐ on GitHub**.
