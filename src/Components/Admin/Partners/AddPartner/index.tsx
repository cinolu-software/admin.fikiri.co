import React from "react";
import {Container, Row} from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import FormPartner from "@/Components/Admin/Partners/Common/FormPartner";

const AddPartnerContainer = () => {

    return (
        <Container fluid>
            <BackButton link="/admin/partners" />
            <Row>
                <FormPartner mode={"add"} />
            </Row>
        </Container>
    )
}

export default AddPartnerContainer;