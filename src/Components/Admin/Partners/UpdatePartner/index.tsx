import React from 'react';
import {Container, Row} from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import NumberingWizard from "@/Components/Applications/Partners/Common/Form";
import {useAppSelector} from "@/Redux/Hooks";

const UpdatePartner = () => {

    const { selectedPartner } = useAppSelector((state) => state.partner);

    return (
        <Container fluid>
            <BackButton link="/partners" />
            <Row>
                <NumberingWizard mode="edit" initialValues={selectedPartner} />
            </Row>
        </Container>
    );
}

export default UpdatePartner;