import React, { ChangeEvent } from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";
import {StepPropsType} from "@/Types/Call/CallType";
import {setAddFormValue} from "@/Redux/Reducers/CallSlice";
import { useAppDispatch } from "@/Redux/Hooks";
import { activityAudience, callDescription, callName, activityPrise, activityTown, activityObjectif} from "@/Constant";

const StepOne: React.FC<StepPropsType> = ({ data }) => {

    const { name, description } = data;

    const dispatch = useAppDispatch();

    const handleChange = (field: keyof typeof data) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setAddFormValue({ field, value: event.target.value }));
    };

    return (
        <Form className="theme-form theme-form-2 mega-form">
            <Row className="g-2 mx-5">
                <Col xs="12">
                    <Label className="col-form-label">{callName}</Label>
                    <Input
                        className={name !== "" ? "valid" : "is-invalid"}
                        type="text"
                        required
                        name="name"
                        value={name}
                        onChange={handleChange("name")}
                    />
                </Col>

                <Col xs="12">
                    <Label className="col-form-label">{callDescription}</Label>
                    <textarea
                        rows={5}
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={handleChange("description")}
                    />
                </Col>

            </Row>
        </Form>
    );
};

export default StepOne;
