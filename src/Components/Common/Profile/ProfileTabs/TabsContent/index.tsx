import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import UserDetail from './UserDetail';
import UserImageProfile from './UserImageProfile';
import UserPassword from './UserPassword';

const TabsContent : React.FC<{basicTab : string}> = ({basicTab}) => {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <UserDetail />
            </TabPane>
            <TabPane tabId={'2'}>
                <UserImageProfile/>
            </TabPane>
            <TabPane tabId={'3'}>
                <UserPassword/>
            </TabPane>
        </TabContent>
    )
}

export default TabsContent