import React from 'react';
import {Container, Row} from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import FormPartner from "@/Components/Admin/Partners/Common/FormPartner";
import {useAppSelector} from "@/Redux/Hooks";

const UpdatePartner = () => {

    const { selectedPartner } = useAppSelector((state) => state.partner);

    return (
        <Container fluid>
            <BackButton link="/admin/partners" />
            <Row>
                <FormPartner mode={"edit"} />
            </Row>
        </Container>
    );
}

export default UpdatePartner;