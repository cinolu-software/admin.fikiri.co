import React from "react";
import { Container, Row } from "reactstrap";
import TotalSells from "./TotalSells";


const HomeUser = () => {
  return (
    <Container fluid className="dashboard-3">
      <Row>
        <TotalSells />
      </Row>
    </Container>
  );
};

export default HomeUser;

