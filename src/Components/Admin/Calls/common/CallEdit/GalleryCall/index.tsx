import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {fetchCallById} from "@/Redux/Reducers/CallSlice";


const GalleryCall = () => {

    const {selectedCall} = useAppSelector(state => state.call);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(selectedCall){
            dispatch(fetchCallById(selectedCall.id));
        }
    }, [])

    return (
        <div>

        </div>
    )
}

export default GalleryCall;