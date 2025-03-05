import React from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Badge,
    Container,
    TabPane
} from 'reactstrap';
import { Calendar, FileText, Tag, User, Target } from 'react-feather';
import { useAppSelector } from "@/Redux/Hooks";
import { Call, FormField, Requirement, CallType, RequirementType, FormInputType } from '@/Types/Call/CallType';

const CallInfo = () => {

    const { selectedCall } = useAppSelector(state => state.call);

    if (!selectedCall) {

        return (
            <p className="text-center text-muted">
                Aucun appel sélectionné.
            </p>
        )
        
    }


    return (
        <TabPane tabId={"1"}>
            <Container className="mt-4 ms-3 pe-5" fluid>
                <Row className="mb-4">
                    <Col md={12}>
                        <div className="mb-4 border rounded">
                            <CardBody>
                                <CardTitle tag="h5" className="mb-3">
                                    <Tag size={16} className="me-2 text-primary " />
                                    {selectedCall.name}
                                </CardTitle>
                                <CardText className="text-muted">{selectedCall.description}</CardText>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <Calendar size={16} className="me-2 text-success" />
                                        <strong>Début :</strong> {new Date(selectedCall.started_at).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <Calendar size={16} className="me-2 text-danger" />
                                        <strong>Fin :</strong> {new Date(selectedCall.ended_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </CardBody>
                        </div>

                        <div className="mb-4 border rounded">
                            <CardBody>
                                <CardTitle tag="h5" className="mb-3">
                                    <Target size={20} className="me-2 text-warning" />
                                    Exigences
                                </CardTitle>
                                <ListGroup flush>
                                    {
                                        selectedCall.requirements && selectedCall.requirements.length > 0 ? (
                                            selectedCall.requirements.map((req: Requirement, index) => (
                                                <ListGroupItem key={index}>
                                                    <strong>{req.name} :</strong> {req.description}
                                                </ListGroupItem>
                                            ))
                                        ) : (
                                            <p className="text-muted">Aucune exigence spécifiée.</p>
                                        )}
                                </ListGroup>
                            </CardBody>
                        </div>

                        <div className="mb-4 border rounded">
                            <CardBody>
                                <CardTitle tag="h5">
                                    <FileText size={20} className="me-2 text-info" />
                                    Formulaire de candidature
                                </CardTitle>
                                <ListGroup flush>
                                    {
                                        selectedCall.form && selectedCall.form.length > 0 ? (
                                            selectedCall.form.map((field: FormField) => (
                                                <ListGroupItem key={field.id} className="d-flex justify-content-between">
                                                    <span>{field.label}</span>
                                                    {field.required && <Badge color="danger">Obligatoire</Badge>}
                                                </ListGroupItem>
                                            ))
                                        ) : (
                                            <p className="text-muted">Aucun champ de formulaire défini.</p>
                                        )}
                                </ListGroup>
                            </CardBody>
                        </div>

                        <div className="border rounded">
                            <CardBody>
                                <CardTitle tag="h5">
                                    <User size={20} className="me-2 text-secondary" />
                                    Auteur
                                </CardTitle>
                                <ListGroup flush>
                                    <ListGroupItem>
                                        <strong>Nom :</strong> {
                                        selectedCall.author?.name || "Inconnu"
                                    }
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <strong>Email :</strong> {
                                        selectedCall.author?.email || "Non spécifié"
                                    }
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <strong>Téléphone :</strong> {
                                        selectedCall.author?.phone_number || "Non spécifié"
                                    }
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <strong>Adresse :</strong> {
                                        selectedCall.author?.address || "Non spécifié"
                                    }
                                    </ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </div>
                    </Col>
                </Row>
            </Container>
        </TabPane>
    );
};

export default CallInfo;
