import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { useAuthContext } from "../../context/AuthContext";

function Home() {

    const [text, setText] = useState('');
    const [searchedText, setSearchedText] = useState('');
    const [user, setUser] = useState(null);
    const {authUser} = useAuthContext();

    useEffect(() => {
        async function fetchUserProfile() {
          const response = await fetch(`/api/profile/${authUser.username}`);
          const result = await response.json();
          if (!response.ok) {
            console.log(result.error);
            return;
          }
    
          console.log(result);
          setUser(result);
        }
    
        if (authUser) fetchUserProfile();
      }, [authUser])

    function handleTextChange(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSearchedText(text);
    }

    return (
        <div className="home-container mb-30">
            <Navbar avatar={user?.avatar}>
                <div className="w-full pl-5 mb-5">
                    <Searchbar text={text} handleTextChange={handleTextChange} handleSubmit={handleSubmit} />
                </div>
            </Navbar>

            <ItemCard query={searchedText} savedItems={user?.savedItems} />

            <Footer />
        </div>
    )
}

export default Home;