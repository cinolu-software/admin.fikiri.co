import React from "react";
import { CallSelected} from "@/Types/Call/CallType";
import {CardTitle, CardText, Row, Col} from 'reactstrap';
import {imageBaseUrl} from "@/Services/axios";
import {ImagePath} from "@/Constant";
import {Calendar} from "react-feather";

const CallCardCover : React.FC<CallSelected> = ({selectedCall}) => {

    return (
        <Row className={'mb-3'}>
            <Col lg="12">
                <div className="shadow-sm border-0 mb-3">
                    <div className="p-3">
                        <Row className="align-items-center">
                            <Col md="2">
                                <img
                                    src={
                                        selectedCall?.cover
                                            ? `${imageBaseUrl}/calls/covers/${selectedCall.cover}`
                                            : `${ImagePath}/calls/call.jpg`
                                    }
                                    alt={"Cover"}
                                    className={"img-fluid rounded"}
                                    style={{maxHeight: '120px', objectFit: 'cover'}}
                                />
                            </Col>
                            <Col md="10">
                                <CardTitle
                                    tag="h4"
                                    className="mb-2 d-flex align-items-center gap-2"
                                >
                                    {selectedCall.name}
                                </CardTitle>
                                <CardText className="text-muted d-flex align-items-center gap-2">
                                    <Calendar size={16} />
                                    Période :{' '}
                                    {new Date(selectedCall.created_at).toLocaleDateString()} -{' '}
                                    {new Date(selectedCall.ended_at).toLocaleDateString()}
                                </CardText>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    )

}

export default CallCardCover;