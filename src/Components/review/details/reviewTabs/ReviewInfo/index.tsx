import React from 'react';
import { Card, CardBody, CardTitle, Row, Col, ListGroup, ListGroupItem, Badge, Container, TabPane } from 'reactstrap';
import { Calendar, FileText, User, CheckCircle, XCircle, Phone, Home } from 'react-feather';
import { useAppSelector } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";

const ReviewInfo = () => {

    const { selectedSolution, token } = useAppSelector(state => state.reviewer);
    const router = useRouter();

    if (!selectedSolution) {
        router.push(`/review`);
        return null;
    }

    return (
        <TabPane tabId={"1"}>
            <Container className="mt-4 ms-3 p-5" fluid>
                <Row>
                    <div className="mb-4">
                        <div>
                            <h4 className="mb-4 d-flex align-items-center gap-2">
                                <FileText size={20} />
                                Détails de la solution
                            </h4>

                            <ListGroup flush>
                                {Object.entries(
                                    selectedSolution.responses as unknown as Record<string, string>
                                ).map(([key, value]) => (
                                    <ListGroupItem 
                                        key={key} 
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        <span className="fw-bold">{key}</span>
                                        <span className="text-muted">{value}</span>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                    {
                        selectedSolution.reviews?.length > 0 && (
                            <div className="mb-4">

                                <h4 className="mb-4 d-flex align-items-center gap-2">
                                    <CheckCircle size={20} />
                                    Historique des évaluations
                                </h4>

                                {selectedSolution.reviews.map((review, index) => (
                                    <div key={review.id} className="mb-4 border-bottom pb-3">
                                        <div className="d-flex justify-content-between mb-2">
                                            <small className="text-muted">
                                                {
                                                    new Date(review.created_at).toLocaleDateString()
                                                }
                                            </small>
                                            <Badge color="info" pill>
                                                Phase: {review.data.phase}
                                            </Badge>
                                        </div>

                                        <ListGroup flush>
                                            {review.data.responses.map((response, idx) => (
                                                <ListGroupItem key={idx} className="d-flex justify-content-between align-items-center">
                                                    <span>{response.question}</span>
                                                    <Badge color="primary" pill>
                                                        {response.answer}
                                                    </Badge>
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>

                                        <div className="mt-3 text-end fw-bold">
                                            Note totale: {review.data.responses.reduce((sum, item) => sum + Number(item.answer), 0)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                    )}
                    <div className="mb-4 ">
                        <div>
                            <h4 className="mb-4 d-flex align-items-center gap-2">
                                <User size={20} />
                                Informations de l'innovateur
                            </h4>

                            <ListGroup flush>
                                <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold">Nom</span>
                                    <span>{selectedSolution.user.name}</span>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold">Email</span>
                                    <span>{selectedSolution.user.email}</span>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold">Téléphone</span>
                                    <span>{selectedSolution.user.phone_number || "Non renseigné"}</span>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold">Adresse</span>
                                    <span>{selectedSolution.user.address || "Non renseignée"}</span>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div>
                            <h4 className="mb-4 d-flex align-items-center gap-2">
                                <Calendar size={20} />
                                Métadonnées
                            </h4>

                            <ListGroup flush>
                                <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold">Date de création</span>
                                    <span>{new Date(selectedSolution.created_at).toLocaleDateString()}</span>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold">Dernière modification</span>
                                    <span>{new Date(selectedSolution.updated_at).toLocaleDateString()}</span>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold">Statut</span>
                                    <Badge color={selectedSolution.reviewer ? "success" : "warning"}>
                                        {selectedSolution.reviewer ? "Évaluée" : "En attente"}
                                    </Badge>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                </Row>
            </Container>
        </TabPane>
    );
};

export default ReviewInfo;


