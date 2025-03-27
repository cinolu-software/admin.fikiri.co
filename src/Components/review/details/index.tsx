import React from "react";
import { useAppSelector } from "@/Redux/Hooks";

const DetailsReview = () => {
    const { selectedSolution } = useAppSelector((state) => state.reviewer);

    console.log("selectedSolution===>|",selectedSolution)
    
    return (
        <div>
            <h1>Details Review</h1>
        </div>
    )
}

export default DetailsReview