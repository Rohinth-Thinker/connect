import { useRef, useState } from "react"
import ItemCard from "../../Home/components/ItemCard"
import useFetchItems from "../../../hooks/useFetchItems";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

function SavedItemsList() {

    const [page, setPage] = useState(1);
    const lastElementRef = useRef(null);

    let fetchUrl = `/api/profile/savedItems?page=${page}&limit=5`;
    const [items, hasMore, loading] = useFetchItems(fetchUrl, [], [page], resetPageNumber);
    useIntersectionObserver(lastElementRef.current, hasMore, incrementPageNumber, loading);

    function resetPageNumber() {
        setPage(1);
    }

    function incrementPageNumber() {
        setPage((p) => p + 1);
        console.log(hasMore, page)
    }

    return (
        <>
            <ItemCard items={items} loading={loading} ref={lastElementRef} />
        </>
    )
}

export default SavedItemsList