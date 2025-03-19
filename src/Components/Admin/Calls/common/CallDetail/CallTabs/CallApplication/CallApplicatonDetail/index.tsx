import { useEffect } from "react";
import BackButton from "@/CommonComponent/BackButton";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks"
import { useRouter } from "next/navigation";
import { Card, CardBody, Row, Col } from "reactstrap";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { imageBaseUrl } from "@/Services/axios";
import { ImagePath } from '@/Constant';

const CallApplicationDetail = () => {
    
    const { selectedApplication } = useAppSelector(state => state.application);
    const router = useRouter();

    useEffect(() => {
        if (!selectedApplication) {
            router.push("/admin/call");
        }
    }, [])

    if (!selectedApplication) return null;

    return (
        <div className="container-fluid">
            <BackButton link={'/admin/call/'} />
            
            <Card className="mb-4">
                <CardBody>
                    <h4 className="mb-4">Informations du candidat</h4>
                    <Row className="align-items-center">
                        <Col md={2}>
                            <img
                                className="rounded-circle"
                                src={
                                    selectedApplication.applicant?.profile
                                        ? `${imageBaseUrl}/profiles/${selectedApplication.applicant.profile}`
                                        : selectedApplication.applicant?.google_image
                                            ? selectedApplication.applicant.google_image
                                            : `${ImagePath}/avtar/avatar_.jpg`
                                }
                                alt={selectedApplication.applicant?.name}
                                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                            />
                        </Col>
                        <Col md={10}>
                            <Row>
                                <Col md={6}>
                                    <p><strong>Nom:</strong> {selectedApplication.applicant?.name}</p>
                                    <p><strong>Email:</strong> {selectedApplication.applicant?.email}</p>
                                    <p><strong>Téléphone:</strong> {selectedApplication.applicant?.phone_number || 'Non renseigné'}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Adresse:</strong> {selectedApplication.applicant?.address || 'Non renseignée'}</p>
                                    <p><strong>Date d'inscription:</strong> {format(new Date(selectedApplication.applicant?.created_at), 'dd MMMM yyyy', { locale: fr })}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>


            <Card>
                <CardBody>
                    <h4 className="mb-4">Réponses du formulaire</h4>
                    <Row>
                        {
                            //@ts-ignore
                            Object.entries(selectedApplication.responses).map(([question, response], index) => (
                                <Col md={6} key={index} className="mb-3">
                                    <div className="p-3 border rounded">
                                        <p className="mb-2"><strong>{question}:</strong></p>
                                        
                                        <p className="text-muted mb-0">
                                            {String(response)}
                                        </p>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                </CardBody>
            </Card>


            <Card className="mt-4">
                <CardBody>
                    <h4 className="mb-4">Informations de la candidature</h4>
                    <Row>
                        <Col md={6}>
                            <p><strong>Date de soumission:</strong> {format(new Date(selectedApplication.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}</p>
                        </Col>
                        {selectedApplication.document && (
                            <Col md={6}>
                                <p>
                                    <strong>Document joint:</strong>{' '}
                                    <a href={`${imageBaseUrl}/documents/${selectedApplication.document}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                                        Voir le document
                                    </a>
                                </p>
                            </Col>
                        )}
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default CallApplicationDetail