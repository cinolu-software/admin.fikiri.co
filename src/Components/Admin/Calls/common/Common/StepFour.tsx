import React, { useEffect } from "react";
import { Col, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
// import { setNewFormValue } from "@/Redux/Reducers/projectSlice/projectSlice";
// import { fetchCategory } from "@/Redux/Reducers/projectSlice/ProjectCategory";
// import {StepPropsType} from "@/Types/Projects/ProjectType";
import {StepPropsType} from "@/Types/Call/CallType";
import {activitySelect} from "@/Constant";
import {activityStepFourCategory, activityStepFourDescription} from "@/Constant";

const StepFour: React.FC<StepPropsType> = ({ data }) => {

    const dispatch = useAppDispatch();
    const { } = useAppSelector((state) => state.call);


    return (
        <div className="sidebar-body">

        </div>
    );
};


export default StepFour;