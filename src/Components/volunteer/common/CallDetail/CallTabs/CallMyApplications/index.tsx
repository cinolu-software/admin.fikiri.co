import React, { useState, useEffect } from 'react';
import {Container, TabPane} from 'reactstrap';
import { useAppSelector, useAppDispatch } from '@/Redux/Hooks';
import {fetchApplicationByUser} from "@/Redux/Reducers/CallSlice/CallApplication";


const CallMyApplications = () => {

    const { selectedCall } = useAppSelector((state) => state.call);
    const {applicationDataByUser, applicationByUserStatus} = useAppSelector(state=>state.application);
    const {userData} = useAppSelector(state=>state.authentication);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if(applicationByUserStatus == 'idle' && userData) {
            dispatch(fetchApplicationByUser({userId:userData.id}));
        }
    }, [userData, applicationByUserStatus]);

    console.log("===>|",applicationDataByUser);


    return (
        <TabPane tabId="2">
            <Container className="mt-4 ms-3 pe-5" fluid>

            </Container>
        </TabPane>
    );
};

export default CallMyApplications;