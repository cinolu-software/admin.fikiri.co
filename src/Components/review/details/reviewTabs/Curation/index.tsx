import React, { useState, useEffect } from "react";
import { Container, TabPane, Form, FormGroup, Label, Input, Button, Row, Col, Badge } from "reactstrap";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { toast } from "react-toastify";
import { curateSolution } from "@/Redux/Reducers/ReviewerSlice";
import { findReviewForm } from "@/Redux/Reducers/ReviewerSlice";

const Curation = () => {
    const { selectedSolution, token, dataForm, statusForm } = useAppSelector((state) => state.reviewer);
    const dispatch = useAppDispatch();

    const [responses, setResponses] = useState<{ [key: string]: string | number }>({});
    const [totalNote, setTotalNote] = useState(0);
    const [currentPhase, setCurrentPhase] = useState("");

    useEffect(() => {
        if (statusForm === "idle" && token) {
            dispatch(findReviewForm({ token }));
        }
    }, [dataForm, token, dispatch]);

    useEffect(() => {
        if (dataForm) {
            setCurrentPhase(dataForm.phase);
            const initialResponses = dataForm.fields.reduce((acc, field) => {
                const existingResponse = selectedSolution?.reviews
                    // @ts-ignore
                    ?.find(r => r.phase === dataForm.phase)
                    //@ts-ignore
                    ?.data.responses[field.label];
                return { ...acc, [field.label]: existingResponse || "" };
            }, {});
            setResponses(initialResponses);
        }
    }, [dataForm, selectedSolution]);

    useEffect(() => {
        if (dataForm) {
            const newTotal = dataForm.fields
                .filter(field => field.type === "number")
                .reduce((sum, field) => sum + (Number(responses[field.label]) || 0), 0);
            setTotalNote(newTotal);
        }
    }, [responses, dataForm]);

    const handleChange = (label: string, value: string | number) => {
        setResponses(prev => ({ ...prev, [label]: value }));
    };

    const handleSubmit = async () => {
        if (!dataForm) return;

        const formattedData = {
            phase: dataForm.phase,
            responses: Object.entries(responses).map(([question, answer]) => ({
                question,
                answer: String(answer)
            }))
        };

        const payload = {
            // @ts-ignore
            solution: selectedSolution.id,
            data: formattedData,
            token
        };

        try {
            //@ts-ignore
            await dispatch(curateSolution(payload));
            toast.success("Évaluation enregistrée avec succès !");
            setResponses({});
        } catch (error) {
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const getPhaseHistory = (phase: string) => {
        //@ts-ignore
        return selectedSolution.reviews?.filter(review =>
            review.data.phase === phase
        ) || [];
    };


    return (
        <TabPane tabId={"2"}>
            <Container className="mt-1 ms-3 p-5" fluid>
                <h3 className="mb-4">
                    Formulaire de Curation - Phase :
                    <Badge color="primary" className="ms-2">
                        {dataForm?.phase}
                    </Badge>
                </h3>

                <Row>
                    <Col md="8">
                        {dataForm?.fields ? (
                            <Form>
                                {dataForm.fields.map((field) => (
                                    // @ts-ignore
                                    <FormGroup key={field.id} className="mb-4">
                                        <Label>{field.label}</Label>

                                        {field.type === "number" ? (
                                            <Input
                                                type="number"
                                                min="0"
                                                max={field.label.includes('sur') ?
                                                    parseInt(field.label.split('sur ')[1]) : undefined}
                                                value={responses[field.label] || ""}
                                                onChange={(e) =>
                                                    handleChange(field.label, Number(e.target.value))
                                                }
                                            />
                                        ) : field.type === "select" ? (
                                            <Input
                                                type="select"
                                                value={responses[field.label] || ""}
                                                onChange={(e) =>
                                                    handleChange(field.label, e.target.value)
                                                }
                                            >
                                                <option value="">-- Sélectionner --</option>
                                                {field.options?.map((option, index) => (
                                                    <option key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </Input>
                                        ) : (
                                            <Input
                                                //@ts-ignore
                                                type={field.type}
                                                value={responses[field.label] || ""}
                                                onChange={(e) =>
                                                    handleChange(field.label, e.target.value)
                                                }
                                            />
                                        )}
                                    </FormGroup>
                                ))}

                                <div className="d-flex align-items-center gap-4 mb-4">
                                    <h4 className="m-0">Note totale : {totalNote}</h4>
                                    <Button
                                        color="primary"
                                        onClick={handleSubmit}
                                        disabled={!dataForm}
                                    >
                                        Soumettre l'évaluation
                                    </Button>
                                </div>
                            </Form>
                        ) : (
                            <p className="text-muted">Aucun formulaire de curation disponible</p>
                        )}
                    </Col>

                    <Col md="4">
                        <h4 className="mb-4">Historique des Évaluations</h4>

                        {getPhaseHistory(currentPhase).map((review, index) => (
                            <div key={index} className="mb-4 p-3 border rounded">
                                <div className="d-flex justify-content-between mb-2">
                                    <small className="text-muted">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </small>
                                    <Badge color="info">
                                        {review.data.phase}
                                    </Badge>
                                </div>

                                <ul className="list-unstyled">
                                    {review.data.responses?.map((item, idx) => (
                                        <li key={idx} className="mb-1">
                                            <strong>{item.question}:</strong> {item.answer}
                                        </li>
                                    ))}
                                </ul>

                                <div className="fw-bold mt-2">
                                    Total: {review.data.responses?.reduce((sum, item) =>
                                    sum + (Number(item.answer) || 0), 0
                                )}
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </TabPane>
    );
};

export default Curation;