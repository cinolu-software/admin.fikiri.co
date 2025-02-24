import {Col} from "reactstrap";
import { TabPane} from "reactstrap";
import React from "react";
import StepDocument from "@/Components/Applications/projects/common/CallDetail/ProjectTabs/ProjectPhase/PhaseRightSide/PhaseDocument/stepDocument";

const PhaseDocument: React.FC<{navId: string}> = ({navId}) => {

    return (
        <TabPane tabId="document-tab">
            <div className="p-3 my-5 bg-white">
                <Col xxl="12" xl="12" className="box-col-12">
                    <div className="email-right-aside">
                        <StepDocument/>
                    </div>
                </Col>
            </div>
        </TabPane>
    )

}

export default PhaseDocument;