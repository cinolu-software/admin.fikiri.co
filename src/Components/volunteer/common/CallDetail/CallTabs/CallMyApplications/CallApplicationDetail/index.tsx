import React, { useEffect, useState } from "react";
import BackButton from "@/CommonComponent/BackButton";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { imageBaseUrl } from "@/Services/axios";
// import { updateApplication } from "@/Redux/Reducers/CallSlice/CallApplication";
import { toast } from "react-toastify";

const safeFormatDate = (dateStr?: string | null, formatStr = "dd MMMM yyyy") => {
    const date = dateStr ? new Date(dateStr) : null;
    return date && !isNaN(date.getTime()) ? format(date, formatStr, { locale: fr }) : "Non renseignée";
};

const CallApplicationDetail = () => {

    const { selectedApplication } = useAppSelector(state => state.application);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (selectedApplication) {
            setFormValues(selectedApplication.responses);
        }
    }, [selectedApplication]);

    const handleChange = (label: string, value: any) => {
        setFormValues(prev => ({
            ...prev,
            [label]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!selectedApplication) return;

            // const result = await dispatch(updateApplication({
            //     applicationId: selectedApplication.id,
            //     data: {
            //         responses: formValues
            //     }
            // }));

            // if (result.meta.requestStatus === 'fulfilled') {
            //     toast.success("Modifications enregistrées avec succès !", {
            //         autoClose: 3000,
            //         position: toast.POSITION.TOP_CENTER
            //     });
            // } else {
            //     throw new Error("Erreur lors de la mise à jour");
            // }
        } catch (error) {
            toast.error("Une erreur est survenue lors de l'enregistrement", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!selectedApplication) return null;

    return (
        <div className="container-fluid">
            <BackButton link={"/volunteer"} />

            <Row>
                <Card className="shadow-sm mb-4">
                    <CardBody>
                        <Row className="mb-3 mt-3 border border-1 p-3">
                            <h3 className="mb-3 mb-3">Mes informations</h3>

                            <Col xs={6}>
                                <div className="d-flex flex-column gap-2">
                                    <div>
                                        <span className="fw-bold">Nom :</span>{' '}
                                        {selectedApplication.user.name}
                                    </div>
                                    <div>
                                        <span className="fw-bold">Email :</span>{' '}
                                        {selectedApplication.user.email}
                                    </div>
                                    <div>
                                        <span className="fw-bold">Téléphone :</span>{' '}
                                        {selectedApplication.user.phone_number || "Non renseigné"}
                                    </div>
                                </div>
                            </Col>
                            <Col xs={6} >
                                <div className="d-flex flex-column gap-2">
                                    <div>
                                        <span className="fw-bold">Appel :</span>{' '}
                                        {selectedApplication.call.name}
                                    </div>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <div>
                                        <span className="fw-bold">Date de soumission :</span>{' '}
                                        {safeFormatDate(selectedApplication.created_at)}
                                    </div>
                                    <div>
                                        <span className="fw-bold">Dernière modification :</span>{' '}
                                        {safeFormatDate(selectedApplication.updated_at)}
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-3 mt-3 border border-1 p-3">
                            <>
                                <h3 className="mb-3">Détails de l'appel</h3>
                                <Row>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <span className="fw-bold">Période :</span>{' '}
                                            {safeFormatDate(selectedApplication.call.started_at)} -{' '}
                                            {safeFormatDate(selectedApplication.call.ended_at)}
                                        </div>
                                        <div className="mb-3">
                                            <span className="fw-bold">Description :</span>{' '}
                                            {selectedApplication.call.description}
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <span className="fw-bold">Exigences :</span>
                                            <ul className="mt-2">
                                                {selectedApplication.call.requirements?.map((req, index) => (
                                                    <li key={index}>
                                                        <span className="fw-semibold">{req.name} :</span>{' '}
                                                        {req.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        </Row>

                        <Row className="mb-3 mt-3 border border-1 p-3">
                            <>
                                <h3 className="mb-4">Détails de la candidature</h3>
                                <Form
                                    // onSubmit={handleSubmit}
                                >
                                    {selectedApplication.call.form?.map((field, index) => (
                                        <FormGroup key={field.id} className="mb-4">
                                            <Label className="fw-bold">
                                                {field.label}
                                                {field.required && <span className="text-danger">*</span>}
                                            </Label>

                                            {field.type === 'text' && (
                                                <Input
                                                    type="text"
                                                    value={formValues[field.label] || ''}
                                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            )}

                                            {field.type === 'number' && (
                                                <Input
                                                    type="number"
                                                    value={formValues[field.label] || ''}
                                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            )}

                                            {field.type === 'textarea' && (
                                                <Input
                                                    type="textarea"
                                                    rows={4}
                                                    value={formValues[field.label] || ''}
                                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            )}

                                            {field.type === 'date' && (
                                                <Input
                                                    type="date"
                                                    value={formValues[field.label] || ''}
                                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            )}

                                            {field.type === 'select' && field.options?.length > 0 && (
                                                <Input
                                                    type="select"
                                                    value={formValues[field.label] || ''}
                                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                                    disabled={isSubmitting}
                                                >
                                                    <option value="">-- Sélectionner --</option>
                                                    {field.options.map((option, i) => (
                                                        <option key={i} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </Input>
                                            )}

                                            {field.type === 'file' && (
                                                <div>
                                                    {formValues[field.label] ? (
                                                        <div className="d-flex align-items-center gap-3">
                                                            <a
                                                                href={`${imageBaseUrl}/documents/${formValues[field.label]}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Fichier actuel
                                                            </a>
                                                            <Input
                                                                type="file"
                                                                onChange={(e) => handleChange(field.label, e.target.files?.[0])}
                                                                disabled={isSubmitting}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <Input
                                                            type="file"
                                                            onChange={(e) => handleChange(field.label, e.target.files?.[0])}
                                                            disabled={isSubmitting}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </FormGroup>
                                    ))}

                                    <div className="d-flex justify-content-end gap-2 mt-4">
                                        <Button
                                            type="button"
                                            color="secondary"
                                            onClick={() => router.back()}
                                            disabled={isSubmitting}
                                        >
                                            Annuler
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            disabled
                                        >
                                            {/*{isSubmitting ? (*/}
                                            {/*    <Spinner size="sm" color="light" />*/}
                                            {/*) : (*/}
                                            {/*    "Enregistrer les modifications"*/}
                                            {/*)}*/}
                                            Enregistrer les modifications
                                        </Button>
                                    </div>
                                </Form>
                            </>

                        </Row>
                    </CardBody>
                </Card>
            </Row>

        </div>
    );
};

export default CallApplicationDetail;
