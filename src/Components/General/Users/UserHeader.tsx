import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setFilterToggle} from "@/Redux/Reducers/UserSlice";
import { Filter } from "react-feather";
import React from "react";
import ManageButton from "@/CommonComponent/ManageButton";

export const UserHeader = () => {

  const {filterToggle} = useAppSelector(state=>state.user)

  const dispatch = useAppDispatch();

  const handleFilterToggle = () => {
    dispatch(setFilterToggle());
  }

  return (
    <div>
      <div className="light-box" onClick={handleFilterToggle}>
        <a>
          <Filter className={`filter-icon ${filterToggle ? "hide" : "show"}`} />
          {/* <i className={`icon-close filter-close ${filterToggle ? "show" : "hide"}`} /> */}
        </a>
      </div>
        <ManageButton link={'/general/users/add_user'} name={"gestion d'utilisateur"} />
    </div>
  );

};
