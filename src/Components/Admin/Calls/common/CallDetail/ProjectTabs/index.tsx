import React, {useState} from "react";
import {Card, Col, TabContent} from "reactstrap";

import TabsHeader from "@/Components/Applications/projects/common/CallDetail/ProjectTabs/TabsHeader";
import ProjectInfo from "@/Components/Applications/projects/common/CallDetail/ProjectTabs/ProjectInfo";
import ProjectPhase from "@/Components/Applications/projects/common/CallDetail/ProjectTabs/ProjectPhase";
import ProjectRapportViewer from "@/Components/Applications/projects/common/CallDetail/ProjectTabs/ProjectReport";
import ProjectIndicator from "@/Components/Applications/projects/common/CallDetail/ProjectTabs/ProjectIndicator";

const ProjectTabs = () => {

    const [navId, setNavId] = useState('1');

    return (
        <Col className={'box-col-12'}>
            <div className={'email-right-aside'}>
                <Card className={`email-body email-list`}>
                    <TabsHeader navId={navId} setNavId={setNavId}/>
                    <TabContent  activeTab={navId} id="notifications-pills-tabContent">
                        <ProjectInfo/>
                        <ProjectPhase/>
                        <ProjectIndicator/>
                        <ProjectRapportViewer/>
                    </TabContent>
                </Card>
            </div>
        </Col>
    )
}

export default ProjectTabs