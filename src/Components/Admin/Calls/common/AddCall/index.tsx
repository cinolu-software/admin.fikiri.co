import React from "react";
import {Container, Row} from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import NumberingWizard from "@/Components/Admin/Calls/common/Common/NumberingWizard";


const AddProjectNewContainer = () => {

    return (
        <Container fluid>
            <BackButton link={'/admin/call'}/>
            <Row>
                <NumberingWizard mode={'add'}/>
            </Row>
        </Container>
    )
}

export default AddProjectNewContainer;