import { useEffect } from "react";

function useIntersectionObserver(lastElementRef, hasMore, incrementPageNumber, loading) {
    useEffect(() => {
        if (!lastElementRef) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (hasMore && !loading) {
                    incrementPageNumber();
                    // setPage('called');
                    // setPage((p) => p + 1);
                }
            }
        }, {threshold: 0.5})

        observer.observe(lastElementRef);

        return () => {
            observer.disconnect();
        }
    }, [hasMore, lastElementRef, loading])
}

export default useIntersectionObserver;