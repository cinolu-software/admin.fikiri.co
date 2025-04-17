import React from "react";
import { Container, Row } from "reactstrap";
import TotalSells from "./TotalSells";
import MonthlyHistory from "@/Components/Admin/AdminHomePage/Charts/MonthlyHistory";


const HomeAdmin = () => {
  return (
    <Container fluid className="dashboard-3">
      <Row>
        <TotalSells />
      </Row>
        <Row>
            <MonthlyHistory />
        </Row>
    </Container>
  );
};

export default HomeAdmin;

