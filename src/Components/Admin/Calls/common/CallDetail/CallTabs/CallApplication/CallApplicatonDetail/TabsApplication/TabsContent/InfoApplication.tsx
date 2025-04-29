import React from "react";
import {useAppSelector} from "@/Redux/Hooks";
import {Card, CardBody, Row, Col, Badge} from "reactstrap";
import {safeFormatDate} from "@/utils";

const InfoApplication = () => {

    const {selectedApplication} = useAppSelector(state => state.application);

    if (!selectedApplication) return null;


    return (
        <Card className="shadow-sm">
        <CardBody>
            <h4 className="mb-4 text-success">Détails de la soumission</h4>
            <Row>
                {Object.entries(selectedApplication?.responses).map(([key, value], index) => (
                    <Col md={12} key={index} className="mb-3">
                        <Badge color="info" className="mb-2">{key}</Badge>
                        <div
                            style={{
                                backgroundColor: "#f8f9fa",
                                padding: "15px",
                                borderRadius: "5px",
                                border: "1px solid #dee2e6",
                                whiteSpace: "pre-line",
                                minHeight: "40px"
                            }}
                        >
                            {value || "Non fourni"}
                        </div>
                    </Col>
                ))}
                <Col md={12}>
                    <p className="mt-4"><strong>Date de soumission :</strong> {safeFormatDate(selectedApplication?.created_at)}</p>
                </Col>
            </Row>
        </CardBody>
    </Card>
    )
}
export default InfoApplication;