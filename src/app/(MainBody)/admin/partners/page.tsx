'use client';

import React, {FunctionComponent, useEffect, useState} from 'react';

export default function Home() {

    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof navigator !== "undefined") {
                const newClient = (await import("@/Components/Admin/Partners")).default;
                setClient(() => newClient);
            }
        })();
    }, []);
    
    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}