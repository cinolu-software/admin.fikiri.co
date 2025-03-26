import React from "react";
import {Container, Card} from "reactstrap";
import ProfileTabs from "@/Components/Common/Profile/ProfileTabs";

const Profile = () => {

    return (
        <Container fluid>
            <Card>
                <ProfileTabs />
            </Card>
        </Container>
    )
    
}

export default Profile;