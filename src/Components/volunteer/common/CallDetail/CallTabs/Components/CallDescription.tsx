import React from 'react';
import {CallSelected} from "@/Types/Call/CallType";
import {FileText} from "react-feather";
import {Row, Col,} from "reactstrap";


const CallRequirement: React.FC<CallSelected> = ({selectedCall}) => {

    return (
        <Row className="">
            <Col lg="12" className="mb-4">
                <div className="border-0 ">
                    <div className="p-3">
                        <div className="mb-3 d-flex align-items-center gap-2  fw-semibold">
                            <FileText size={20} />
                            {"Description de l'appel"}
                        </div>
                        <div className="text-muted fs-6">
                            {selectedCall.description}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default CallRequirement;