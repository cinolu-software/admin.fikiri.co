import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import InfoApplication from "@/Components/Admin/Calls/common/CallDetail/CallTabs/CallApplication/CallApplicatonDetail/TabsApplication/TabsContent/InfoApplication";
import UpdateStatusApplication from "@/Components/Admin/Calls/common/CallDetail/CallTabs/CallApplication/CallApplicatonDetail/TabsApplication/TabsContent/UpdateStatus";


const TabsContent : React.FC<{basicTab : string}> = ({basicTab}) => {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <InfoApplication/>
            </TabPane>
            <TabPane tabId={'2'}>
                <UpdateStatusApplication/>
            </TabPane>
            <TabPane tabId={'3'}>

            </TabPane>
        </TabContent>
    )
}

export default TabsContent