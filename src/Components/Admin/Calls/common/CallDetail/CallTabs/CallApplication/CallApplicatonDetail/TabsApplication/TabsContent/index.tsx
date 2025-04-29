import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import InfoApplication from "@/Components/Admin/Calls/common/CallDetail/CallTabs/CallApplication/CallApplicatonDetail/TabsApplication/TabsContent/InfoApplication";


const TabsContent : React.FC<{basicTab : string}> = ({basicTab}) => {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <InfoApplication/>
            </TabPane>
            <TabPane tabId={'2'}>

            </TabPane>
            <TabPane tabId={'3'}>

            </TabPane>
        </TabContent>
    )
}

export default TabsContent