import React from "react";
import {Container, Row} from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import NumberingWizard from "@/Components/Applications/projects/common/Common/NumberingWizard";


const AddProjectNewContainer = () => {

    return (
        <Container fluid>
            <BackButton link={'/project'}/>
            <Row>
                <NumberingWizard mode={'add'}/>
            </Row>
        </Container>
    )
}

export default AddProjectNewContainer;