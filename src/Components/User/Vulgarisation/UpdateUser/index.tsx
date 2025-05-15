import React from 'react';
import {Container} from "reactstrap";
import {ToastContainer} from "react-toastify";
import BackButton from "@/CommonComponent/BackButton";
import UserForm from "@/Components/General/Users/Common/UserForm";
import {useAppSelector} from "@/Redux/Hooks";


const UpdateUser = () => {

    const {selectedUser} = useAppSelector(state => state.user);

    return (
        <Container fluid>
            <BackButton link={"/general/users"}/>
            <UserForm mode="edit" initialData={selectedUser} />
            <ToastContainer />
        </Container>
    )
}

export default UpdateUser;