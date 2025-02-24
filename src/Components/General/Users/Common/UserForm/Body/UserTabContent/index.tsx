import React from "react";
import { Col, TabContent, TabPane } from "reactstrap";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useAppSelector } from "@/Redux/Hooks";
import CommonButton from "@/Components/General/Users/Common/CommonButton";


const UserTabContent : React.FC<{mode: string , selectedUser?: any}> = ({mode, selectedUser}) =>  {

    const {navId} = useAppSelector((state)=> state.user);

    return (
        <>
            <Col xxl="8" xl="8" className="box-col-8 position-relative">
                <TabContent activeTab={navId}>
                    <TabPane tabId={1}>
                        <StepTwo mode={mode} />
                    </TabPane>
                    <TabPane tabId={2}>
                        <StepThree selectedUser={selectedUser}/>
                    </TabPane>
                </TabContent>
            </Col>
            <CommonButton/>

        </>
    );
}

export default UserTabContent