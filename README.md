# 🌐 Online Portfolio Builder

A full-stack web application that allows users to create, customize, and preview professional portfolios with ease. Built using the **MERN stack** (MongoDB, Express.js, React, Node.js).

---

## 🚀 Features

- 🔐 **User Authentication** (Signup / Signin)
- 🎨 **Template Selection & Customization**
- 👨‍💼 **Live Portfolio Preview**
- 🗃️ **MongoDB Database** for User & Portfolio Data
- 🧠 **Context API-based State Management**
- 📄 **Terms of Use & Password Recovery**
- 📊 **Dashboard** with Personalized User Controls

---

## 📁 Project Structure
```
CLOUD3/
│
├── backend/
│ ├── middleware/ # Auth middleware (JWT)
│ ├── models/ # Mongoose models (User, Portfolio)
│ ├── routes/ # Express routes
│ ├── server.js # Entry point for backend server
│ └── .env # Environment variables
│
├── frontend/
│ ├── public/ # Static assets
│ └── src/
│ ├── components/ # Reusable components
│ ├── context/ # Auth Context for global state
│ ├── pages/ # Main pages like Signin, Signup, Dashboard, etc.
│ └── styles/ # CSS / Tailwind styles
│
├── package.json # Project metadata & dependencies
└── package-lock.json
```
---

## 🛠️ Tech Stack

### Frontend

- **React.js** (JSX, Hooks)
- **Tailwind CSS** (or Standard CSS)
- **Context API** for Auth
- **Axios** for API Requests

### Backend

- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JWT** for Authentication

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/online-portfolio-builder.git
cd online-portfolio-builder
```
### 2. Setup Backend
bash
Copy
Edit
cd backend
npm install
Create a .env file in the backend/ directory:

.env
```plain text
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```
Start the backend server:
```
npm start
```

### 3. Setup Frontend
```
cd frontend
npm install
npm start
```

# 🔐 Authentication Flow
Auth middleware (middleware/auth.js) validates JWT tokens.

Protected routes via Express middleware (routes/auth.js).

Context API handles frontend authentication state and route protection.

## 📸 Pages Overview
HomePage.jsx: Landing Page

Signin.jsx / Signup.jsx: User Authentication

Dashboard.jsx: Edit and Manage Portfolio

CustomizePage.jsx: Edit Portfolio Content

TemplateSelectionPage.jsx: Choose Portfolio Template

PreviewPage.jsx: Live Preview of Portfolio

Terms.jsx: Terms of Service

ForgotPassword.jsx: Password Recovery

🧪 Future Enhancements
Drag-and-drop Customization

Export Portfolio as PDF

Public Portfolio Link Sharing

Theme-based Templates

Admin Analytics Dashboard

# 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

# 📜 License
This project is licensed under the MIT License.

---
