import React from "react";
import {StepperHorizontalPropsType} from "@/Types/Projects/ProjectType";


const StepperHorizontal: React.FC<StepperHorizontalPropsType> = ({ level }) => {
    const StepperHorizontalData = [
        "Informations de base",
        "Web Site",
        "Partenariat",
        "Finalisation"
    ];

    return (
        <div className="stepper-horizontal theme-scrollbar">
            {StepperHorizontalData.map((data, index) => (
                <div key={index} className={`stepper-one stepper step ${level > index + 1 ? "done active " : ""}`}>
                    <div className="step-circle"><span>{index + 1}</span></div>
                    <div className="step-title">{data}</div>
                    <div className="step-bar-left" />
                    <div className="step-bar-right" />
                </div>
            ))}
        </div>
    );
};

export default StepperHorizontal;