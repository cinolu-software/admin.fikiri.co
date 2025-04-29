import React, {useState} from 'react'
import {CardBody, Nav, NavItem, NavLink} from "reactstrap";
import TabsContent from "@/Components/Admin/Calls/common/CallDetail/CallTabs/CallApplication/CallApplicatonDetail/TabsApplication/TabsContent";


const TabsApplication = () => {

    const [basicTab, setBasicTab] = useState("1");

    return (
        <CardBody>
            <Nav tabs className="border-tab border-0 mb-0 nav-primary">
                <NavItem>
                    <NavLink className={`nav-border pt-0 nav-danger ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}>
                        <i className="icofont icofont-id-card"></i>{"Détails de la soumission"}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink  className={`nav-border nav-danger ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}>
                        <i className="icofont icofont-atom"></i>{"Phase de la solution"}
                    </NavLink>
                </NavItem>
            </Nav>
            <TabsContent basicTab={basicTab}/>
        </CardBody>
    )
}

export default TabsApplication;