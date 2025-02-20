import React from "react";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md="12" className="footer-copyright d-flex flex-wrap align-items-center justify-content-between">
            <p className="mb-0 f-w-600">Copyright 2025 PNUD © Fikiri Tableau de bord tous droits réservés</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
