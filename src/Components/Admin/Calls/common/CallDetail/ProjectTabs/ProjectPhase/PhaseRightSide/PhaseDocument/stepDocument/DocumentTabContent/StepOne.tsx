import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Button, Row, Col, Label, Input,  } from "reactstrap";
import { createDocument } from "@/Redux/Reducers/projectSlice/ProjectDocumentSlice";
import {Flip, toast} from "react-toastify";
import {fetchProjectPhaseById} from "@/Redux/Reducers/projectSlice/ProjectPhaseSlice";


const StepOne = () => {

    const dispatch = useAppDispatch();
    const {  selectedProjectPhase } = useAppSelector(state => state.projectPhase);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const saveToRedux = async () => {

        if (!title || !description || !selectedProjectPhase?.id) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        const newDocument = {
            title,
            description,
            phase: selectedProjectPhase?.id,
        };

        dispatch(createDocument(newDocument));
        dispatch(fetchProjectPhaseById(selectedProjectPhase.id));
        try {
            await dispatch(createDocument(newDocument));
            toast.success(
                <p className="text-white txt-16 mb-0">Document créé avec succès</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    closeOnClick: true,
                    transition: Flip,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            )
        }
        catch (error) {
            toast.error(
                <p className="text-white txt-16 mb-0">Une erreur est survenue lors de la création du document</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    transition: Flip,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            )
        }
    };

    useEffect(() => {

        if(selectedProjectPhase?.id){
            dispatch(fetchProjectPhaseById(selectedProjectPhase.id));
        }

    }, []);

    return (
        <div className="mt-5">

            <Row>
                <Col md="12">
                    <Label className="txt-secondary">Nom du document</Label>
                    <Input className="form-control mb-4" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Col>
            </Row>


            <Row>
                <Col md="12">
                    <Label className="txt-secondary">Description du document</Label>
                    <textarea rows={3} className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </Col>
            </Row>

            <Row>
                <Col className="mt-4">
                    <Button color="primary" onClick={saveToRedux} outline>
                        Sauvegarder
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default StepOne;
