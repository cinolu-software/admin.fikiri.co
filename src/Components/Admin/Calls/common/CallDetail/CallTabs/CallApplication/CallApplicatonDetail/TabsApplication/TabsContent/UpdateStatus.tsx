import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { Card, CardBody, Row, Col, Input, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { updateStatusSolution } from "@/Redux/Reducers/CallSlice/CallApplication";

const STATUSES = ["pending", "mapped", "explored", "experimented"] as const;
type StatusType = typeof STATUSES[number];

const statusLabels: Record<StatusType, string> = {
    pending: "En attente",
    mapped: "Cartographiée",
    explored: "Explorée",
    experimented: "Expérimentée",
};

const UpdateStatusApplication = () => {
    const dispatch = useAppDispatch();
    const { selectedApplication } = useAppSelector(state => state.application);
    const { selectedCall } = useAppSelector(state => state.call);

    const [loading, setLoading] = useState(false);

    if (!selectedApplication || !selectedCall) return null;

    const currentStatus = selectedApplication.status as StatusType;

    const handleStatusChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.target.value as StatusType;
        if (newStatus === currentStatus || loading) return;
        setLoading(true);

        try {
            await dispatch(
                updateStatusSolution({
                    applicationId: selectedApplication.id,
                    call: selectedCall.id,
                    responses: selectedApplication.responses,
                    status: newStatus,
                })
            ).unwrap();

            toast.success(`✅ Statut mis à jour vers "${statusLabels[newStatus]}"`);
        } catch (e) {
            toast.error("❌ Une erreur s'est produite lors de la mise à jour du statut.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-sm">
            <CardBody>
                <h4 className="mb-4 text-success">Changement de statut</h4>

                <Row className="justify-content-between text-center">
                    {STATUSES.map((status, index) => {
                        const isActive = status === currentStatus;
                        const isCompleted = STATUSES.indexOf(currentStatus) > index;
                        return (
                            <Col key={status} className="position-relative">
                                <div
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        margin: "0 auto",
                                        borderRadius: "50%",
                                        backgroundColor: isActive
                                            ? "#0d6efd"
                                            : isCompleted
                                                ? "#198754"
                                                : "#ced4da",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {index + 1}
                                </div>
                                <div className="mt-2" style={{ fontSize: "14px" }}>
                                    {statusLabels[status]}
                                </div>
                                {index < STATUSES.length - 1 && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "15px",
                                            left: "50%",
                                            right: "-50%",
                                            height: "3px",
                                            backgroundColor:
                                                STATUSES.indexOf(currentStatus) > index
                                                    ? "#198754"
                                                    : "#ced4da",
                                            zIndex: 0,
                                        }}
                                    ></div>
                                )}
                            </Col>
                        );
                    })}
                </Row>

                <Row className="mb-4 ms-5 mt-5">
                    <Col md={6}>
                        <Input
                            bsSize="sm"
                            type="select"
                            value={currentStatus}
                            onChange={handleStatusChange}
                            disabled={loading}
                        >
                            {STATUSES.map(status => (
                                <option key={status} value={status}>
                                    {statusLabels[status]}
                                </option>
                            ))}
                        </Input>
                    </Col>
                    <Col md={6} className="text-end">
                        {loading && <Spinner size="sm" color="primary" />}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default UpdateStatusApplication;
