import React, {useState} from 'react'
import {CardBody, Nav, NavItem, NavLink} from "reactstrap";
import { userProfileBasicInfo, userProfileSecurity, userProfileImage} from "@/Constant";
import TabsContent from "@/Components/Common/Profile/ProfileTabs/TabsContent";


const ProfileTabs = () => {

    const [basicTab, setBasicTab] = useState("1");

    return (
        <CardBody>
            <Nav tabs className="border-tab border-0 mb-0 nav-primary">
                <NavItem>
                    <NavLink className={`nav-border pt-0 nav-danger ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}>
                        <i className="icofont icofont-info-square"></i>{userProfileBasicInfo}
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink  className={`nav-border nav-danger ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}>
                        <i className="icofont icofont-file-tiff"></i>{userProfileImage}
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink  className={`nav-border nav-danger ${basicTab === "3" ? "active" : ""}`} onClick={() => setBasicTab("3")}>
                        <i className="icofont icofont-ui-lock"></i>{userProfileSecurity}
                    </NavLink>
                </NavItem>
            </Nav>
            <TabsContent basicTab={basicTab}/>
        </CardBody>
    )
}

export default ProfileTabs