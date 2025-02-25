import React, { useState } from "react";
import { Button, Col, Form, Input, Label, Row, FormGroup, Table } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { addFormField, removeFormField } from "@/Redux/Reducers/CallSlice";
import { StepPropsType } from "@/Types/Call/CallType";

const StepThree: React.FC<StepPropsType> = ({ data }) => {
    const dispatch = useAppDispatch();
    const { AddFormValue } = useAppSelector((state) => state.call);
    const [newField, setNewField] = useState({
        label: "",
        type: "text",
        required: false,
        options: [""]
    });

    const handleAddField = () => {
        dispatch(addFormField({ ...newField, id: Date.now() }));
        setNewField({ label: "", type: "text", required: false, options: [""] });
    };

    const handleRemoveField = (index: number) => {
        dispatch(removeFormField(index));
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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                            {data.form?.map((field: any, index: number) => (
                                <tr key={field.id}>
                                    <td className="align-middle">{field.label}</td>
                                    <td className="align-middle">{field.type}</td>
                                    <td className="align-middle text-center">{field.required ? "Oui" : "Non"}</td>
                                    <td className="align-middle text-center">
                                        <Button color="danger" size="sm" onClick={() => handleRemoveField(index)}>
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
                                        <Col xs="2" className="text-center">
                                            {newField.options.length > 1 && (
                                                <Button
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() =>
                                                        setNewField({
                                                            ...newField,
                                                            options: newField.options.filter((_, i) => i !== index),
                                                        })
                                                    }
                                                >
                                                    ×
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                ))}
                                <Button color="secondary" size="sm" className="mt-2" onClick={() => setNewField({ ...newField, options: [...newField.options, ""] })}>
                                    Ajouter une option
                                </Button>
                            </FormGroup>
                        )}

                        <FormGroup check className="mt-2">
                            <Label check>
                                <Input
                                    type="checkbox"
                                    checked={newField.required}
                                    onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                                />{" "}
                                Requis
                            </Label>
                        </FormGroup>

                        <Button color="primary" size="sm" onClick={handleAddField} className="mt-3">
                            Ajouter
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default StepThree;
