import React, { useState, useEffect } from "react";
import { CardBody, Button, Form, FormGroup, Label, Input, Row, Col, Spinner, TabPane } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { toast } from "react-toastify";
import {createRequirement, updateRequirement, deleteRequirement,} from "@/Redux/Reducers/projectSlice/ProjectRequiredSlice";

interface Requirement {
    id?: string;
    name: string;
    description: string;
    phase: string;
}

const PhaseRequired: React.FC<{ navId: string }> = ({ navId }) => {
    
    const dispatch = useAppDispatch();
    const { projectData } = useAppSelector((state) => state.project);

    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    // @ts-ignore
    const phase = projectData.phases.find((phase: { id: string }) => phase.id === navId);

    useEffect(() => {
        setIsLoading(true);
        if (phase?.requirements) {
            // @ts-ignore
            const sanitizedRequirements = phase.requirements.map(({ name, description, id }) => ({
                name,
                description,
                id,
            }));
            setRequirements(sanitizedRequirements);
        } else {
            setRequirements([]);
        }
        setIsLoading(false);
    }, [phase]);


    const handleAddRequirement = () => {
        const newRequirement: Requirement = {
            name: "",
            description: "",
            phase: phase?.id || "",
        };
        setRequirements([...requirements, newRequirement]);
    };

    const handleEditRequirement = (index: number, key: keyof Requirement, value: string) => {
        setRequirements((prev) =>
            prev.map((req, i) => (i === index ? { ...req, [key]: value } : req))
        );
    };

    const handleDeleteRequirement = async (id?: string, index?: number) => {
        if (id) {
            try {
                await dispatch(deleteRequirement(id)).unwrap();
                toast.success("Exigence supprimée avec succès !");
            } catch (error) {
                toast.error("Échec de la suppression de l'exigence.");
            }
        }
        setRequirements((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (!phase) return;

        setIsSaving(true);

        try {
            const newRequirements = requirements.filter((req) => !req.id);
            const existingRequirements = requirements.filter((req) => req.id);

            if (newRequirements.length > 0) {

                const payload = {
                    phase: phase.id,
                    requirements: newRequirements.map(({ name, description }) => ({ name, description })),
                };

                await dispatch(createRequirement(payload)).unwrap();
            }

            if (existingRequirements.length > 0) {

                const promises = existingRequirements.map((requirement) =>
                    dispatch(updateRequirement({ ...requirement, phase: phase.id })).unwrap()
                );

                await Promise.all(promises);
            }

            toast.success("Toutes les exigences ont été sauvegardées avec succès !");

        } catch (error) {

            toast.error("Une erreur est survenue lors de la sauvegarde.");

        } finally {

            setIsSaving(false);

        }
    };



    if(!phase) {
        return (
            <TabPane tabId="requirement-tab">
                <div className="text-center my-4 bg-white">
                    <div className={"pb-5 pt-2"}>
                        <h1>Aucune phase trouvée</h1>
                        <p>Veuillez sélectionner une phase valide pour afficher ses exigences.</p>
                    </div>
                </div>
            </TabPane>
        );
    }


    return (
        <TabPane tabId={"requirement-tab"}>
            <div className="p-3 my-5 bg-white pt-3 text-success">
                <CardBody>
                    <h5 className="mb-4">Exigences pour la phase : {phase.name}</h5>
                    {isLoading ? (
                        <div className="text-center">
                            <Spinner color="success" />
                            <p>Chargement des données...</p>
                        </div>
                    ) : (
                        <Form>
                            {requirements.map((requirement, index) => (
                                <Row key={index} className="mb-3">
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for={`name-${index}`}>Nom</Label>
                                            <Input
                                                type="text"
                                                id={`name-${index}`}
                                                value={requirement.name}
                                                placeholder="Nom de l'exigence"
                                                onChange={(e) =>
                                                    handleEditRequirement(index, "name", e.target.value)
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for={`description-${index}`}>Description</Label>
                                            <Input
                                                type="textarea"
                                                id={`description-${index}`}
                                                value={requirement.description}
                                                placeholder="Description de l'exigence"
                                                onChange={(e) =>
                                                    handleEditRequirement(index, "description", e.target.value)
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2} className="d-flex align-items-center">
                                        <Button
                                            color="danger"
                                            outline
                                            onClick={() => handleDeleteRequirement(requirement.id, index)}
                                        >
                                            Supprimer
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <Button color="primary" outline onClick={handleAddRequirement}>
                                Ajouter une Exigence
                            </Button>
                        </Form>
                    )}
                    <div className="d-flex justify-content-start mt-4">
                        <Button color="success" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? "Sauvegarde..." : "Sauvegarder les Changements"}
                        </Button>
                    </div>
                </CardBody>
            </div>
        </TabPane>
    );
};

export default PhaseRequired;


