import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";



const Review = () => {

    const { token } = useAppSelector((state) => state.reviewer);
    const dispatch = useAppDispatch();

    

    return (
        <div>
            <h1>Review</h1>
        </div>
    )
}

export default Review;