import React from 'react';
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {NavItem, NavLink} from "reactstrap";

const AddPhase = () => {

    return (
        <NavItem>
            <NavLink href="#" className="btn bnt-outline-primary ">
                <i className="fas fa-plus"></i> Ajouter une Phase
            </NavLink>
        </NavItem>
    )
}

export default AddPhase;