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
import TabsApplication from "@/Components/Admin/Calls/common/CallDetail/CallTabs/CallApplication/CallApplicatonDetail/TabsApplication";
import {safeFormatDate} from "@/utils";

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

    const { user } = selectedApplication;

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
            <TabsApplication />
        </div>
    );
};

export default CallApplicationDetail;
