import React, { useState } from "react";
import { Button, Col, Form, Input, Label, Row, FormGroup, Table } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormField } from "@/Redux/Reducers/CallSlice";
import { StepPropsType } from "@/Types/Call/CallType";
import { toast } from "react-toastify";

const StepThree: React.FC<StepPropsType> = ({ data }) => {
    const dispatch = useAppDispatch();
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedField, setEditedField] = useState<any>(null);
    const { AddFormValue } = useAppSelector((state) => state.call);
    const [fields, setFields] = useState(AddFormValue.form);

    const [newField, setNewField] = useState({
        label: "",
        type: "text",
        required: false,
        options: [""]
    });

    const handleAddField = () => {
        // @ts-ignore
        const updatedFields = [...fields, { ...newField, id: Date.now() }];
        setFields(updatedFields);
        dispatch(setFormField({ form: updatedFields }));
        setNewField({ label: "", type: "text", required: false, options: [""] });
    };

    const handleRemoveField = (id: number) => {
        // @ts-ignore
        const updatedFields = fields.filter((field) => field.id !== id);
        setFields(updatedFields);
        dispatch(setFormField({ form: updatedFields }));
    };

    const handleEditField = (index: number, field: any) => {
        setEditingIndex(index);
        setEditedField({ ...field });
    };

    const handleSaveField = () => {
        try {
            if (editingIndex !== null && editedField) {
                // @ts-ignore
                const updatedFields = [...fields];
                updatedFields[editingIndex] = editedField;
                setFields(updatedFields);
                dispatch(setFormField({ form: updatedFields }));
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
                    <Col xs="12">
                        <h4 className="mb-3">Champs ajoutés</h4>
                        <Table striped>
                            <thead className="text-center">
                            <tr>
                                <th>Nom du champ</th>
                                <th>Type</th>
                                <th>Requis</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody className="text-center">
                            {data.form?.map((field: any, index: number) => (
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
                                    <td className="align-middle text-center">
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
                                    <td className="align-middle text-center">
                                        {
                                            editingIndex === index ? (
                                                <Button color="success" size="sm" onClick={handleSaveField} className="me-2">
                                                    Enregistrer
                                                </Button>
                                            ) : (
                                                <Button color="warning" size="sm" onClick={() => handleEditField(index, field)} className="me-2">
                                                    Modifier
                                                </Button>
                                            )
                                        }
                                        <Button color="danger" size="sm" onClick={() => handleRemoveField(field.id)}>
                                            Supprimer
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>

                    <Col xs="12" className="mt-2">
                        <h4 className="mb-3">Ajouter un champ</h4>
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
                                onChange={(e) => setNewField({ ...newField, type: e.target.value })}
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
                                {newField.options.map((option, index) => (
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
                                                ×
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                                <Button
                                    color="secondary"
                                    size="sm"
                                    onClick={() => setNewField({ ...newField, options: [...newField.options, ""] })}
                                >
                                    Ajouter une option
                                </Button>
                            </FormGroup>
                        )}

                        <Button color="primary" onClick={handleAddField}>
                            Ajouter un champ
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default StepThree;
