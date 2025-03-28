import React, {useState} from "react";
import {Card, Col, TabContent} from "reactstrap";
import ReviewInfo from "@/Components/review/details/reviewTabs/ReviewInfo";
import TabsHeader from "@/Components/review/details/reviewTabs/TabsHeader";
import Curation from "@/Components/review/details/reviewTabs/Curation";

const DetailsReview = () => {

    const [navId, setNavId] = useState("1");
    
    return (
        
        <Col className={'box-col-12'}>
            <div className={'email-right-aside'}>
                <Card className={`email-body `}>
                    <TabsHeader navId={navId} setNavId={setNavId}/>
                    <TabContent  activeTab={navId} id="notifications-pills-tabContent">
                        <ReviewInfo/>
                        <Curation/>
                    </TabContent>
                </Card>
            </div>
        </Col>
    )
}

export default DetailsReview