import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useInfiniteScroll = (fetchMore) => {
    const [ref, inView] = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            fetchMore();
        }
    }, [inView, fetchMore]);

    return [ref];
};

export default useInfiniteScroll;