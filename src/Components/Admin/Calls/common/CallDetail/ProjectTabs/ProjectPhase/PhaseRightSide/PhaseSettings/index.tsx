import { TabPane, Button, Form, FormGroup, Input, Label, Row, Col, Spinner } from "reactstrap";
import React, { useState, useEffect } from "react";
import { updateProjectPhase, deleteProjectPhase, fetchProjectPhaseById } from "@/Redux/Reducers/projectSlice/ProjectPhaseSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Flip, toast } from "react-toastify";

const PhaseSettings: React.FC<{ navId: string }> = ({ navId }) => {
    const dispatch = useAppDispatch();
    const { statusPhase, selectedProjectPhase } = useAppSelector((state) => state.projectPhase);
    const [isLoading, setIsLoading] = useState(true);
    const [formValue, setFormValue] = useState({
        name: '',
        description: '',
        started_at: '',
        ended_at: '',
    });


    useEffect(() => {
        if (navId) {
            dispatch(fetchProjectPhaseById(navId));
        }
    }, [navId]);


    useEffect(() => {
        if (selectedProjectPhase) {
            setFormValue({
                name: selectedProjectPhase.name,
                description: selectedProjectPhase.description,
                started_at: selectedProjectPhase.started_at.split("T")[0],
                ended_at: selectedProjectPhase.ended_at.split("T")[0],
            });
            setIsLoading(false);
        }
    }, [selectedProjectPhase]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }));
    };


    const handleUpdate = () => {
        const updatedData = { ...formValue, id: navId };
        dispatch(updateProjectPhase(updatedData))
            .unwrap()
            .then(() => {
                toast.success("Phase mise à jour avec succès!", { transition: Flip });
            })
            .catch((error) => {
                toast.error(error, { transition: Flip });
            });
    };


    const handleDelete = () => {
        dispatch(deleteProjectPhase(navId))
            .unwrap()
            .then(() => {
                toast.success("Phase supprimée avec succès!", { transition: Flip });
            })
            .catch((error) => {
                toast.error(error, { transition: Flip });
            });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <TabPane tabId="setting-tab">
            <div className="p-3 my-5 bg-white">
                <h5 className="text-success">Paramètres de la Phase</h5>
                <Form>
                    <FormGroup>
                        <Label for="name">Nom</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formValue.name}
                            onChange={handleChange}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            id="description"
                            name="description"
                            value={formValue.description}
                            onChange={handleChange}
                            type="textarea"
                        />
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="started_at">Date de début</Label>
                                <Input
                                    id="started_at"
                                    name="started_at"
                                    value={formValue.started_at}
                                    onChange={handleChange}
                                    type="date"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="ended_at">Date de fin</Label>
                                <Input
                                    id="ended_at"
                                    name="ended_at"
                                    value={formValue.ended_at}
                                    onChange={handleChange}
                                    type="date"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-between">
                        <Button color="danger" onClick={handleDelete}>
                            Supprimer
                        </Button>
                        <Button color="primary" onClick={handleUpdate}>
                            Enregistrer les modifications
                        </Button>
                    </div>
                </Form>
            </div>
        </TabPane>
    );
};

export default PhaseSettings;
