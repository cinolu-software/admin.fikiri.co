import React, {useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {useRouter} from "next/navigation";
import CallTabs from "@/Components/voluntaryCartographer/common/CallDetail/CallTabs";

const DetailCallContainer = () => {

    const {selectedCall} = useAppSelector(state=> state.call);
    const router = useRouter();

    useEffect(() => {
        if(!selectedCall) {
            router.push("/voluntaryCartographer");
        }
    }, [selectedCall]);

    return (
        <Container fluid>
            <BackButton link={'/voluntaryCartographer'} />
            {
                selectedCall && (
                    <>
                        <CallTabs/>
                    </>
                )
            }
        </Container>
    );
}

export default DetailCallContainer;