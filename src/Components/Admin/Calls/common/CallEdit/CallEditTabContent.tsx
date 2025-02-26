import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import EditCallContainer from "@/Components/Admin/Calls/common/CallEdit/EditInfoCall";
import AttachmentCall from "@/Components/Admin/Calls/common/CallEdit/AttachmentCall";


const CallEditTabContent: React.FC<{activeTab: string}> = ({activeTab}) => {

    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId={'1'}>
                <EditCallContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <AttachmentCall/>
            </TabPane>
        </TabContent>
    )
}

export default CallEditTabContent;
