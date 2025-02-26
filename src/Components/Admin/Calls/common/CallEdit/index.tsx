import {Card, CardBody, Nav, NavItem, NavLink, Container, Row} from "reactstrap";
import React, {useState} from 'react'
import CallEditTabContent from "@/Components/Admin/Calls/common/CallEdit/CallEditTabContent";
import BackButton from "@/CommonComponent/BackButton";

const EditProjectTabs = () => {

    const [activeTab, setActiveTab] = useState('1');

    return (
        <Container fluid>
            <BackButton link={'/admin/call'}/>
            <Row>
                <Card>
                    <CardBody>
                        <Nav tabs className={'border-tab border-0 mb-0 nav-primary'}>
                            <NavItem>
                                <NavItem>
                                    <NavLink href='#' className={`nav-border txt-secondary ${activeTab === "1" ? "active" : ""}`} onClick={() => setActiveTab("1")}>
                                        <i className="icofont icofont-files"></i>
                                        <span>Détail du projet</span>
                                    </NavLink>
                                </NavItem>
                            </NavItem>

                            <NavItem>
                                <NavItem>
                                    <NavLink href='#' className={`nav-border txt-secondary ${activeTab === "2" ? "active" : ""}`}
                                             onClick={() => setActiveTab("2")}>
                                        <i className="fa fa-file-image-o"></i>
                                        <span>Image de couverture</span>
                                    </NavLink>
                                </NavItem>
                            </NavItem>
                        </Nav>
                        <CallEditTabContent activeTab={activeTab}/>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    )
}

export default EditProjectTabs;