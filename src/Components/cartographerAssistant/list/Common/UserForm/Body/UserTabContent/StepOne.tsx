import React from 'react';
import {Col, Form, Input, Label, Row} from "reactstrap";
import { useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {setFormValue} from "@/Redux/Reducers/UserSlice";


const StepOne = () => {

    const dispatch = useAppDispatch();
    const {formValue} = useAppSelector((state) => state.user);

    return (
        <Row className={'g-2'}>
            <Col xs={'12'}>
                <Row className={'mt-5'}>
                    <Col >
                        <Label className="col-form-label">{"Nom"}</Label>
                        <Input
                            className={formValue?.name !== "" ? "valid" : "is-invalid"}
                            type="text"
                            required
                            name="name"
                            value={formValue?.name || ""}
                            onChange={(e) => dispatch(setFormValue({name: 'name', value: e.target.value}))}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default StepOne