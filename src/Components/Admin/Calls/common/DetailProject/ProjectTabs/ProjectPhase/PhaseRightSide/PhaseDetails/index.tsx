import React from "react";
import { TabPane, Badge, Row, Col } from "reactstrap";
import { useAppSelector } from "@/Redux/Hooks";

const PhaseDetails: React.FC<{ navId: string }> = ({ navId }) => {

    const { projectData } = useAppSelector((state) => state.project);

    // @ts-ignore
    const phase = projectData?.phases.find((phase: { id: string; }) => phase.id === navId);

    if (!phase) {
        return (
            <TabPane tabId="details-tab">
                <div className="text-center my-4 bg-white">
                    <div className={'pb-5 pt-2'}>
                        <h1>Aucune phase trouvée</h1>
                        <p>Veuillez sélectionner une phase valide pour afficher ses détails.</p>
                    </div>
                </div>
            </TabPane>
        );
    }


    return (
        <TabPane tabId="details-tab">
            <div className="mb-4 bg-white mt-5 ps-5">
                <div className=" text-success pt-4 pb-2 border-bottom">
                    <h4 className="mb-0">{phase.name}</h4>
                </div>
                <div className={'pt-3 pb-4'}>
                    <Row>
                        <Col md="6">
                            <p><strong>Description :</strong> {phase.description}</p>
                        </Col>
                        <Col md="3">
                            <p><strong>Date de début :</strong></p>
                            <Badge color="success">{new Date(phase.started_at).toLocaleDateString()}</Badge>
                        </Col>
                        <Col md="3">
                            <p><strong>Date de fin :</strong></p>
                            <Badge color="danger">{new Date(phase.ended_at).toLocaleDateString()}</Badge>
                        </Col>
                    </Row>
                </div>
            </div>
        </TabPane>
    );
};

export default PhaseDetails;
