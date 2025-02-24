import React from 'react';
import {Col, TabContent, TabPane} from "reactstrap";
import StepOne from "@/Components/Applications/projects/common/CallDetail/ProjectTabs/ProjectPhase/PhaseRightSide/PhaseDocument/stepDocument/DocumentTabContent/StepOne";
import StepTwo from "@/Components/Applications/projects/common/CallDetail/ProjectTabs/ProjectPhase/PhaseRightSide/PhaseDocument/stepDocument/DocumentTabContent/StepTwo";
import StepThree from "@/Components/Applications/projects/common/CallDetail/ProjectTabs/ProjectPhase/PhaseRightSide/PhaseDocument/stepDocument/DocumentTabContent/StepThree";
import {useAppSelector} from "@/Redux/Hooks";

const DocumentTabContent = () => {

    const { navId } = useAppSelector(state=>state.projectDocument);
    
    return (
        <>
            <Col xxl="8" xl="8" className="box-col-8 position-relative">
                <TabContent activeTab={navId}>
                    <TabPane tabId={1}>
                        <StepOne />
                    </TabPane>
                    <TabPane tabId={2}>
                        <StepTwo />
                    </TabPane>
                    <TabPane tabId={3}>
                        <StepThree />
                    </TabPane>
                </TabContent>
            </Col>
        </>
    )
}

export default DocumentTabContent;