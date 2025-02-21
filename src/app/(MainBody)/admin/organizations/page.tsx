"use client";

import {FunctionComponent, useEffect, useState} from "react";

const Organizations = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();
    useEffect(() => {
        (async () => {
            if(typeof window !== "undefined") {
                const newClient = (await import("@/Components/Admin/Organizations")).default;
                setClient(()=> newClient);
            }
        })();
    }, [])

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default Organizations;
