import React from 'react';
import {
    Card, CardBody, CardTitle, Row, Col, ListGroup, ListGroupItem, Badge, Container, TabPane
} from 'reactstrap';
import { Calendar, FileText, User, CheckCircle, XCircle, Phone, Home } from 'react-feather';
import { useAppSelector } from "@/Redux/Hooks";
import {useRouter} from "next/navigation";

const ReviewInfo = () => {

    const { selectedSolution, token } = useAppSelector(state => state.reviewer);
    const router = useRouter();

    if (!selectedSolution) {
        router.push(`/review?token=${token}`);
    }

    // const call = selectedSolution.call;
    // const user = selectedSolution.user;


    return (
        <TabPane tabId={"1"}>
            <Container className="mt-4 ms-3 p-5" fluid>
                {/*<Row className="mb-1">*/}
                {/*    <Card className="shadow-sm">*/}
                {/*        <Row>*/}
                {/*            <Col md={6}>*/}
                {/*                <h3 className="mb-4">Appel : {call.name}</h3>*/}
                {/*                <p className="text-muted border rounded p-2">Description : {call.description}</p>*/}
                {/*            </Col>*/}
                {/*            <Col md={6} className="text-md-end">*/}
                {/*                <ListGroup flush>*/}
                {/*                    <ListGroupItem>*/}
                {/*                        <Calendar className="me-2 text-primary" /> */}
                {/*                        <strong>Début :</strong> {new Date(call.started_at).toLocaleDateString()}*/}
                {/*                    </ListGroupItem>*/}
                {/*                    <ListGroupItem>*/}
                {/*                        <Calendar className="me-2 text-danger" /> */}
                {/*                        <strong>Fin :</strong> {new Date(call.ended_at).toLocaleDateString()}*/}
                {/*                    </ListGroupItem>*/}
                {/*                    <ListGroupItem>*/}
                {/*                        {call.published_at ? (*/}
                {/*                            <>*/}
                {/*                                <CheckCircle className="me-2 text-success" /> */}
                {/*                                <strong>Publié :</strong> {new Date(call.published_at).toLocaleDateString()}*/}
                {/*                            </>*/}
                {/*                        ) : (*/}
                {/*                            <>*/}
                {/*                                <XCircle className="me-2 text-danger" /> */}
                {/*                                <strong>Non publié</strong>*/}
                {/*                            </>*/}
                {/*                        )}*/}
                {/*                    </ListGroupItem>*/}
                {/*                </ListGroup>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*    </Card>*/}
                {/*</Row>*/}
                {/*<Row className="mb-4">*/}
                {/*    <Card className="shadow-sm">*/}
                {/*        <h3>Informations du candidat</h3>*/}
                {/*        <ListGroup flush>*/}
                {/*            <ListGroupItem>*/}
                {/*                <User className="me-2 text-info" />*/}
                {/*                <strong>Nom :</strong> {user.name}*/}
                {/*            </ListGroupItem>*/}
                {/*            <ListGroupItem>*/}
                {/*                <User className="me-2 text-info" />*/}
                {/*                <strong>Email :</strong> {user.email}*/}
                {/*            </ListGroupItem>*/}
                {/*            <ListGroupItem>*/}
                {/*                <Phone className="me-2 text-success" />*/}
                {/*                <strong>Téléphone :</strong> {user.phone_number}*/}
                {/*            </ListGroupItem>*/}
                {/*            <ListGroupItem>*/}
                {/*                <Home className="me-2 text-warning" />*/}
                {/*                <strong>Adresse :</strong> {user.address}*/}
                {/*            </ListGroupItem>*/}
                {/*        </ListGroup>*/}
                {/*    </Card>*/}
                {/*</Row>*/}
            </Container>
        </TabPane>
    );
};

export default ReviewInfo;
