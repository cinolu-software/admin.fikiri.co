import React from 'react';
import {Container} from "reactstrap";
import {toast, ToastContainer, Flip} from "react-toastify";
import BackButton from "@/CommonComponent/BackButton";
import UserForm from "@/Components/General/Users/Common/UserForm";


const CreateUser = () => {

    return (
        <Container fluid>

            <BackButton link={"/general/users"}/>
            <UserForm mode="create"/>
            <ToastContainer />
        </Container>
    )
}

export default CreateUser;