import { useAuthContext } from './context/AuthContext'
import { Navigate, Route, Routes } from 'react-router-dom'

import './App.css'

import Home from './pages/Home/Home'
import ItemPage from './pages/Item/ItemPage'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import CreatePostPage from './pages/Create/CreatePostPage'
import ProfilePage from './pages/Profile/ProfilePage'
import EditProfilePage from './pages/EditProfile/EditProfilePage'
import UserConversationsPage from './pages/Conversation/UserConversationsPage'
import ConvoMessagesPage from './pages/Conversation/ConvoMessagesPage'
import Classroom from './testing/classroom/Classroom'
import ClassroomDrive from './testing/classroom1/ClassroomDrive'


export const DEFAULT_AVATAR_URL = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

function App() {

  const {authUser} = useAuthContext();

  return (
    <Routes>

      <Route path='/signup' element={authUser ? <Navigate to={"/"} /> : <Signup /> } />
      <Route path='/login' element={authUser ? <Navigate to={"/"} /> : <Login /> } />

      <Route path='/' element={<Home />} />

      <Route path='/items/:id' element={<ItemPage />} />

      <Route path='/create' element={authUser ? <CreatePostPage /> : <Navigate to={"/signup"} />} />

      <Route path='/profile/:username' element={<ProfilePage />} />
      <Route path='/profile/edit' element={authUser ? <EditProfilePage /> : <Navigate to={"/signup"} />} />

      <Route path='/chat/inbox' element={authUser ? <UserConversationsPage /> : <Navigate to={"/signup"} />} />
      <Route path='/chat/conversation/:id' element={authUser ? <ConvoMessagesPage /> : <Navigate to={"/signup"} />} />

      <Route path='/classroom' element={<ClassroomDrive />} />
    </Routes>
  )
}

export default App
