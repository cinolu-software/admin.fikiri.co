import { Col, Row } from "reactstrap";
import { HeaderRight } from "./HeaderRight";

export const PageHeader = () => {
  return (
    <Col className="header-wrapper m-0">
      <Row>
        <HeaderRight/>
      </Row>
    </Col>
  );
};
