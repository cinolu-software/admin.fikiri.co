import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setFilterToggle} from "@/Redux/Reducers/CallSlice";
import { Filter } from "react-feather";
import AddButton from "@/CommonComponent/AddButton";
import {AddCall} from "@/Constant";

export const    CallHeader = () => {

    const dispatch = useAppDispatch();
    const { filterToggle } = useAppSelector((state) => state.call);

    return (
        <div>
            <div className={'light-box'} onClick={() => dispatch(setFilterToggle())}>
                <a>
                    <Filter className={`filter-icon ${filterToggle ? "hide" : "show"}`} />
                    <i className={`icon-close filter-close ${filterToggle ? "show" : "hide"}`} />
                </a>
            </div>
            <AddButton link={'/admin/call/add_call'} name={AddCall} />
        </div>
    );
};

