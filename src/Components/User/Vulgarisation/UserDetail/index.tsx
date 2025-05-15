import React from "react";
import {Card, Container} from "reactstrap";
import {useAppSelector} from "@/Redux/Hooks";
import BackButton from "@/CommonComponent/BackButton";
import ProfileHeader from "@/Components/General/Users/Common/UserDetails/ProfileHeader";


const UserDetailContainer = () => {

    const {selectedUser} = useAppSelector(state=>state.user);

    return (
        <Container fluid>
            <BackButton link={'/general/users'}/>
            <Card>
                <ProfileHeader selectedUser={selectedUser}/>
            </Card>
        </Container>
    );
}

export default UserDetailContainer;