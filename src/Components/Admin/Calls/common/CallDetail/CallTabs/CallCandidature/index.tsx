import React, { useState } from "react";
import { Container, Row, TabPane } from "reactstrap";
import EmailSidebar from "./EmailSidebar";
import EmailRightSide from "./EmailRightSide";

const CallCandidature = () => {

  const [navId, setNavId]= useState("1");

  return (
      <TabPane tabId={'2'}>
        <Container fluid>
          <div className="email-wrap email-main-wrapper">
            <Row>
              {/*<EmailSidebar navId={navId} setNavId={setNavId} />*/}
              <EmailRightSide navId={navId} />
            </Row>
          </div>
        </Container>
      </TabPane>
  );
};

export default CallCandidature;
