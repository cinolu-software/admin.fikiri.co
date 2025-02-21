import React from "react";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalCreateRole} from "@/Redux/Reducers/RoleSlice";
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";

export const RoleHeader = () => {
    const dispatch = useAppDispatch();
    const { isOpenModalCreateRole } = useAppSelector(state => state.role);

    return (
        <AddWithModalButton buttonText={'Ajouter un Rôle'} onClick={() => dispatch(setModalCreateRole({isOpen: !isOpenModalCreateRole}))}/>
    )
}