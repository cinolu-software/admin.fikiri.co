'use client';

import {FunctionComponent, useEffect, useState} from "react";

const ProfilePage = () => {
    const [MyAwesomeMap, setMyAwesomeMap] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if(typeof window !== 'undefined') {
                const newClient = (await import('@/Components/Common/Profile')).default;
                setMyAwesomeMap(()=>newClient);
            }
        })();
    }, [])

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default ProfilePage;