import React from 'react';
import {CallSelected} from "@/Types/Call/CallType";
import {Form, FormGroup, Label, Input, Button, Row, Container} from "reactstrap";

interface CallFormApplicationProps extends CallSelected {
    formValues: {[key: string]: any};
    handleChange: (name: string, value: any) => void;
    handleSubmit: (e: React.FormEvent) => void;
    successMessage: string | null;
    errorMessage: string | null;
}

const CallFormApplication: React.FC<CallFormApplicationProps> = ({selectedCall, formValues, handleChange, handleSubmit, successMessage, errorMessage}) => {
    return (
        <Container className={'mb-3'} fluid>
            <div className={'border p-5 rounded-2'}>
                <h4 className={'mb-4 text-muted'}>{`Formulaire de candidature de l'appel : ${selectedCall.name}` }</h4>
                <Form onSubmit={handleSubmit}>
                    {selectedCall.form?.map((field, index) => (
                        <FormGroup key={index} className="mb-4">
                            <Label className="fw-semibold mb-2">
                                {field.label}{' '}
                                {field.required && <span className="text-danger">*</span>}
                            </Label>

                            {field.type === 'text' && (
                                <Input
                                    type="text"
                                    required={field.required}
                                    placeholder={field.label}
                                    className="form-control border rounded-2 shadow-sm"
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                />
                            )}

                            {field.type === 'number' && (
                                <Input
                                    type="number"
                                    required={field.required}
                                    placeholder={field.label}
                                    className="form-control border rounded-2 shadow-sm"
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                />
                            )}

                            {field.type === 'textarea' && (
                                <Input
                                    type="textarea"
                                    required={field.required}
                                    placeholder={field.label}
                                    className="form-control border rounded-2 shadow-sm"
                                    rows={4}
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                />
                            )}

                            {field.type === 'file' && (
                                <Input
                                    type="file"
                                    required={field.required}
                                    className="form-control border rounded-2 shadow-sm"
                                    onChange={(e) => handleChange(field.label, e.target.files?.[0])}
                                />
                            )}

                            {field.type === 'date' && (
                                <Input
                                    type="date"
                                    required={field.required}
                                    className="form-control border rounded-2 shadow-sm"
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                />
                            )}

                            {field.type === 'select' && field.options?.length > 0 && (
                                <Input
                                    type="select"
                                    required={field.required}
                                    className="form-control border rounded-2 shadow-sm"
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                >
                                    <option value="">-- Sélectionner une option --</option>
                                    {field.options.map((opt, i) => (
                                        <option key={i} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </Input>
                            )}
                        </FormGroup>
                    ))}

                    <div className="text-start">
                        <Button type="submit" color="primary" className="px-4 rounded-pill shadow-sm">
                            Soumettre
                        </Button>
                    </div>
                    {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                    {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
                </Form>
            </div>
        </Container>

    );
};

export default CallFormApplication;