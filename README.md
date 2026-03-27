# DGVC Connect

DGVC Connect is a college-exclusive marketplace platform that enables students to securely buy and sell books, notes, and other academic-related items within their campus. Featuring authentication with ID card verification to ensure only genuine students can access the system, it also includes real-time messaging for direct communication between buyers and sellers, creating a trusted, structured, and student-focused ecosystem.

## 🔗 Links

- **Live Demo**: [https://connect-qfcj.onrender.com](https://connect-qfcj.onrender.com)
- **GitHub Repository**: [https://github.com/Rohinth-Thinker/connect](https://github.com/Rohinth-Thinker/connect)


## 🚀 Features

- **College-Exclusive Access**: Restricted to verified students via ID card verification.
- **Academic Marketplace**: Securely buy and sell books, notes, and academic materials.
- **Real-time Messaging**: Instant direct communication between buyers and sellers using Socket.IO.
- **Secure Authentication**: JWT-based login/signup system with secure cookie-based session management.
- **Item Listings**: Easily create, upload, and manage listings for academic items.
- **Search & Filter**: Search for specific items and filter products across the marketplace.
- **Saved Items**: Bookmark and save items for future reference.
- **Profile Management**: Customizable user profiles with avatar updates.

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** & **DaisyUI**
- **Lucide React** (Icons)
- **Socket.io-client**
- **React Router DOM**

### Backend
- **Node.js** & **Express**
- **MongoDB** (Mongoose)
- **Socket.IO** (Real-time events)
- **JSON Web Token (JWT)** (Authentication)
- **Cookie-parser**

### Storage & Tools
- **Cloudinary Storage** (Image hosting)
- **ESLint** (Linting)

## 📂 Folder Structure

```text
connect/
├── backend/            # Express server and logic
│   ├── controllers/    # Route handlers
│   ├── db/             # Database connection and functions
│   ├── routes/         # API endpoint definitions
│   ├── socket/         # Socket.IO configuration
│   ├── utils/          # Middleware and utility functions
│   └── server.js       # Entry point for backend
├── frontend/           # Vite-React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application pages
│   │   └── ...
│   ├── public/         # Static assets
│   ├── index.html      # Main HTML file
│   └── package.json    # Frontend dependencies
├── package.json        # Root dependencies and scripts
└── README.md           # Project documentation
```

## ⚙️ Installation Steps

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd connect
```

### 2. Install Dependencies
Install root and frontend dependencies:
```bash
npm install
cd frontend && npm install
cd ..
```

### 3. Environment Configuration
Create a `.env` file in the `backend/` directory and add the following:
```env
PORT_NUM=5000
DB_URI=your_mongodb_connection_string
TOKEN_SECRET_KEY=your_jwt_secret_key
# Add Cloudinary credentials if used in backend
```

*Note: For frontend environment variables (like Cloudinary keys), create a `.env` in the `frontend/` directory.*

### 4. Run the Application

**Start Backend:**
```bash
npm start
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new student
- `POST /api/auth/login` - Student login
- `GET /api/auth/logout` - Logout and clear session
- `GET /api/auth/health` - Check API health status

### Items
- `GET /api/items/` - Fetch all items (with pagination/search)
- `GET /api/items/:id` - Get details of a single item
- `POST /api/items/item/upload` - Upload a new item listing (Auth required)
- `PATCH /api/items/isSold/update` - Mark an item as sold (Auth required)

### Profile
- `GET /api/profile/:username` - Get user profile details
- `PATCH /api/profile/edit` - Update profile information (Auth required)
- `PATCH /api/profile/avatar/update` - Update profile picture (Auth required)
- `GET /api/profile/savedItems` - Get list of saved items (Auth required)

### Chat
- `GET /api/chat/conversation/all` - Fetch all user conversations (Auth required)
- `GET /api/chat/conversation/:id` - Get messages for a conversation (Auth required)
- `POST /api/chat/message/add` - Send a new message (Auth required)

## 📸 Screenshots
*(Placeholders for future UI screenshots)*
- **Home Page**: `![Home Page](path/to/screenshot1.png)`
- **Marketplace**: `![Marketplace](path/to/screenshot2.png)`
- **Chat Interface**: `![Chat](path/to/screenshot3.png)`

## 🔮 Future Improvements
- [ ] Integration of a rating system for buyers and sellers.
- [ ] Push notifications for new messages and item updates.
- [ ] Advanced category-based recommendation engine.
- [ ] Mobile application version using React Native.

## 👥 Author / Credits
- Developed by **[Your Name/Team Name]**
- Special thanks to **DGVC** for the platform concept.
