'use client';

import {FunctionComponent, useEffect, useState} from "react";

const cartographerAssistantDashboard = () => {
    
    const [MyAwesomeMap, setMyAwesomeMap] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if(typeof window !== 'undefined') {
                const newClient = (await import('@/Components/cartographerAssistant/cartographerAssistantHomePage')).default;
                setMyAwesomeMap(()=>newClient);
            }
        })();
    }, [])

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default cartographerAssistantDashboard;