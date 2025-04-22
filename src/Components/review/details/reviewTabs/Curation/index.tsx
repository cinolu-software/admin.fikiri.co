import React, { useState, useEffect } from "react";
import {Container, TabPane, Form, FormGroup, Label, Input, Button, Table, Row, Col} from "reactstrap";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { toast } from "react-toastify";
import { curateSolution } from "@/Redux/Reducers/ReviewerSlice";
import { FormField } from "@/Types/Call/CallType";
import {findReviewForm} from "@/Redux/Reducers/ReviewerSlice";


const Curation = () => {
    
    const { selectedSolution, token, dataForm } = useAppSelector((state) => state.reviewer);
    const dispatch = useAppDispatch();

    // const { call, reviews } = selectedSolution;
    // const reviewForm = (call.review_form || []) as FormField[];

    const [responses, setResponses] = useState<{ [key: string]: string | number }>({});
    const [totalNote, setTotalNote] = useState(0);

    useEffect(() => {
        if (!dataForm) {
            dispatch(findReviewForm({token}));
        }
    }, [dataForm, token, dispatch]);

    // useEffect(() => {
    //     const newTotal = Object.entries(responses)
    //         .filter(([key]) => reviewForm.find((field) => field.label === key)?.type === "number")
    //         .reduce((sum, [, val]) => sum + (typeof val === 'number' ? val : 0), 0);
    //
    //     setTotalNote(newTotal);
    // }, [responses, reviewForm]);

    // const handleChange = (label: string, value: string | number) => {
    //     setResponses((prev) => {
    //         const updatedResponses = { ...prev, [label]: value };
    //
    //         const newTotal = Object.entries(updatedResponses)
    //             .filter(([key]) => reviewForm.find((field) => field.label === key)?.type === "number")
    //             .reduce((sum, [, val]) => sum + (typeof val === 'number' ? val : 0), 0);
    //
    //         setTotalNote(newTotal);
    //         return updatedResponses;
    //     });
    // };
    //
    // const handleSubmit = async () => {
    //     const formattedData = Object.entries(responses).map(([question, answer]) => ({
    //         question,
    //         answer: String(answer)
    //     }));
    //     const payload = {
    //         solution: selectedSolution.id,
    //         data: formattedData,
    //         token
    //     };
    //     try {
    //         await dispatch(curateSolution(payload));
    //         toast.success("Curation envoyée avec succès !");
    //     } catch (error) {
    //         toast.error("Erreur réseau");
    //     }
    // };

    console.log("===>|",dataForm);

    return (
        <TabPane tabId={"2"}>
            <Container className="mt-1 ms-3 p-5" fluid>
                <h3 className="mb-4">Formulaire de Curation</h3>
                {/*<Row>*/}
                {/*<Col>*/}
                {/*        <Form>*/}
                {/*            {reviewForm?.map((field) => (*/}
                {/*                <FormGroup key={field.id}>*/}
                {/*                    <Label>{field.label}</Label>*/}
                {/*                    {field.type === "text" && (*/}
                {/*                        <Input*/}
                {/*                            type="text"*/}
                {/*                            value={responses[field.label] || ""}*/}
                {/*                            onChange={(e) => handleChange(field.label, e.target.value)}*/}
                {/*                        />*/}
                {/*                    )}*/}
                {/*                    {field.type === "number" && (*/}
                {/*                        <Input*/}
                {/*                            type="number"*/}
                {/*                            min="0"*/}
                {/*                            max="10"*/}
                {/*                            value={responses[field.label] || ""}*/}
                {/*                            onChange={(e) => handleChange(field.label, Number(e.target.value))}*/}
                {/*                        />*/}
                {/*                    )}*/}

                {/*                    {field.type === "textarea" && (*/}
                {/*                        <Input*/}
                {/*                            type="textarea"*/}
                {/*                            value={responses[field.label] || ""}*/}
                {/*                            onChange={(e) => handleChange(field.label, e.target.value)}*/}
                {/*                        />*/}
                {/*                    )}*/}

                {/*                    {field.type === "select" && field.options?.length > 0 && (*/}
                {/*                        <Input*/}
                {/*                            type="select"*/}
                {/*                            value={responses[field.label] || ""}*/}
                {/*                            onChange={(e) => handleChange(field.label, e.target.value)}*/}
                {/*                        >*/}
                {/*                            <option value="">-- Sélectionner --</option>*/}
                {/*                            {field.options.map((option: string, index: number) => (*/}
                {/*                                <option key={index} value={option}>*/}
                {/*                                    {option}*/}
                {/*                                </option>*/}
                {/*                            ))}*/}
                {/*                        </Input>*/}
                {/*                    )}*/}

                {/*                    {field.type === "date" && (*/}
                {/*                        <Input*/}
                {/*                            type="date"*/}
                {/*                            value={responses[field.label] || ""}*/}
                {/*                            onChange={(e) => handleChange(field.label, e.target.value)}*/}
                {/*                        />*/}
                {/*                    )}*/}
                {/*                </FormGroup>*/}
                {/*            ))}*/}

                {/*            <h4 className="mb-4">Note totale : {totalNote}</h4>*/}
                {/*            <Button color="primary" onClick={handleSubmit}>*/}
                {/*                Envoyer la curation*/}
                {/*            </Button>*/}
                {/*        </Form>*/}
                {/*    </Col>*/}
                {/*    <Col>*/}
                {/*        {reviews.length > 0 && (*/}
                {/*            <>*/}
                {/*                <h4 className="mb-4">Historique des Cotations</h4>*/}
                {/*                <Table bordered>*/}
                {/*                    <thead>*/}
                {/*                        <tr>*/}
                {/*                            <th>Date</th>*/}
                {/*                            <th>Note Totale</th>*/}
                {/*                            <th>Détails</th>*/}
                {/*                        </tr>*/}
                {/*                    </thead>*/}
                {/*                    <tbody>*/}
                {/*                        {reviews?.map((review, index) => (*/}
                {/*                            <tr key={review.id}>*/}
                {/*                                <td>{new Date(review.created_at).toLocaleString()}</td>*/}
                {/*                                <td>{review.data?.reduce((sum, item) => sum + (item.answer ? Number(item.answer) : 0), 0)}</td>*/}
                {/*                                <td>*/}
                {/*                                    <ul>*/}
                {/*                                        {(() => {*/}
                {/*                                        if (!review.data) return null;*/}
                {/*                                        */}
                {/*                                        if (Array.isArray(review.data)) {*/}
                {/*                                            return review.data.map((item, idx) => (*/}
                {/*                                            <li key={idx}>*/}
                {/*                                                <strong>{item.question}:</strong> {item.answer}*/}
                {/*                                            </li>*/}
                {/*                                            ));*/}
                {/*                                        }*/}
                {/*                                        */}
                {/*                                        if (typeof review.data === 'object') {*/}
                {/*                                            return Object.entries(review.data).map(([question, answer], idx) => (*/}
                {/*                                            <li key={idx}>*/}
                {/*                                                <strong>{question}:</strong> {String(answer)}*/}
                {/*                                            </li>*/}
                {/*                                            ));*/}
                {/*                                        }*/}
                {/*                                        */}
                {/*                                        return null;*/}
                {/*                                        })()}*/}
                {/*                                    </ul>*/}
                {/*                                </td>*/}
                {/*                            </tr>*/}
                {/*                        ))}*/}
                {/*                    </tbody>*/}
                {/*                </Table>*/}
                {/*            </>*/}
                {/*        )}*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </Container>
        </TabPane>
    );
};

export default Curation;
