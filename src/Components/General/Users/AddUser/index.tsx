import React from 'react';
import {Container} from "reactstrap";
import {ToastContainer} from "react-toastify";
import BackButton from "@/CommonComponent/BackButton";
import TabUser from "@/Components/General/Users/AddUser/TabUser";


const CreateUser = () => {

    return (
        <Container fluid>

            <BackButton link={"/general/users"}/>
            {/* <UserForm mode="create"/>
            <ToastContainer /> */}
            <TabUser/>
            <ToastContainer />
        </Container>
    )
}

export default CreateUser;