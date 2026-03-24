import { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { useAuthContext } from "../../context/AuthContext";
import useFetchItems from "../../hooks/useFetchItems";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useSearchParams } from "react-router-dom";

function Home() {

    const [searchParams] = useSearchParams()
    const sText = searchParams.get("searchText");

    const [text, setText] = useState(sText || '');
    const [searchedText, setSearchedText] = useState(sText || '');
    const [user, setUser] = useState(null);
    const {authUser} = useAuthContext();

    const [page, setPage] = useState(1);
    const lastElementRef = useRef(null);

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

            <ItemCard items={items} savedItemsIDs={user?.savedItems} ref={lastElementRef} loading={loading} />

            <Footer />
        </div>
    )
}

export default Home;