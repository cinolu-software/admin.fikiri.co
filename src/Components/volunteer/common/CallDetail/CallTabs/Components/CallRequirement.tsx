import React from 'react';
import {CallSelected} from "@/Types/Call/CallType";
import { Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import { Target } from 'react-feather';


const CallRequirement: React.FC<CallSelected> = ({selectedCall}) => {

    return (
        <Row className="">
            <Col lg="12" className="mb-4">
                <div className=" border-0 ">
                    <div className="p-3">
                        <div
                            className="mb-3 d-flex align-items-center gap-2 fw-semibold"
                        >
                            <Target size={20} />
                            Exigences
                        </div>
                        <ListGroup flush>
                            {selectedCall.requirements?.length > 0 ? (
                                selectedCall.requirements.map((req, index) => (
                                    <ListGroupItem
                                        key={index}
                                        className="border-0 ps-0 pe-0 py-2"
                                    >
                                        <div className="d-flex align-items-start gap-2">
                                            <span className="fw-bold text-dark">{req.name} :</span>
                                            <span className="text-muted">{req.description}</span>
                                        </div>
                                    </ListGroupItem>
                                ))
                            ) : (
                                <p className="text-muted">
                                    Aucune exigence spécifique pour cet appel.
                                </p>
                            )}
                        </ListGroup>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default CallRequirement;