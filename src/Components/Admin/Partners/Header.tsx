import React from "react";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalCreateOrganization} from "@/Redux/Reducers/OrganizationSlice";
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";

export const OrganizationHeader = () => {
    const dispatch = useAppDispatch();
    const { isOpenModalCreateOrganization} = useAppSelector(state => state.organization);

    return (
        <AddWithModalButton buttonText={'Ajouter Une Organisation'} onClick={() => dispatch(setModalCreateOrganization({isOpen: !isOpenModalCreateOrganization}))}/>
    )
}