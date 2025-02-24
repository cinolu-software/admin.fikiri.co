import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import EditProjectContainer from "@/Components/Applications/projects/common/CallEdit/EditInfoProject";
import AttachmentProject from "@/Components/Applications/projects/common/CallEdit/AttachmentProject";



const ProjectEditTabContent: React.FC<{activeTab: string}> = ({activeTab}) => {

    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId={'1'}>
                <EditProjectContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <AttachmentProject/>
            </TabPane>
        </TabContent>
    )
}

export default ProjectEditTabContent;
