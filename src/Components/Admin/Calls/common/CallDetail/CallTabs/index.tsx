import React, {useState} from "react";
import {Card, Col, TabContent} from "reactstrap";
import CallInfo from "@/Components/Admin/Calls/common/CallDetail/CallTabs/CallInfo";
import CallApplication from "@/Components/Admin/Calls/common/CallDetail/CallTabs/CallApplication";
import CallCurators from "@/Components/Admin/Calls/common/CallDetail/CallTabs/CallCurators";
import TabsHeader from "@/Components/Admin/Calls/common/CallDetail/CallTabs/TabsHeader";

const CallTabs = () => {

    const [navId, setNavId] = useState('1');

    return (
        <Col className={'box-col-12'}>
            <div className={'email-right-aside'}>
                <Card className={`email-body `}>
                    <TabsHeader navId={navId} setNavId={setNavId}/>
                    <TabContent  activeTab={navId} id="notifications-pills-tabContent">
                        <CallInfo />
                        <CallApplication />
                        <CallCurators />
                    </TabContent>
                </Card>
            </div>
        </Col>
    )
}

export default CallTabs