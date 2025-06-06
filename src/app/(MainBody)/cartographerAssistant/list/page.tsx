'use client';

import {FunctionComponent, useEffect, useState} from "react";

const cartographerAssistantList = () => {
    
    const [MyAwesomeMap, setMyAwesomeMap] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if(typeof window !== 'undefined') {
                const newClient = (await import('@/Components/cartographerAssistant/list')).default;
                setMyAwesomeMap(()=>newClient);
            }
        })();
    }, [])

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default cartographerAssistantList;