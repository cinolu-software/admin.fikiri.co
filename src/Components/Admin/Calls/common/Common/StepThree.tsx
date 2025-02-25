import React, { useEffect } from "react";
import { Col, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
// import { setNewFormValue } from "@/Redux/Reducers/projectSlice/projectSlice";
// import {fetchProjectType} from "@/Redux/Reducers/projectSlice/projectTypeSlice";
// import {StepPropsType} from "@/Types/Projects/ProjectType";
// import {TransformedProjectTypeType} from "@/Types/Projects/ProjectTypeType";
import {StepPropsType} from "@/Types/Call/CallType";
import {activitySelect, activityStepThreeType, activityStepThreeDescription} from "@/Constant";

const StepThree: React.FC<StepPropsType> = ({ data }) => {
    const dispatch = useAppDispatch();
    const { } = useAppSelector(state => state.call);


    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        {activitySelect} <span className="txt-primary">{activityStepThreeType}</span>
                    </h5>
                    <p className="text-muted mb-2">
                        {activityStepThreeDescription}
                    </p>
                </div>
                <div className="variation-box">

                </div>
            </section>
        </Col>
    );
};

export default StepThree;