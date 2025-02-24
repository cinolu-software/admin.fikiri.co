import {Row} from "reactstrap";
import DocumentLeftSidebar from "@/Components/Applications/projects/common/DetailProject/ProjectTabs/ProjectPhase/PhaseRightSide/PhaseDocument/stepDocument/DocumentLeftSidebar";
import DocumentTabContent from "@/Components/Applications/projects/common/DetailProject/ProjectTabs/ProjectPhase/PhaseRightSide/PhaseDocument/stepDocument/DocumentTabContent";

const StepDocument = () => {

    return (
        <Row className="ps-3 pe-3 bg-white">
            <DocumentLeftSidebar />
            <DocumentTabContent/>
        </Row>
    )

}

export default StepDocument;