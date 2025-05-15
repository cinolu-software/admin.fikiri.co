import { Card, CardBody, Container, Row, Col, CardHeader, Nav, NavItem, NavLink } from "reactstrap";
import React, { useState } from 'react';
import TabUserContent from "./TabUserContent";

const TabUser = () => {

    const [activeTab, setActiveTab] = useState('1');

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card className="mb-4">
                        <CardBody>
                            <Nav tabs className="border-tab border-0 mb-0 nav-primary">
                                <NavItem>
                                    <NavLink className={`nav-border txt-secondary ${activeTab === "1" ? "active" : ""}`} onClick={() => setActiveTab('1')}>
                                        <i className="bi bi-person"></i>
                                        <span>Ajout utilisateur</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={`nav-border txt-secondary ${activeTab === "2" ? "active" : ""}`} onClick={() => setActiveTab('2')}>
                                        <i className="bi bi-pencil"></i>
                                        <span>Modification utilisateur</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabUserContent activeTab={activeTab}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}    

export default TabUser;
