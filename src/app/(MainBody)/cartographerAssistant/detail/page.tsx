'use client';

import {FunctionComponent, useEffect, useState} from "react";

const cartographerAssistantDetail = () => {
    
    const [MyAwesomeMap, setMyAwesomeMap] = useState<FunctionComponent>();

    useEffect(

        () => {
            (
                async () => {
                    if(typeof window !== 'undefined') {
                        const newClient = (await import('@/Components/cartographerAssistant/detail')).default;
                        setMyAwesomeMap(()=>newClient);
                    }
                }
            )();
        }, []
    )

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default cartographerAssistantDetail;