import { TabPane, Button, Form, FormGroup, Input, Label, Row, Col, Spinner } from "reactstrap";
import React, { useState, useEffect } from "react";
import { updateProjectPhase } from "@/Redux/Reducers/projectSlice/ProjectPhaseSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Flip, toast } from "react-toastify";

const PhaseForm: React.FC<{ navId: string }> = ({ navId }) => {

    const dispatch = useAppDispatch();
    const { projectData } = useAppSelector((state) => state.project);
    const [formFields, setFormFields] = useState<any[]>([]);
    const [newField, setNewField] = useState({
        label: "",
        name: "",
        required: false,
        type: "text",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // @ts-ignore
    const phase = projectData.phases.find((phase: { id: string }) => phase.id === navId);

    useEffect(() => {
        setIsLoading(true);
        if (phase?.form?.inputs) {
            setFormFields(phase.form.inputs);
        } else {
            setFormFields([]);
        }
        setIsLoading(false);
    }, [phase]);

    const handleAddField = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newField.label && newField.name) {
            setFormFields([...formFields, newField]);
            setNewField({ label: "", name: "", required: false, type: "text" });
        }
    };

    const handleFieldChange = (index: number, key: string, value: any) => {
        const updatedFields = [...formFields];
        updatedFields[index] = { ...updatedFields[index], [key]: value };
        setFormFields(updatedFields);
    };

    const handleDeleteField = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };

    const handleSavePhase = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!phase) return;

        setIsSaving(true);
        try {
            const updatedPhase = {
                ...phase,
                form: { ...phase.form, inputs: formFields },
            };
            await dispatch(updateProjectPhase(updatedPhase));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Phase mise à jour avec succès !"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        } catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Une erreur est survenue lors de la mise à jour."}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        } finally {
            setIsSaving(false);
        }
    };

    if (!phase) {
        return (
            <TabPane tabId="form-tab">
                <div className="text-center my-4 bg-white">
                    <div className={'pb-5 pt-2'}>
                        <h1>Aucune phase trouvée</h1>
                        <p>Veuillez sélectionner une phase valide pour afficher le formulaire.</p>
                    </div>
                </div>
            </TabPane>
        );
    }

    return (
        <TabPane tabId="form-tab">
            <div className="p-3 my-5 bg-white pt-3 text-success">
                <div>
                    <h4 className="ms-4 pb-3 border-bottom">
                        Générateur de formulaire pour la phase : {phase.name}
                    </h4>
                </div>
                {isLoading ? (
                    <div className="text-center">
                        <Spinner color="success" />
                        <p>Chargement des données...</p>
                    </div>
                ) : (
                    <div>
                        <Form>
                            <div className="mb-4 ms-4 mt-3">
                                <div className={'mb-4'}>
                                    <h5 className="pb-3 border-bottom">Champs existants</h5>
                                </div>
                                {formFields.length > 0 ? (
                                    formFields.map((field, index) => (
                                        <Row key={field.name || index} className="mb-3 align-items-center">
                                            <Col md="3">
                                                <Input bsSize="sm" type="text" value={field.label} onChange={(e) => handleFieldChange(index, "label", e.target.value)} placeholder="Label"/>
                                            </Col>
                                            <Col md="3">
                                                <Input type="text" value={field.name} onChange={(e) => handleFieldChange(index, "name", e.target.value)} placeholder="Nom" bsSize="sm"/>
                                            </Col>
                                            <Col md="2">
                                                <Input bsSize="sm" type="select" value={field.type} onChange={(e) => handleFieldChange(index, "type", e.target.value)}>
                                                    <option value="text">Texte</option>
                                                    <option value="textarea">Textarea</option>
                                                    <option value="number">Nombre</option>
                                                    <option value="email">Email</option>
                                                </Input>
                                            </Col>
                                            <Col md="2">
                                                <FormGroup check>
                                                    <Label check> <Input type="checkbox" checked={field.required} onChange={(e) => handleFieldChange(index, "required", e.target.checked)}/>
                                                        Requis
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="2">
                                                <button
                                                    type="button"
                                                    className={'btn btn-outline-danger btn-sm'}
                                                    onClick={(e) => handleDeleteField(e, index)}
                                                >
                                                    Supprimer
                                                </button>
                                            </Col>
                                        </Row>
                                    ))
                                ) : (
                                    <p>Aucun champ existant pour cette phase.</p>
                                )}
                            </div>

                            <div className="mb-4 ">
                                <div className={'mb-4'}>
                                    <h5 className="ms-4 pb-3 border-bottom">
                                        Ajouter un nouveau champ
                                    </h5>
                                </div>
                                <Row className="mb-3 align-items-center ms-3">
                                    <Col md="3">
                                        <Input type="text" value={newField.label} onChange={(e) => setNewField({ ...newField, label: e.target.value })} placeholder="Label" bsSize="sm"/>
                                    </Col>
                                    <Col md="3">
                                        <Input type="text" value={newField.name} onChange={(e) => setNewField({ ...newField, name: e.target.value })} placeholder="Nom" bsSize="sm"/>
                                    </Col>
                                    <Col md="2">
                                        <Input type="select" value={newField.type} onChange={(e) => setNewField({ ...newField, type: e.target.value })} bsSize="sm">
                                            <option value="text">Texte</option>
                                            <option value="textarea">Textarea</option>
                                            <option value="number">Nombre</option>
                                            <option value="email">Email</option>
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" checked={newField.required} onChange={(e) => setNewField({...newField, required: e.target.checked,})}/>
                                                Requis
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <button type="button" className={'btn btn-outline-primary btn-sm'} onClick={handleAddField}>Ajouter</button>
                                    </Col>
                                </Row>
                            </div>

                            <div className="text-start ms-4 mt-5">
                                <button type="button" className={'btn btn-outline-primary btn-sm'} onClick={handleSavePhase} disabled={isSaving}>
                                    {isSaving ? "Sauvegarde..." : "Sauvegarder la phase"}
                                </button>
                            </div>
                        </Form>
                    </div>
                )}
            </div>
        </TabPane>
    );
};

export default PhaseForm;