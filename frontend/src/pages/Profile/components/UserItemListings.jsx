import { useRef, useState } from "react"
import ItemCard from "../../Home/components/ItemCard"
import useFetchItems from "../../../hooks/useFetchItems";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import NotFoundComponent from "../../../comoponets/NotFoundComponent";

function UserItemListings({ userID }) {

    const {authUser} = useAuthContext();
    const [user, setUser] = useState(null);
    const [page, setPage] = useState(1);
    const lastElementRef = useRef(null);

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
    }, [authUser]
)

    let fetchUrl = `/api/profile/user/${userID}/item/listings?page=${page}&limit=5`;
    const [items, hasMore, loading] = useFetchItems(fetchUrl, [userID], [page, userID], resetPageNumber);
    useIntersectionObserver(lastElementRef.current, hasMore, incrementPageNumber, loading);

    function resetPageNumber() {
        setPage(1);
    }

    function incrementPageNumber() {
        setPage((p) => p + 1);
        console.log(hasMore, page)
    }

    if (!loading && items.length <= 0) {
        return <NotFoundComponent title="No Items Posted Yet" description="Start posting now." />
    }

    return (
        <>
            <ItemCard items={items} loading={loading} savedItemsIDs={user?.savedItems} ref={lastElementRef} />
        </>
    )
}

export default UserItemListings;