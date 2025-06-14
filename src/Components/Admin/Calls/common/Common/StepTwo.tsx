import React, { useState } from "react";
import { Col, Form, Label, Row, InputGroup, Card, CardBody } from "reactstrap";
import { useAppDispatch } from "@/Redux/Hooks";
import Calendar from "react-calendar";
import {setAddFormValue} from "@/Redux/Reducers/CallSlice";
// @ts-ignore
import { Value } from "react-calendar/dist/cjs/shared/types";
import {StepPropsType} from "@/Types/Call/CallType";
import { activityStartDate, activityEndDate } from "@/Constant";
import { parseISO, format } from 'date-fns';

const StepTwo: React.FC<StepPropsType> = ({ data }) => {

    const dispatch = useAppDispatch();

    const [startDate, setStartDate] = useState<Date | null>(
        data?.started_at ? parseISO(data.started_at) : null
    );

    const [endDate, setEndDate] = useState<Date | null>(
        data?.ended_at ? parseISO(data.ended_at) : null
    );

    const handleStartDateChange = (value: Value) => {
        if (value instanceof Date) {
            setStartDate(value);
            const formattedDate = format(value, 'yyyy-MM-dd');
            dispatch(setAddFormValue({ field: "started_at", value: formattedDate }));
        }
    };

    const handleEndDateChange = (value: Value) => {
        if (value instanceof Date) {
            setEndDate(value);
            const formattedDate = format(value, 'yyyy-MM-dd');
            dispatch(setAddFormValue({ field: "ended_at", value: formattedDate }));
        }
    };

    return (
        <div className="sidebar-body">
            <Form>
                <Row className="g-2">
                    <Col xs="12">
                        <Label className="m-0" check>
                            {activityStartDate} <span className="txt-danger"> *</span>
                        </Label>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody className="card-wrapper">
                                <InputGroup className="main-inline-calender">
                                    <Calendar
                                        onChange={handleStartDateChange}
                                        value={startDate}
                                        className="w-100"
                                    />
                                </InputGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12">
                        <Label className="m-0" check>
                            {activityEndDate} <span className="txt-danger"> *</span>
                        </Label>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody className="card-wrapper">
                                <InputGroup className="main-inline-calender">
                                    <Calendar
                                        onChange={handleEndDateChange}
                                        value={endDate}
                                        className="w-100"
                                    />
                                </InputGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default StepTwo;
