import { useEffect } from "react";
import BackButton from "@/CommonComponent/BackButton";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";
import { Card, CardBody, Row, Col, Badge } from "reactstrap";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { imageBaseUrl } from "@/Services/axios";
import { ImagePath } from "@/Constant";
import { fetchOneApplication } from "@/Redux/Reducers/CallSlice/CallApplication";

const safeFormatDate = (dateStr?: string | null, formatStr = "dd MMMM yyyy") => {
    const date = dateStr ? new Date(dateStr) : null;
    return date && !isNaN(date.getTime()) ? format(date, formatStr, { locale: fr }) : "Non renseignée";
};

const CallApplicationDetail = () => {
    const { selectedApplication } = useAppSelector(state => state.application);
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!selectedApplication) {
            router.push("/admin/call");
        } else {
            dispatch(fetchOneApplication({ solutionId: selectedApplication.id }));
        }
    }, []);

    if (!selectedApplication) return null;

    const { user, responses, created_at } = selectedApplication;

    return (
        <div className="container-fluid">
            <BackButton link="/admin/call/" />

            <Card className="mb-4 shadow-sm">
                <CardBody>

                    <Row className="align-items-center">
                        <Col md={2}>
                            <img
                                className="rounded border"
                                src={
                                    user?.profile
                                        ? `${imageBaseUrl}/profiles/${user.profile}`
                                        : user?.google_image
                                            ? user.google_image
                                            : `${ImagePath}/avtar/avatar_.jpg`
                                }
                                alt={user?.name}
                                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                            />
                        </Col>
                        <Col md={10}>
                            <h4 className="mb-4">Informations du candidat</h4>
                            <Row>
                                <Col md={6}>
                                    <p><strong>Nom :</strong> {user?.name}</p>
                                    <p><strong>Email :</strong> {user?.email}</p>
                                    <p><strong>Téléphone :</strong> {user?.phone_number || "Non renseigné"}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Adresse :</strong> {user?.address || "Non renseignée"}</p>
                                    <p><strong>Date d'inscription :</strong> {safeFormatDate(user?.created_at)}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>


            <Card className="shadow-sm">
                <CardBody>
                    <h4 className="mb-4 text-success">Détails de la soumission</h4>
                    <Row>
                        {Object.entries(responses).map(([key, value], index) => (
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
                            <p className="mt-4"><strong>Date de soumission :</strong> {safeFormatDate(created_at)}</p>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default CallApplicationDetail;
