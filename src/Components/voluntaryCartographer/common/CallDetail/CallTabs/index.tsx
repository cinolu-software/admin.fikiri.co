import React, {useState} from "react";
import {Card, Col, TabContent} from "reactstrap";
import TabsHeader from "./TabsHeader";
import CallInfo from "./CallInfo";

const CallTabs = () => {

    const [navId, setNavId] = useState('1');

    return (
        <Col className={'box-col-12'}>
            <div className={'email-right-aside'}>
                <Card className={`email-body `}>    
                    <TabsHeader navId={navId} setNavId={setNavId}/>
                    <TabContent  activeTab={navId} id="notifications-pills-tabContent">
                        <CallInfo />
                    </TabContent>
                </Card>
            </div>
        </Col>
    )
}

export default CallTabs