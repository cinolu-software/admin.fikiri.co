import React, { useState } from "react";
import { Container, Row, TabPane } from "reactstrap";
import ApplicationsContent from "@/Components/Admin/Calls/common/CallDetail/CallTabs/CallApplication/ApplicationsContent";

const CallApplication = () => {

  const [navId, setNavId]= useState("1");

  return (
      <TabPane tabId={'2'}>
        <Container fluid>
          <div className="email-wrap email-main-wrapper">
            <Row>
              <ApplicationsContent navId={navId} />
            </Row>
          </div>
        </Container>
      </TabPane>
  );
};

export default CallApplication;