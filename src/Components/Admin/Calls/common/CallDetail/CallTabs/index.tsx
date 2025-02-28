import React, {useState} from "react";
import {Card, Col, TabContent} from "reactstrap";

// import TabsHeader from "@/Components/Applications/projects/common/CallDetail/CallTabs/TabsHeader";
// import CallInfo from "@/Components/Applications/projects/common/CallDetail/CallTabs/CallInfo";
// import CallPhase from "@/Components/Applications/projects/common/CallDetail/CallTabs/CallPhase";
// import ProjectRapportViewer from "@/Components/Applications/projects/common/CallDetail/CallTabs/CallReport";
// import CallIndicator from "@/Components/Applications/projects/common/CallDetail/CallTabs/CallIndicator";
import CallInfo from "@/Components/Admin/Calls/common/CallDetail/CallTabs/CallInfo";
import CallCandidature from "@/Components/Admin/Calls/common/CallDetail/CallTabs/CallCandidature";

import TabsHeader from "@/Components/Admin/Calls/common/CallDetail/CallTabs/TabsHeader";

const CallTabs = () => {

    const [navId, setNavId] = useState('1');

    return (
        <Col className={'box-col-12'}>
            <div className={'email-right-aside'}>
                <Card className={`email-body `}>
                    <TabsHeader navId={navId} setNavId={setNavId}/>
                    <TabContent  activeTab={navId} id="notifications-pills-tabContent">
                        <CallInfo/>
                        <CallCandidature/>
                        {/*<CallIndicator/>*/}
                        {/*<ProjectRapportViewer/>*/}
                    </TabContent>
                </Card>
            </div>
        </Col>
    )
}

export default CallTabs