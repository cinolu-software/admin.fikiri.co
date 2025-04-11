import React, {useEffect} from 'react';
import {  Container } from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import {useAppSelector} from "@/Redux/Hooks";
import {useRouter} from "next/navigation";
import CallTabs from "@/Components/volunteer/common/CallDetail/CallTabs";

const DetailCallContainer = () => {

    const {selectedCall} = useAppSelector(state=> state.call);
    const router = useRouter();

    useEffect(() => {
        if(!selectedCall) {
            router.push("/volunteer");
        }
    }, [selectedCall]);


    return (
        <Container fluid>
            <BackButton link={'/volunteer'} />
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