import React, { useState } from "react";
import { Button, Col, Form, Input, Label, Row, FormGroup, Table } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormField } from "@/Redux/Reducers/CallSlice";
import { StepPropsType, FormField } from "@/Types/Call/CallType";
import { toast } from "react-toastify";

const StepFive: React.FC<StepPropsType> = ({ data }) => {
    const dispatch = useAppDispatch();
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedField, setEditedField] = useState<any>(null);
    const { AddFormValue } = useAppSelector((state) => state.call);
    const [fields, setFields] = useState(AddFormValue.review_form || []);

    const [newField, setNewField] = useState<FormField>({
        id: 0,
        label: "",
        type: "text",
        required: false,
        options: [""]
    });

    const [selectedPhase, setSelectedPhase] = useState<string>("");
    const phases = ["Cartographie", "Exploration", "Experimentation"];

    const handleAddField = () => {
        const updatedFields = [...fields, { ...newField, id: Date.now(), phase: selectedPhase }];
        //@ts-ignore
        setFields(updatedFields);
        dispatch(setFormField({ curationForm: updatedFields }));
        setNewField({ id: Date.now(), label: "", type: "text", required: false, options: [""] });
    };

    const handleRemoveField = (id: number) => {
        //@ts-ignore
        const updatedFields = fields.filter((field) => field.id !== id);
        setFields(updatedFields);
        dispatch(setFormField({ curationForm: updatedFields }));
    };

    const handleEditField = (index: number, field: FormField) => {
        setEditingIndex(index);
        setEditedField({ ...field });
    };

    const handleSaveField = () => {
        try {
            if (editingIndex !== null && editedField) {
                const updatedFields = [...fields];
                updatedFields[editingIndex] = editedField;
                setFields(updatedFields);
                dispatch(setFormField({ curationForm: updatedFields }));
                setEditingIndex(null);
                setEditedField(null);
                toast.success("Champ mis à jour avec succès", {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } catch (error) {
            toast.error("Erreur lors de la mise à jour du champ", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    return (
        <div className="sidebar-body">
            <Form className="theme-form theme-form-2 mega-form">
                <Row className="g-2 mx-5">
                    <Col xs="12" className="mb-4">
                        <FormGroup>
                            <Label for="phaseSelect">Sélectionner une phase</Label>
                            <Input
                                id="phaseSelect"
                                type="select"
                                value={selectedPhase}
                                onChange={(e) => setSelectedPhase(e.target.value)}
                            >
                                <option value="">-- Choisir une phase --</option>
                                {phases.map((phase, index) => (
                                    <option key={index} value={phase}>{phase}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col xs="12">
                        <h4 className="mb-3">Champs de curation ajoutés</h4>
                        <Table striped>
                            <thead className="text-center">
                                <tr>
                                    <th>Nom du champ</th>
                                    <th>Type</th>
                                    <th>Requis</th>
                                    <th>Phase</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {fields.map((field: any, index: number) => (
                                    <tr key={field.id}>
                                        <td className="align-middle">
                                            {editingIndex === index ? (
                                                <Input
                                                    value={editedField?.label || ""}
                                                    onChange={(e) =>
                                                        setEditedField({ ...editedField, label: e.target.value })
                                                    }
                                                />
                                            ) : (
                                                field.label
                                            )}
                                        </td>
                                        <td className="align-middle">
                                            {editingIndex === index ? (
                                                <Input
                                                    type="select"
                                                    value={editedField?.type || "text"}
                                                    onChange={(e) =>
                                                        setEditedField({ ...editedField, type: e.target.value })
                                                    }
                                                >
                                                    <option value="text">Texte</option>
                                                    <option value="number">Nombre</option>
                                                    <option value="textarea">Zone de texte</option>
                                                    <option value="file">Fichier</option>
                                                    <option value="date">Date</option>
                                                    <option value="select">Sélection</option>
                                                </Input>
                                            ) : (
                                                field.type
                                            )}
                                        </td>
                                        <td className="align-middle">
                                            {editingIndex === index ? (
                                                <Input
                                                    type="checkbox"
                                                    checked={editedField?.required || false}
                                                    onChange={(e) =>
                                                        setEditedField({
                                                            ...editedField,
                                                            required: e.target.checked
                                                        })
                                                    }
                                                />
                                            ) : (
                                                field.required ? "Oui" : "Non"
                                            )}
                                        </td>
                                        <td className="align-middle">{field.phase || "-"}</td>
                                        <td className="align-middle text-center">
                                            {editingIndex === index ? (
                                                <Button color="success" size="sm" onClick={handleSaveField} className="me-2">
                                                    Enregistrer
                                                </Button>
                                            ) : (
                                                <Button color="warning" size="sm" onClick={() => handleEditField(index, field)} className="me-2">
                                                    Modifier
                                                </Button>
                                            )}
                                            <Button color="danger" size="sm" onClick={() => handleRemoveField(field.id)}>
                                                Supprimer
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>

                    {selectedPhase && (
                        <Col xs="12" className="mt-2">
                            <h4 className="mb-3">Ajouter un champ de curation</h4>
                            <FormGroup>
                                <Label for="fieldLabel">Nom du champ</Label>
                                <Input
                                    id="fieldLabel"
                                    placeholder="Nom du champ"
                                    value={newField.label}
                                    onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="fieldType">Type de champ</Label>
                                <Input
                                    id="fieldType"
                                    type="select"
                                    value={newField.type}
                                    onChange={(e) => setNewField({ ...newField, type: e.target.value as FormField['type'] })}
                                >
                                    <option value="text">Texte</option>
                                    <option value="number">Nombre</option>
                                    <option value="textarea">Zone de texte</option>
                                    <option value="file">Fichier</option>
                                    <option value="date">Date</option>
                                    <option value="select">Sélection</option>
                                </Input>
                            </FormGroup>

                            <FormGroup check>
                                <Label for="fieldRequired">Requis</Label>
                                <Input
                                    id="fieldRequired"
                                    type="checkbox"
                                    checked={newField.required}
                                    onChange={() => setNewField({ ...newField, required: !newField.required })}
                                />
                            </FormGroup>

                            {newField.type === "select" && (
                                <FormGroup>
                                    <Label>Options du Select</Label>
                                    {newField.options.map((option: string, index: number) => (
                                        <Row key={index} className="align-items-center mb-2">
                                            <Col xs="10">
                                                <Input
                                                    placeholder={`Option ${index + 1}`}
                                                    value={option}
                                                    onChange={(e) => {
                                                        const updatedOptions = [...newField.options];
                                                        updatedOptions[index] = e.target.value;
                                                        setNewField({ ...newField, options: updatedOptions });
                                                    }}
                                                />
                                            </Col>
                                            <Col xs="2">
                                                <Button
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        const updatedOptions = newField.options.filter((_, i) => i !== index);
                                                        setNewField({ ...newField, options: updatedOptions });
                                                    }}
                                                >
                                                    Supprimer
                                                </Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    <Button
                                        color="primary"
                                        size="sm"
                                        onClick={() => setNewField({ ...newField, options: [...newField.options, ""] })}
                                    >
                                        Ajouter une option
                                    </Button>
                                </FormGroup>
                            )}

                            <Button color="primary" className="mt-3" onClick={handleAddField}>
                                Ajouter le champ
                            </Button>
                        </Col>
                    )}
                </Row>
            </Form>
        </div>
    );
};

export default StepFive;
