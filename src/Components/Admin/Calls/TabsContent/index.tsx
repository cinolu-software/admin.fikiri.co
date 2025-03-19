import React from 'react';
import {TabContent, TabPane} from 'reactstrap';
import PublishedCallListContainer from "@/Components/Admin/Calls/published";
import CallListContainer from "@/Components/Admin/Calls/all";
import {useAppSelector, useAppDispatch } from "@/Redux/Hooks";


const TabsContent : React.FC<{basicTab: string}> = ({basicTab})=> {

    const dispatch = useAppDispatch();
    const {totalAllCall, totalPublishedCall} = useAppSelector(state => state.call);

    console.log("totalAllCall: ", totalAllCall);
    console.log("totalPublishedCall: ", totalPublishedCall);


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