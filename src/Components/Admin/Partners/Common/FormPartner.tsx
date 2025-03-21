import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Flip, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createPartner, updatePartner, setFormValue, createPartnerCall } from "@/Redux/Reducers/PartnersSlice/partnerSlice";
import { CreatePartner } from "@/Types/Partners/PartnerType";
import { fetchCall } from "@/Redux/Reducers/CallSlice";


const FormPartner = ({ mode = "add" }: { mode: "add" | "edit" }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { formValue, EditFormValue, status, error, selectedPartner } = useAppSelector(state => state.partner);
    const { statusCall, callData } = useAppSelector(state => state.call);
    
    const [localForm, setLocalForm] = useState<CreatePartner>(
        mode === "edit" && selectedPartner ? EditFormValue : formValue
    );

    const [selectedCallId, setSelectedCallId] = useState<string>("");

    useEffect(() => {
        if(statusCall !== 'succeeded'){
            dispatch(fetchCall());
        }
    }, [dispatch, statusCall]);

    useEffect(() => {
        if (mode === "edit" && selectedPartner) {
            setLocalForm(EditFormValue);
        }
    }, [selectedPartner, mode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!localForm.name || !localForm.link || !localForm.type) {
            toast.error("Veuillez remplir tous les champs.", { transition: Flip });
            return;
        }

        try {
            if (mode === "add") {
                if (localForm.type === "program_specific") {

                    if (!selectedCallId) {
                        toast.error("Veuillez sélectionner un appel pour le type Program Specific.", { transition: Flip });
                        return;
                    }
                    
                    await dispatch(createPartnerCall({id: selectedCallId, partnerData : localForm})).unwrap();
                    
                    toast.success("Partenaire créé et associé à l'appel avec succès !", { transition: Flip });
                } else {
                    await dispatch(createPartner(localForm)).unwrap();
                    toast.success("Partenaire créé avec succès !", { transition: Flip });
                }
            } else if (mode === "edit" && selectedPartner) {
                await dispatch(updatePartner({ id: selectedPartner.id, ...localForm })).unwrap();
                toast.success("Partenaire mis à jour avec succès !", { transition: Flip });
            }
            router.push("/admin/partners");
        } catch (err) {
            toast.error(error || "Une erreur est survenue", { transition: Flip });
        }
    };



    return (
        <Card>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md="12"> 
                            <FormGroup>
                                <Label for="name">Nom du partenaire</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={localForm.name}
                                    onChange={handleChange}
                                    placeholder="Nom du partenaire"
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <Label for="link">Lien</Label>
                                <Input
                                    type="text"
                                    name="link"
                                    id="link"
                                    value={localForm.link}
                                    onChange={handleChange}
                                    placeholder="Lien du partenaire"
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <Label for="type">Type</Label>
                                <Input
                                    type="select"
                                    name="type"
                                    id="type"
                                    value={localForm.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez un type</option>
                                    <option value="standard">Standard</option>
                                    <option value="program_specific">Program Specific</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>


                    {localForm.type === "program_specific" && (
                        <Row>
                            <Col md="12"> 
                                <FormGroup>
                                    <Label for="callId">Appel associé</Label>
                                    <Input
                                        type="select"
                                        name="callId"
                                        id="callId"
                                        value={selectedCallId}
                                        onChange={(e) => setSelectedCallId(e.target.value)}
                                        required
                                    >
                                        <option value="">Sélectionnez un appel</option>
                                        {statusCall === "loading" && (
                                            <option disabled>Chargement des appels...</option>
                                        )}
                                        {statusCall === "succeeded" && callData.map((call) => (
                                            <option key={call.id} value={call.id}>
                                                {call.name} 
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    )}

                    <Button color="primary" type="submit" disabled={status === "loading"}>
                        {status === "loading" ? "Traitement..." : mode === "add" ? "Créer" : "Mettre à jour"}
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default FormPartner;