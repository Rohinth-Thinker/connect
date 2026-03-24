import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

import Footer from "../Home/components/Footer";
import Navbar from "../Home/components/Navbar";
import Searchbar from "../Home/components/Searchbar";
import Item from "./components/Item";

function ItemPage() {

    const [user, setUser] = useState(null);
    const {authUser} = useAuthContext();
    const { id } = useParams();
    const navigate = useNavigate();

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

    function handleSubmit(e) {
        e.preventDefault();
        const searchedText = e.target.elements[0].value;
        navigate(`/?searchText=${searchedText}`)
    }

    // if (!user) return;

    const isSaved = user?.savedItems.includes(id);

    return (
        <>
            <Navbar>
                <div className="w-full pl-5 mb-5">
                    <div className="max-w-150 m-auto">
                        <Searchbar handleSubmit={handleSubmit} />
                    </div>
                </div>
            </Navbar>

            <Item id={id} savedState={isSaved} />

            <Footer />
        </>
    )
}

export default ItemPage;