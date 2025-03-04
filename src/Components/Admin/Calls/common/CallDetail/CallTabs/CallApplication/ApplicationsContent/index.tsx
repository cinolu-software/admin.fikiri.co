import React from "react";
import { Col, TabContent } from "reactstrap";
import ApplicationList from "./ApplicationList";
import ApplicationDetail from "./ApplicationDetail";
import {useAppSelector} from "@/Redux/Hooks";
import {LetterBoxNavContentType} from "@/Types/Call/Application";


const ApplicationsContent: React.FC<LetterBoxNavContentType> = ({ navId }) => {

  const { interviewEmail } = useAppSelector((state) => state.application);

  return (
    <Col className="box-col-12">
      <div className="email-right-aside">
        <div className={`email-body email-list ${interviewEmail ? "hide" : "show"}`}>
          <TabContent activeTab={navId} id="email-pills-tabContent" className={'mt-2'}>
            <ApplicationList />
          </TabContent>
        </div>
        <ApplicationDetail />
      </div>
    </Col>
  );
};

export default ApplicationsContent;
