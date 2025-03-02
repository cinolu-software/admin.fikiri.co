import React from 'react';
import {TabContent, TabPane} from 'reactstrap';
import PublishedCallListContainer from "@/Components/Admin/Calls/published";
import CallListContainer from "@/Components/Admin/Calls/all";


const TabsContent : React.FC<{basicTab: string}> = ({basicTab})=> {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <CallListContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <PublishedCallListContainer/>
            </TabPane>
        </TabContent>
    )
}

export default TabsContent;