import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {Col} from "reactstrap";

const CardSkeleton = () => {
    return (
            <Skeleton height={135} borderRadius={15} />
    )
};

export default CardSkeleton;
