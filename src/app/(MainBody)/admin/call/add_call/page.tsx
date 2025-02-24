"use client";


import {FunctionComponent, useEffect, useState} from "react";

const AddCall = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();
    useEffect(() => {
        (async () => {
            if(typeof window !== "undefined") {
                const newClient = (await import("@/Components/Admin/Calls/common/AddCall")).default;
                setClient(()=> newClient);
            }
        })();
    }, [])

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default AddCall;