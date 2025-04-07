'use client';

import {FunctionComponent, useEffect, useState} from "react";

const VoluntaryCartographerHomePage = () => {
    const [MyAwesomeMap, setMyAwesomeMap] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if(typeof window !== 'undefined') {
                const newClient = (await import('@/Components/voluntaryCartographer')).default;
                setMyAwesomeMap(()=>newClient);
            }
        })();
    }, [])

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default VoluntaryCartographerHomePage;