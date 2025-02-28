import { Card, Col, TabContent } from "reactstrap";
import EmailHeader from "./EmailHeader";
import ComposeEmailModal from "./ComposeEmailModal";
import SentContent from "./SentContent";
import InboxContent from "./InboxContent";
import StarredContent from "./StarredContent";
import DraftContent from "./DraftContent";
import TrashContent from "./TrashContent";
import WorkContent from "./WorkContent";
import PrivateContent from "./PrivateContent";
import SupportContent from "./SupportContent";
import AddLabelModal from "./AddLabelModal";
import InterviewMail from "./InterviewMail";
import {useAppSelector} from "@/Redux/Hooks";
import {LetterBoxNavContentType} from "@/Types/Call/Application";

const EmailRightSide: React.FC<LetterBoxNavContentType> = ({ navId }) => {
  const { interviewEmail } = useAppSelector((state) => state.letterBox);

  return (
    <Col className="box-col-12">
      <div className="email-right-aside">
        <div className={`email-body email-list ${interviewEmail ? "hide" : "show"}`}>
          {/*<ComposeEmailModal />*/}
          {/*<EmailHeader />*/}
          <TabContent activeTab={navId} id="email-pills-tabContent" className={'mt-2'}>
            <InboxContent />
            <SentContent />
            <StarredContent />
            <DraftContent />
            <TrashContent />
            <WorkContent />
            <PrivateContent />
            <SupportContent />
            <AddLabelModal />
          </TabContent>
        </div>
        <InterviewMail />
      </div>
    </Col>
  );
};

export default EmailRightSide;
