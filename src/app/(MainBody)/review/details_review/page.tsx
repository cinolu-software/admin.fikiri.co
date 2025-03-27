"use client";

import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/Redux/Hooks";
import {FunctionComponent, useEffect, useState} from "react";
import { setToken } from "@/Redux/Reducers/ReviewerSlice";

const DetailsReview = () => {

    const searchParams = useSearchParams();
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();
    const token = searchParams.get("token");
    const dispatch = useAppDispatch();

    useEffect(() => {

        if(token) dispatch(setToken({token}));

        (async () => {
            if(typeof window !== "undefined") {
                const newClient = (await import("@/Components/review/details")).default;
                setClient(()=> newClient);
            }
        })();
        
    }, [token])

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default DetailsReview;