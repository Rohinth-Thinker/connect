import { useParams } from "react-router-dom";
import Footer from "../Home/components/Footer";
import Navbar from "../Home/components/Navbar";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

function ProfilePage() {

    const [user, setUser] = useState(null);
    const {username} = useParams();
    const {authUser} = useAuthContext();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        async function fetchUserProfile() {
          setLoading(true);
          const response = await fetch(`/api/profile/${username}`);
          const result = await response.json();
          setLoading(false);
          
          if (!response.ok) {
            console.log(result.error);
            return;
          }
    
          console.log(result);
          setUser(result);
        }
    
        if (username) fetchUserProfile();
      }, [username])

    const avatar = user?.avatar || null;

    return (
        <>
            <Navbar />

            <Profile isOwner={authUser?.userID === user?._id} user={user} loading={loading} />

            <Footer />
        </>
    )
}

export default ProfilePage;