import React, { useState } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input, Table } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setRequirementsAction } from "@/Redux/Reducers/CallSlice";
import { StepPropsType } from "@/Types/Call/CallType";



const StepFour: React.FC<StepPropsType> = () => {

    const dispatch = useAppDispatch();

    const { AddFormValue } = useAppSelector((state) => state.call);
    const [requirements, setRequirements] = useState(AddFormValue.requirements || []); 
    const [newRequirement, setNewRequirement] = useState({ name: "", description: "" });

    const handleAddRequirement = () => {
        if (newRequirement.name.trim() !== "" && newRequirement.description.trim() !== "") {
            const updatedRequirements = [...requirements, newRequirement];
            setRequirements(updatedRequirements);
            dispatch(setRequirementsAction({ requirements: updatedRequirements }));


            setNewRequirement({ name: "", description: "" });
        }
    };


    const handleRemoveRequirement = (index: number) => {
        const updatedRequirements = requirements?.filter((_: any, i: number) => i !== index);
        setRequirements(updatedRequirements);

        dispatch(setRequirementsAction({ requirements: updatedRequirements })); 
    };

    return (
        <div className="sidebar-body">
            <h4 className="mb-3">Critères de candidature</h4>
            <Table striped>
                <thead className=" text-center">
                    <tr>
                        <th>Nom du critère</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    AddFormValue.requirements && AddFormValue.requirements.length > 0 ? (
                        AddFormValue.requirements.map((requirement: any, index: number) => (
                            <tr key={index}>
                                <td className="align-middle">{requirement.name}</td>
                                <td className="align-middle">{requirement.description}</td>
                                <td className="align-middle text-center">
                                    <Button color="danger" size="sm" onClick={() => handleRemoveRequirement(index)}>
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center">
                                Aucun critère ajouté
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>

            <h4 className="mt-4">Ajouter un critère</h4>
            <Form>
                <Row className="align-items-center">
                    <Col md={5}>
                        <FormGroup>
                            <Label for="requirementName">Nom du critère</Label>
                            <Input
                                id="requirementName"
                                placeholder="Nom du critère"
                                value={newRequirement.name}
                                onChange={(e) => setNewRequirement({ ...newRequirement, name: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <Label for="requirementDescription">Description</Label>
                            <Input
                                id="requirementDescription"
                                type="textarea"
                                placeholder="Description"
                                value={newRequirement.description}
                                onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2} className="d-flex align-items-end">
                        <Button color="primary" onClick={handleAddRequirement}>
                            Ajouter
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default StepFour;
