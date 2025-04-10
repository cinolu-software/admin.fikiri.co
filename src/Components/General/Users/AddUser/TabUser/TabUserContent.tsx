import React from 'react';
import { TabContent, TabPane } from 'reactstrap';
import UserForm from "@/Components/General/Users/Common/UserForm";
import UpdateMultiple from './UpdateMultipleUser';

const TabUserContent: React.FC<{ activeTab: string}> = ({ activeTab }) => {

    return (
        
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <UserForm mode="create"/>
            </TabPane>
            <TabPane tabId="2">
                <UpdateMultiple/>
            </TabPane>
        </TabContent>
    )
}
    
export default TabUserContent;
