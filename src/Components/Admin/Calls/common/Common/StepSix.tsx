import React, { useEffect, useMemo } from "react";
import { Col, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setNewFormValue} from "@/Redux/Reducers/projectSlice/projectSlice";
import {fetchProgram} from "@/Redux/Reducers/programSlice/programSlice";
import {activityStepTwoDescription, activitySelect, activityStepTwoClique, activityStepTwoLoadingProgram} from "@/Constant";


const StepSix = () => {

    const dispatch = useAppDispatch();
    const {transformedPrograms, status} = useAppSelector(state=>state.program);
    const {formValue} = useAppSelector(state=>state.project);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProgram());
        }
    }, [dispatch, status]);

    const handleProgramChange = (programId: string) => {
        if(!formValue) return;
        const updatedProgram = formValue.program.includes(programId)
        ? formValue.program.filter((id: string) => id !== programId)
            : [...formValue.program, programId];
        dispatch(setNewFormValue({ field: 'program', value: updatedProgram }));
    };

    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        {activitySelect} <span className="txt-primary">{activityStepTwoDescription}</span>
                    </h5>
                    <p className="text-muted mb-2">
                        {activityStepTwoClique}
                    </p>
                </div>
                <div className="variation-box">
                    {
                        transformedPrograms.map(program => (
                            <div className="selection-box" key={program.id}>
                                <Input
                                    id={`program${program.id}`}
                                    type="checkbox"
                                    checked={formValue?.program.includes(program.id)}
                                    onChange={() => handleProgramChange(program.id)}
                                />
                                <div className="custom--mega-checkbox">
                                    <ul>
                                        <li>{program.name}</li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </Col>
    );
};


export default StepSix;