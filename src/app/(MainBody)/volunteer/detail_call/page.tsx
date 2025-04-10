"use client";

import {FunctionComponent, useEffect, useState} from "react";

const DetailCall = () => {

    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if(typeof window !== "undefined") {
                const newClient = (await import("@/Components/volunteer/common/CallDetail")).default;
                setClient(()=> newClient);
            }
        })();
    }, [])

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default DetailCall;