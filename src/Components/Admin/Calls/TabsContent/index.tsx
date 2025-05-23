import React from 'react';
import {TabContent, TabPane} from 'reactstrap';
import PublishedCallListContainer from "@/Components/Admin/Calls/published";
import CallListContainer from "@/Components/Admin/Calls/all";
import {useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import GalleryCall from "@/Components/Admin/Calls/common/CallEdit/GalleryCall";


const TabsContent : React.FC<{basicTab: string}> = ({basicTab})=> {

    const dispatch = useAppDispatch();
    const {totalAllCall, totalPublishedCall} = useAppSelector(state => state.call);


    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <CallListContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <PublishedCallListContainer/>
            </TabPane>
            <TabPane tabId={'3'}>
                <GalleryCall/>
            </TabPane>
        </TabContent>
    )
}

export default TabsContent;