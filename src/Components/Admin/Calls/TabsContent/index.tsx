import React from 'react';
import {TabContent, TabPane} from 'reactstrap';
import PublishedProjectListContainer from "@/Components/Applications/projects/published";
import ProjectListContainer from "@/Components/Applications/projects/all";


const TabsContent : React.FC<{basicTab: string}> = ({basicTab})=> {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <ProjectListContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <PublishedProjectListContainer/>
            </TabPane>
        </TabContent>
    )
}

export default TabsContent;