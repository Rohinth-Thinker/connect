<div align="center">

# 🔗 DGVC Connect

**A college exclusive marketplace and collaboration platform — built for students, by a student.**

Buy, sell, chat, and share resources with your college community in real time.

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

</div>

---
<div align="center">
  <a href="https://connect-qfcj.onrender.com/">Visit Live App</a>
</div>

---

## 🌟 Key Highlights

- 🛒 **Campus Marketplace** — List, browse, search, and save items (books, notes, question papers) within your college
- 💬 **Real-Time Chat** — Instant messaging between buyers & sellers powered by Socket.IO
- 📂 **Classroom Drive** — Google Drive-like file manager with nested folders and Cloudinary-backed uploads
- 👤 **User Profiles** — Editable profiles with avatar uploads, bios, department info, and listing history
- 🔍 **Smart Search** — Full-text search across items, tags, and user profiles with infinite scroll
- 🔐 **JWT Authentication** — Secure cookie-based auth protecting all user actions

---

## 🧠 Problem & Solution

College students constantly need to exchange study materials, second-hand books, and resources — but there's no unified, trusted platform built specifically for campus communities.

**Connect** brings together a marketplace, real-time communication, and a shared file drive into a single app — eliminating scattered WhatsApp groups and notice boards with a purpose-built digital campus hub.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, React Router 7, Vite 7, TailwindCSS 4, DaisyUI 5, Lucide Icons |
| **Backend** | Node.js, Express 5, Socket.IO |
| **Database** | MongoDB Atlas, Mongoose 9 |
| **File Storage** | Cloudinary (image, PDF & video uploads) |
| **Auth** | JWT (JSON Web Tokens), HTTP-only cookies |
| **Dev Tools** | ESLint, Vite dev proxy, Hot Module Replacement |

---

## ⚡ Features

### 🛒 Marketplace
- Post items with title, price, category, condition, images, and tags
- Browse listings with paginated infinite scroll
- Search by keyword across titles, descriptions, and tags
- Save/bookmark items for later
- Mark items as sold

### 💬 Real-Time Messaging
- One-on-one conversations between users
- Live message delivery via WebSockets (Socket.IO)
- Scroll-to-load message history with pagination
- Auto-scroll on new messages, date separators, timestamps

### 📂 Classroom Drive
- Create nested folder structures (parent-referenced hierarchy)
- Upload any file type to Cloudinary with metadata stored in MongoDB
- In-app file preview modal (images, PDFs, videos)
- Recursive folder deletion with all child content
- Duplicate name detection at folder and file level

### 👤 Profiles & Auth
- Sign up with username, roll number, and college info
- Edit profile: bio, department, avatar (image upload)
- View any user's profile, listings, and saved items
- Secure logout with cookie invalidation

---

## 📸 UI Preview

> Screenshots coming soon — run locally to explore the full experience.

| Marketplace Feed | Real-Time Chat | Classroom Drive |
|---|---|---|
| _Item cards with search_ | _Live messaging UI_ | _Folder & file grid_ |

---

## 🧪 How to Run Locally

### Prerequisites
- **Node.js** ≥ 18
- **MongoDB Atlas** URI (or local MongoDB)
- **Cloudinary** account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/Rohinth-Thinker/connect.git
cd connect
```

### 2. Setup environment variables

Create `backend/.env`:

```env
PORT_NUM=3000
DB_URI=your_mongodb_connection_string
TOKEN_SECRET_KEY=your_jwt_secret_key
```

Optionally set Cloudinary config in frontend environment:

```env
VITE_CLOUD_NAME=your_cloud_name
VITE_UPLOAD_PRESET=your_upload_preset
```

### 3. Install dependencies

```bash
# Root dependencies (backend)
npm install

# Frontend dependencies
cd frontend && npm install && cd ..
```

### 4. Run development servers

```bash
# Terminal 1 — Backend
npm start

# Terminal 2 — Frontend
cd frontend && npm run dev
```

The app will be available at `http://localhost:5173` with API proxy to port `3000`.

---

## 📁 Project Structure

```
connect/
├── backend/
│   ├── controllers/        # Auth, Chat, Item, Profile controllers
│   ├── db/
│   │   ├── models/         # User, Item, Conversation, Message schemas
│   │   ├── database.js     # MongoDB connection
│   │   └── dbFunction.js   # All database query functions
│   ├── classroom/
│   │   ├── controllers/    # Drive (folder/file CRUD)
│   │   ├── models/         # Folder & File schemas
│   │   └── routes/         # Drive API routes
│   ├── routes/             # API route definitions
│   ├── socket/             # Socket.IO server setup
│   ├── utils/              # JWT, cookies, input validation
│   └── server.js           # Express app entry point
│
├── frontend/
│   └── src/
│       ├── pages/          # Home, Auth, Profile, Item, Chat, Classroom
│       ├── context/        # AuthContext, SocketContext (React Context API)
│       ├── hooks/          # useFetchItems, useIntersectionObserver, useLogin, useSignup
│       ├── components/     # Reusable Loading & NotFound components
│       └── utils/          # Timestamp formatting helpers
│
└── package.json            # Root scripts (start, build)
```

---

## 📈 What This Project Demonstrates

- **Full-stack architecture** — Complete MERN app with RESTful API design
- **Real-time systems** — WebSocket integration for live chat using Socket.IO
- **Cloud file management** — Cloudinary + MongoDB for a Drive-like experience
- **Authentication patterns** — JWT generation, cookie management, route protection
- **Scalable data access** — Pagination, infinite scroll, cursor-based message loading
- **Component-driven UI** — Modular React architecture with Context API for global state

---

## 🔮 Future Improvements

- 🔒 Password hashing with bcrypt
- 📱 Progressive Web App (PWA) support for mobile
- 🔔 Push notifications for new messages and listing updates
- 🏫 Multi-college support with college-scoped feeds
- 🗃️ Cloudinary cleanup on file/folder deletion

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">

**Built with ❤️ by [Rohinth](https://github.com/Rohinth-Thinker)**

⭐ Star this repo if you found it useful!

</div>
