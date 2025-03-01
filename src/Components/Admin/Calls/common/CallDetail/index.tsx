import React, {useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {useRouter} from "next/navigation";
import CallTabs from "@/Components/Admin/Calls/common/CallDetail/CallTabs";

const DetailCallContainer = () => {

    const {selectedCall} = useAppSelector(state=> state.call);
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!selectedCall) {
            router.push("/admin/call");
        }
    }, [selectedCall]);

    return (
        <Container fluid>
            <BackButton link={'/admin/call'} />
            {
                selectedCall && (
                    <>
                        {/*<CallImage cover={selectedCall?.cover} />*/}
                        <CallTabs/>
                    </>
                )
            }
        </Container>
    );
}

export default DetailCallContainer;