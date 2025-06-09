import React, {useEffect} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col, Badge, Container } from "reactstrap";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import BackButton from "@/CommonComponent/BackButton";
import { imageBaseUrl } from "@/Services/axios";
import { ImagePath } from "@/Constant";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaIdBadge } from 'react-icons/fa';
import {fetchInscriptionsByOutreachers} from "@/Redux/Reducers/UserSlice";

const Detail = () => {

    const { selectedUser, inscriptionsByOutreachers } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (selectedUser && selectedUser.id) {
            dispatch(fetchInscriptionsByOutreachers({email: selectedUser.email}));
        }
    }, [selectedUser, dispatch]);

    if (!selectedUser) return <div>Chargement...</div>;

    console.log(inscriptionsByOutreachers);


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const sponsoredCount = inscriptionsByOutreachers?.length || 0;

    return (
        <Container fluid className="py-3">
            <Row className="mb-3">
                <BackButton link="/cartographerAssistant/list" />
            </Row>

            <Card >
                <CardBody>
                    <Row className="align-items-start">
                        <Col md={2} className="text-center mb-4 mb-md-0">
                            <div className="d-flex justify-content-center">
                                <img
                                    src={
                                        selectedUser.profile
                                            ? `${imageBaseUrl}/profiles/${selectedUser.profile}`
                                            : selectedUser.google_image
                                                ? selectedUser.google_image
                                                : `${ImagePath}/avtar/avatar_.jpg`
                                    }
                                    alt="Profil"
                                    className="rounded-lg"
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        objectFit: "cover",
                                        borderRadius: "12px",
                                        border: "1px solid #eee"
                                    }}
                                />
                                <Badge
                                    color="primary"
                                    className="position-absolute top-0 end-0 mt-2 me-2"
                                    pill
                                >
                                    {sponsoredCount} parrainés
                                </Badge>
                            </div>
                        </Col>

                        <Col md={10}>
                            <Row>
                                <Col>
                                    <CardTitle tag="h4" className="mb-3 d-flex align-items-center">
                                        {selectedUser.name || "Utilisateur sans nom"}
                                    </CardTitle>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6} className="mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                        <FaEnvelope className="me-2 text-muted" />
                                        <strong className="me-2">Email:</strong>
                                        <span>{selectedUser.email || "Non fourni"}</span>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <FaPhone className="me-2 text-muted" />
                                        <strong className="me-2">Téléphone:</strong>
                                        <span>{selectedUser.phone_number || "Non fourni"}</span>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        <FaMapMarkerAlt className="me-2 text-muted" />
                                        <strong className="me-2">Adresse:</strong>
                                        <span>{selectedUser.address || "Non fournie"}</span>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaCalendarAlt className="me-2 text-muted" />
                                        <strong className="me-2">Créé le:</strong>
                                        <span>{formatDate(selectedUser.created_at)}</span>
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    );
};

export default Detail;