import { Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/Home/Home'
import ItemPage from './pages/Item/ItemPage'
import Navbar from './pages/Home/components/Navbar'
import Footer from './pages/Home/components/Footer'

import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import { useAuthContext } from './context/AuthContext'
import CreatePostPage from './pages/Create/CreatePostPage'
import ProfilePage from './pages/Profile/ProfilePage'
import EditProfilePage from './pages/EditProfile/EditProfilePage'
import MessagesPage from './pages/Message/MessagePage'
import Test from './pages/Message/Test'


function App() {

  const {authUser} = useAuthContext();

  return (
    <Routes>
      <Route path='/signup' element={authUser ? <Navigate to={"/"} /> : <Signup /> } />
      <Route path='/login' element={authUser ? <Navigate to={"/"} /> : <Login /> } />

      <Route path='/' element={<Home />} />

      <Route path='/items/:id' element={<ItemPage />} />

      <Route path='/create' element={<CreatePostPage />} />

      <Route path='/profile/:username' element={<ProfilePage />} />

      <Route path='/profile/edit' element={authUser ? <EditProfilePage /> : <Navigate to={"/signup"} />} />

      <Route path='/chat/inbox' element={<MessagesPage />} />
      <Route path='/chat/conversation/:id' element={<Test />} />

      {/* <Home /> */}

      {/* <Item /> */}

      {/* <Navbar />
      <ItemPage />
      <Footer /> */}

      {/* <Navbar />
      <CreatePost /> */}

      {/* <Navbar />
      <ProfilePage />
      <Footer /> */}

      {/* <Signup_test4 /> */}

      {/* <Login_test1 /> */}
    </Routes>
  )
}

export default App
