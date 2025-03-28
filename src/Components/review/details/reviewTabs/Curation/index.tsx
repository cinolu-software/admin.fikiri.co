import React, { useState } from "react";
import {
    Container,
    TabPane,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";
import { useAppSelector } from "@/Redux/Hooks";
import { toast } from "react-toastify";

const Curation = () => {
    const { selectedSolution } = useAppSelector((state) => state.reviewer);
    
    if (!selectedSolution) {
        return <p>Chargement des données...</p>;
    }

    const { call } = selectedSolution;
    const reviewForm = call.review_form || [];
    const [responses, setResponses] = useState<{ [key: string]: number }>({});

    const handleChange = (label: string, value: number) => {
        setResponses((prev) => ({ ...prev, [label]: value }));
    };


    const totalNote = Object.entries(responses)
    .filter(([key, value]) => reviewForm.find((field) => field.label === key)?.type === "number")
    .reduce((sum, [, val]) => sum + Number(val || 0), 0);


    const handleSubmit = async () => {
        const payload = {
            solution: selectedSolution.id,
            note: totalNote,
            data: responses,
        };

        try {
            const response = await fetch("/api/curation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success("Curation envoyée avec succès !");
            } else {
                toast.error("Erreur lors de l'envoi de la curation");
            }
        } catch (error) {
            toast.error("Erreur réseau");
        }
    };

    return (
        <TabPane tabId={"2"}>
            <Container className="mt-1 ms-3 p-5" fluid>
                <h3 className="mb-4">Formulaire de Curation</h3>
                <Form>
                    {reviewForm.map((field) => (
                        <FormGroup key={field.id}>
                            <Label>{field.label}</Label>
                            {field.type === "text" && (
                                <Input
                                    type="text"
                                    value={responses[field.label] || ""}
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                />
                            )}

                            {field.type === "number" && (
                                <Input
                                    type="number"
                                    min="0"
                                    max="10"
                                    value={responses[field.label] || ""}
                                    onChange={(e) => handleChange(field.label, Number(e.target.value))}
                                />
                            )}

                            {field.type === "textarea" && (
                                <Input
                                    type="textarea"
                                    value={responses[field.label] || ""}
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                />
                            )}

                            {field.type === "select" && field.options?.length > 0 && (
                                <Input
                                    type="select"
                                    value={responses[field.label] || ""}
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                >
                                    <option value="">-- Sélectionner --</option>
                                    {field.options.map((option: string, index: number) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Input>
                            )}

                            {field.type === "date" && (
                                <Input
                                    type="date"
                                    value={responses[field.label] || ""}
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                />
                            )}
                            </FormGroup>
                        ))}

                    <h4 className="mb-4">Note totale : {totalNote}</h4>
                    <Button color="primary" onClick={handleSubmit}>
                        Envoyer la curation
                    </Button>
                </Form>
            </Container>
        </TabPane>
    );
};

export default Curation;
