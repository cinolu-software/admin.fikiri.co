import React from 'react';
import {
    Card, CardBody, CardTitle, Row, Col, ListGroup, ListGroupItem, Badge, Container, TabPane
} from 'reactstrap';
import { Calendar, FileText, User, CheckCircle, XCircle, Phone, Home } from 'react-feather';
import { useAppSelector } from "@/Redux/Hooks";

const ReviewInfo = () => {
    const { selectedSolution } = useAppSelector(state => state.reviewer);

    if (!selectedSolution) {
        return <p>Chargement des données...</p>;
    }

    const call = selectedSolution.call;
    const user = selectedSolution.user;


    console.log(selectedSolution)

    return (
        <TabPane tabId={"1"}>
            <Container className="mt-4 ms-3 p-5" fluid>             

                <Row className="mb-1">
                    <Card className="shadow-sm">
                        <Row>
                            <Col md={6}>
                                <h3 className="mb-4">Appel : {call.name}</h3>
                                <p className="text-muted border rounded p-2">Description : {call.description}</p>
                            </Col>
                            <Col md={6} className="text-md-end">
                                <ListGroup flush>
                                    <ListGroupItem>
                                        <Calendar className="me-2 text-primary" /> 
                                        <strong>Début :</strong> {new Date(call.started_at).toLocaleDateString()}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Calendar className="me-2 text-danger" /> 
                                        <strong>Fin :</strong> {new Date(call.ended_at).toLocaleDateString()}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        {call.published_at ? (
                                            <>
                                                <CheckCircle className="me-2 text-success" /> 
                                                <strong>Publié :</strong> {new Date(call.published_at).toLocaleDateString()}
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="me-2 text-danger" /> 
                                                <strong>Non publié</strong>
                                            </>
                                        )}
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Card>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <Card className="shadow-sm">
                            <CardBody>
                                <CardTitle tag="h4">Informations du candidat</CardTitle>
                                <ListGroup flush>
                                    <ListGroupItem>
                                        <User className="me-2 text-info" />
                                        <strong>Nom :</strong> {user.name}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <User className="me-2 text-info" />
                                        <strong>Email :</strong> {user.email}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Phone className="me-2 text-success" />
                                        <strong>Téléphone :</strong> {user.phone_number}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Home className="me-2 text-warning" />
                                        <strong>Adresse :</strong> {user.address}
                                    </ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </TabPane>
    );
};

export default ReviewInfo;
