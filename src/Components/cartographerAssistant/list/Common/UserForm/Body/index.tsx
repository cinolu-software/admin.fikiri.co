import React from "react";
import {Row} from 'reactstrap';
import UserLeftSideBar from "@/Components/General/Users/Common/UserForm/Body/UserLeftSidebar";
import UserTabContent from "@/Components/General/Users/Common/UserForm/Body/UserTabContent";



const Body : React.FC<{mode: string , selectedUser?: any}> = ({mode, selectedUser}) => {
    return (
        <Row className={'g-xl-5 g-3'}>
            <UserLeftSideBar/>
            <UserTabContent mode={mode}  selectedUser={selectedUser}/>
        </Row>
    )
}

export default Body;