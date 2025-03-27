import React, {useState} from "react";
import { useAppSelector } from "@/Redux/Hooks";
import {Card, Col, TabContent} from "reactstrap";
import ReviewInfo from "@/Components/review/details/reviewTabs/ReviewInfo";
import TabsHeader from "@/Components/review/details/reviewTabs/TabsHeader";

const DetailsReview = () => {

    const [navId, setNavId] = useState("1");

    const { selectedSolution } = useAppSelector((state) => state.reviewer);

    console.log("selectedSolution===>|",selectedSolution);
    
    return (
        <Col className={'box-col-12'}>
            <div className={'email-right-aside'}>
                <Card className={`email-body `}>
                    <TabsHeader navId={navId} setNavId={setNavId}/>
                    <TabContent  activeTab={navId} id="notifications-pills-tabContent">
                        <ReviewInfo/>
                    </TabContent>
                </Card>
            </div>
        </Col>
    )
}

export default DetailsReview