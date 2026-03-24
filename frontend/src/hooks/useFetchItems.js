import { useEffect, useState } from "react";

function useFetchItems(fetchUrl, resetDependencies, fetchDependencies, resetPageNumber) {

    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setItems([]);
        // setPage(1);
        resetPageNumber();
        setHasMore(false);
    }, resetDependencies)

    useEffect(() => {
        const controller = new AbortController();

        async function fetchItems() {
            try {
                setLoading(true);

                const response = await fetch(fetchUrl, {
                    signal: controller.signal,
                });
                const result = await response.json();

                if(!response.ok) {
                    return;
                }

                console.log(result.items);
                setItems((prev) => [...prev, ...result.items]);
                setHasMore(result.hasMore);
            } catch(err) {}
            finally {
                setLoading(false);
            }
        }

        fetchItems();

        return () => controller.abort();

    }, fetchDependencies)

    return [items, hasMore, loading];

    
}

export default useFetchItems;