import React, { useState } from 'react';
import {CardBody, CardTitle, CardText, Row, Col, ListGroup, ListGroupItem, Container, TabPane, Card, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Calendar, FileText, Tag, User, Target } from 'react-feather';
import { useAppSelector, useAppDispatch } from '@/Redux/Hooks';
import { submitSolution } from '@/Redux/Reducers/CallSlice/CallApplication';
import { imageBaseUrl } from '@/Services/axios';
import {ImagePath} from "@/Constant";


const CallInfo = () => {

  const { selectedCall } = useAppSelector((state) => state.call);
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  if (!selectedCall) {
    return <p className="text-center text-muted">Aucun appel sélectionné.</p>;
  }

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => {
      const updatedValues = { ...prev, [name]: value };
      return updatedValues;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    for (const field of selectedCall.form) {
      if (field.required && !formValues[field.label]) {
        setErrorMessage(`Le champ "${field.label}" est requis.`);
        return;
      }
    }

    const responses = selectedCall.form.reduce((acc, field) => {

      if (field.label && formValues[field.label] !== undefined) {
        //@ts-ignore
        acc[field.label] = formValues[field.label];
      } else {
        console.warn(`Champ ${field.label} manquant ou sans valeur.`);
      }
      return acc;

    }, {});

    dispatch(
      submitSolution({
        call: selectedCall.id,
        responses, 
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setSuccessMessage('Soumission réussie !');
        setFormValues({});
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setErrorMessage('Erreur lors de la soumission.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    });
  };

  return (
    <TabPane tabId="1">
      <Container className="mt-4 ms-3 pe-5" fluid>
        <Row>
          <Col lg="12">
            <div className="shadow-sm border-0 mb-3">
              <div className="p-3">
                <Row className="align-items-center">
                  <Col md="2">
                    <img
                        src={
                          selectedCall?.cover
                              ? `${imageBaseUrl}/calls/covers/${selectedCall.cover}`
                                  : `${ImagePath}/calls/call.jpg`
                        }
                        alt={"Cover"}
                        className={"img-fluid rounded"}
                        style={{maxHeight: '120px', objectFit: 'cover'}}
                    />
                  </Col>
                  <Col md="10">
                    <CardTitle
                      tag="h4"
                      className="mb-2 d-flex align-items-center gap-2"
                    >
                      {selectedCall.name}
                    </CardTitle>
                    <CardText className="text-muted d-flex align-items-center gap-2">
                      <Calendar size={16} />
                      Période :{' '}
                      {new Date(selectedCall.created_at).toLocaleDateString()} -{' '}
                      {new Date(selectedCall.ended_at).toLocaleDateString()}
                    </CardText>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>


        <Col lg="12" className="mb-4">
          <div className="shadow-sm border-0 ">
            <div className="p-3">
              <div
                
                className="mb-3 d-flex align-items-center gap-2 text-primary fw-semibold"
              >
                <FileText size={20} />
                Description de l'appel
              </div>
              <div className="text-muted fs-6">
                {selectedCall.description}
              </div>
            </div>
          </div>
        </Col>

 
        <Col lg="12" className="mb-4">
          <div className="shadow-sm border-0 ">
            <div className="p-3">
              <div
                className="mb-3 d-flex align-items-center gap-2 text-primary fw-semibold"
              >Soumission réussie !
                <Target size={20} />
                Exigences
              </div>
              <ListGroup flush>
                {selectedCall.requirements?.length > 0 ? (
                  selectedCall.requirements.map((req, index) => (
                    <ListGroupItem
                      key={index}
                      className="border-0 ps-0 pe-0 py-2"
                    >
                      <div className="d-flex align-items-start gap-2">
                        <span className="fw-bold text-dark">{req.name} :</span>
                        <span className="text-muted">{req.description}</span>
                      </div>
                    </ListGroupItem>
                  ))
                ) : (
                  <p className="text-muted">
                    Aucune exigence spécifique pour cet appel.
                  </p>
                )}
              </ListGroup>
            </div>
          </div>
        </Col>

        
        <Col lg="12" className="mb-4">
          <Card className="shadow-sm border-0 rounded-3">
            <CardBody>
              <CardTitle
                tag="h5"
                className="mb-3 d-flex align-items-center gap-2 text-primary fw-semibold"
              >
                <User size={20} />
                Soumettre la solution
              </CardTitle>

              {selectedCall.form?.length > 0 ? (
                <Form onSubmit={handleSubmit}>
                  {selectedCall.form.map((field, index) => (
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
                </Form>
              ) : (
                <p className="text-muted">
                  Aucun champ de formulaire défini pour cet appel.
                </p>
              )}

              {successMessage && <p className="text-success mt-3">{successMessage}</p>}
              {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

            </CardBody>
          </Card>
        </Col>
      </Container>
    </TabPane>
  );
};

export default CallInfo;
