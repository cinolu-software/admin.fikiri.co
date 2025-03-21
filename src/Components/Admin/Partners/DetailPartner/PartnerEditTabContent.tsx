import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import EditPartnerInfo from "@/Components/Admin/Partners/DetailPartner/EditPartnerInfo";
import PartnerLogo from "@/Components/Admin/Partners/DetailPartner/PartnerLogo";

const PartnerEditTabContent: React.FC<{activeTab : string}> = ({activeTab}) => {

    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <EditPartnerInfo/>
            </TabPane>
            <TabPane tabId="2">
                <PartnerLogo/>
            </TabPane>
        </TabContent>
    )
}
export default PartnerEditTabContent;
