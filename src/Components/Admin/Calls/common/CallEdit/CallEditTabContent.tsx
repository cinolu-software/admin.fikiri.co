import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import EditCallContainer from "@/Components/Admin/Calls/common/CallEdit/EditInfoCall";
import AttachmentCall from "@/Components/Admin/Calls/common/CallEdit/AttachmentCall";
import GalleryCall from "@/Components/Admin/Calls/common/CallEdit/GalleryCall";


const CallEditTabContent: React.FC<{activeTab: string}> = ({activeTab}) => {

    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId={'1'}>
                <EditCallContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <AttachmentCall/>
            </TabPane>
            <TabPane tabId={'3'}>
                <GalleryCall/>
            </TabPane>
        </TabContent>
    )
}

export default CallEditTabContent;
