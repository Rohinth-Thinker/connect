import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

import Footer from "./components/Footer";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";

import useFetchItems from "../../hooks/useFetchItems";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import NotFoundComponent from "../../comoponets/NotFoundComponent";

function Home() {
    
    const [user, setUser] = useState(null);
    const {authUser} = useAuthContext();
    
    const [page, setPage] = useState(1);
    const lastElementRef = useRef(null);

    const [searchParams] = useSearchParams()
    const sText = searchParams.get("searchText");
    const [searchedText, setSearchedText] = useState(sText || '');

    const [profileLoading, setProfileLoading] = useState(false);

    let fetchUrl = `/api/items?q=${searchedText}&page=${page}&limit=5`;
    const [items, hasMore, loading] = useFetchItems(fetchUrl, [searchedText], [searchedText, page], resetPageNumber);
    useIntersectionObserver(lastElementRef.current, hasMore, incrementPageNumber, loading);

    function resetPageNumber() {
        setPage(1);
    }

    function incrementPageNumber() {
        setPage((p) => p + 1);
        console.log(hasMore, page)
    }

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                setProfileLoading(true);

                const response = await fetch(`/api/profile/${authUser.username}`);
                const result = await response.json();
                if (!response.ok) {
                    console.log(result.error);
                    return;
                }
            
                setUser(result);
            } catch(err) {
                console.error("Fetch failed:", err);
            } finally {
                setProfileLoading(false);
            }
        }
        
        if (authUser?.userID) fetchUserProfile();

      }, [authUser?.userID])

    function handleSubmit(e) {
        e.preventDefault();
        const text = e.target.elements[0].value;
        setSearchedText(text);
    }

    return (
        <div className="home-container mb-30">
            <Navbar avatar={user?.avatar} loading={profileLoading} >
                <div className="w-full pl-5 mb-5">
                    <div className="max-w-150 m-auto">
                        <Searchbar handleSubmit={handleSubmit} />
                    </div>
                </div>
            </Navbar>
             <div className="max-w-250 m-auto">
                {!loading && items.length <= 0 ?
                    <NotFoundComponent title="No Items Posted Yet" description="Start posting now" />
                    :
                    <ItemCard items={items} savedItemsIDs={user?.savedItems} ref={lastElementRef} loading={loading} />
                }
            </div>   

            <Footer />
        </div>
    )
}

export default Home;