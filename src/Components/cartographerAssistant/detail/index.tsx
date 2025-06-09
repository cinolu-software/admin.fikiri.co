import React, {useEffect} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col, Badge, Container, Table } from "reactstrap";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import BackButton from "@/CommonComponent/BackButton";
import { imageBaseUrl } from "@/Services/axios";
import { ImagePath } from "@/Constant";
import { FaUsers, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaIdBadge, FaUserPlus } from 'react-icons/fa';
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
                    <Row className="align-items-start border p-3 rounded">
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

                <div className='px-5'>
                    <div className="d-flex align-items-center mb-4 mt-5">
                        <h4 className="mb-0">Liste des Parrainés</h4>
                    </div>

                    {
                    
                        sponsoredCount > 0 ? (
                            <div className="table-responsive">
                                <Table hover bordered>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom</th>
                                        <th>Email</th>
                                        <th>Téléphone</th>
                                        <th>Inscrit le</th>
                                        <th>Adresse</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {inscriptionsByOutreachers.map((user, index) => (
                                            <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                <img
                                                    src={
                                                    user.profile
                                                        ? `${imageBaseUrl}/profiles/${user.profile}`
                                                        : user.google_image
                                                        ? user.google_image
                                                        : `${ImagePath}/avtar/avatar_.jpg`
                                                    }
                                                    alt="Profil"
                                                    style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                    marginRight: "10px"
                                                    }}
                                                />
                                                {user.name}
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.phone_number || "-"}</td>
                                            <td>{formatDate(user.created_at)}</td>
                                            <td>
                                                {user.address}
                                            </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        ) : (
                            <div className="text-center py-5">
                            <FaUserPlus className="text-muted mb-3" size={48} />
                            <h5>Aucun parrainé trouvé</h5>
                            <p className="text-muted">Cet utilisateur n'a pas encore parrainé d'autres membres.</p>
                            </div>
                        )
                    }
                </div>
            </Card>
        </Container>
    );
};

export default Detail;