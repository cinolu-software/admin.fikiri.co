import React from 'react';
import {
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Container,
  TabPane,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { Calendar, FileText, Tag, User, Target } from 'react-feather';
import { useAppSelector } from '@/Redux/Hooks';
import { Requirement } from '@/Types/Call/CallType';
import { imageBaseUrl } from '@/Services/axios';

const CallInfo = () => {
  const { selectedCall } = useAppSelector((state) => state.call);

  if (!selectedCall) {
    return <p className="text-center text-muted">Aucun appel sélectionné.</p>;
  }

  return (
    <TabPane tabId="1">
      <Container className="mt-4 ms-3 pe-5" fluid>
        
        <Row>
          <Col lg="12">
            <Card className="shadow-sm border-0">
              <CardBody>
                <Row className="align-items-center">
                  <Col md="2">
                    <img
                      src={`${imageBaseUrl}/calls/covers/${selectedCall.cover}`}
                      alt="Cover"
                      className="img-fluid rounded"
                      style={{ maxHeight: '120px', objectFit: 'cover' }}
                    />
                  </Col>
                  <Col md="10">
                    <CardTitle
                      tag="h4"
                      className="mb-2 d-flex align-items-center gap-2"
                    >
                      <Tag size={18} />
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
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Description */}
        <Col lg="12" className="mb-4">
          <Card className="shadow-sm border-0 rounded-3">
            <CardBody>
              <CardTitle
                tag="h5"
                className="mb-3 d-flex align-items-center gap-2 text-primary fw-semibold"
              >
                <FileText size={20} />
                Description de l'appel
              </CardTitle>
              <CardText className="text-muted fs-6">
                {selectedCall.description}
              </CardText>
            </CardBody>
          </Card>
        </Col>

        {/* Exigences */}
        <Col lg="12" className="mb-4">
          <Card className="shadow-sm border-0 rounded-3">
            <CardBody>
              <CardTitle
                tag="h5"
                className="mb-3 d-flex align-items-center gap-2 text-primary fw-semibold"
              >
                <Target size={20} />
                Exigences
              </CardTitle>
              <ListGroup flush>
                {selectedCall.requirements?.length > 0 ? (
                  selectedCall.requirements.map(
                    (req: Requirement, index: number) => (
                      <ListGroupItem
                        key={index}
                        className="border-0 ps-0 pe-0 py-2"
                      >
                        <div className="d-flex align-items-start gap-2">
                          <span className="fw-bold text-dark">{req.name} :</span>
                          <span className="text-muted">{req.description}</span>
                        </div>
                      </ListGroupItem>
                    )
                  )
                ) : (
                  <p className="text-muted">
                    Aucune exigence spécifique pour cet appel.
                  </p>
                )}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>

        {/* Formulaire */}
        <Col lg="12" className="mb-4">
          <Card className="shadow-sm border-0 rounded-3">
            <CardBody>
              <CardTitle
                tag="h5"
                className="mb-3 d-flex align-items-center gap-2 text-primary fw-semibold"
              >
                <User size={20} />
                Soumettre votre solution
              </CardTitle>

              {selectedCall.form?.length > 0 ? (
                <Form>
                  {selectedCall.form.map((field, index) => (
                    <FormGroup key={index} className="mb-4">
                      <Label className="fw-semibold mb-2">
                        {field.label}{' '}
                        {field.required && (
                          <span className="text-danger">*</span>
                        )}
                      </Label>

                      {field.type === 'text' && (
                        <Input
                          type="text"
                          required={field.required}
                          placeholder={field.label}
                          className="form-control border rounded-2 shadow-sm"
                        />
                      )}

                      {field.type === 'number' && (
                        <Input
                          type="number"
                          required={field.required}
                          placeholder={field.label}
                          className="form-control border rounded-2 shadow-sm"
                        />
                      )}

                      {field.type === 'textarea' && (
                        <Input
                          type="textarea"
                          required={field.required}
                          placeholder={field.label}
                          className="form-control border rounded-2 shadow-sm"
                          rows={4}
                        />
                      )}

                      {field.type === 'file' && (
                        <Input
                          type="file"
                          required={field.required}
                          className="form-control border rounded-2 shadow-sm"
                        />
                      )}

                      {field.type === 'date' && (
                        <Input
                          type="date"
                          required={field.required}
                          className="form-control border rounded-2 shadow-sm"
                        />
                      )}

                      {field.type === 'select' && field.options?.length > 0 && (
                        <Input
                          type="select"
                          required={field.required}
                          className="form-control border rounded-2 shadow-sm"
                        >
                          <option value="">-- Sélectionner une option --</option>
                          {field.options.map((opt: string, i: number) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </Input>
                      )}
                    </FormGroup>
                  ))}

                  <div className="text-start">
                    <Button color="primary" className="px-4 rounded-pill shadow-sm">
                      Soumettre
                    </Button>
                  </div>
                </Form>
              ) : (
                <p className="text-muted">
                  Aucun champ de formulaire défini pour cet appel.
                </p>
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
    </TabPane>
  );
};

export default CallInfo;
