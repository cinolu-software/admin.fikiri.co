import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFilterToggle } from "@/Redux/Reducers/projectSlice/projectSlice";
import { Filter } from "react-feather";
import AddButton from "@/CommonComponent/AddButton";
import {AddActivity} from "@/Constant";

export const ProjectHeader = () => {

    const dispatch = useAppDispatch();
    const { filterToggle } = useAppSelector((state) => state.project);

    return (
        <div>
            <div className={'light-box'} onClick={() => dispatch(setFilterToggle())}>
                <a>
                    <Filter className={`filter-icon ${filterToggle ? "hide" : "show"}`} />
                    <i className={`icon-close filter-close ${filterToggle ? "show" : "hide"}`} />
                </a>
            </div>
            <AddButton link={'/project/new'} name={AddActivity} />
        </div>
    );
};

