'use client';

import {FunctionComponent, useEffect, useState} from "react";

const VolunteerList = () => {
    const [MyAwesomeMap, setMyAwesomeMap] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if(typeof window !== 'undefined') {
                const newClient = (await import("@/Components/Cartograph/CartographVolonteerList")).default;
                setMyAwesomeMap(()=>newClient);
            }
        })();
    }, [])

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default VolunteerList;