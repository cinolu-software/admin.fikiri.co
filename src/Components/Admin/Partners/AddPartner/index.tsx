import React from "react";
import {Container, Row} from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import NumberingWizard from "@/Components/Applications/Partners/Common/NumberingWizard";


const AddPartnerContainer = () => {

    return (
        <Container fluid>
            <BackButton link="/partners" />
            <Row>
                <NumberingWizard mode="add" />
            </Row>
        </Container>
    )
}

export default AddPartnerContainer;