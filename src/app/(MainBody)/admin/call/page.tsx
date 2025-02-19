"use client";
import {FunctionComponent, useEffect, useState} from "react";

const Call = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();
    useEffect(() => {
        (async () => {
            if(typeof window !== "undefined") {
                const newClient = (await import("@/Components/Admin/Calls")).default;
                setClient(()=> newClient);
            }
        })();
    }, [])

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default Call;

