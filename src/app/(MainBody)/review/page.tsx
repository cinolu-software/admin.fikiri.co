"use client";


import {FunctionComponent, useEffect, useState} from "react";

const Review = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();
    useEffect(() => {
        (async () => {
            if(typeof window !== "undefined") {
                const newClient = (await import("@/Components/review")).default;
                setClient(()=> newClient);
            }
        })();
    }, [])

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default Review;