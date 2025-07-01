import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setFilterToggle} from "@/Redux/Reducers/UserSlice";
import { Filter, Download } from "react-feather";
import React from "react";
import ManageButton from "@/CommonComponent/ManageButton";


export const UserHeader = ({ onExportCSV }: { onExportCSV?: () => void }) => {

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
           <i className={`icon-close filter-close ${filterToggle ? "show" : "hide"}`} />
        </a>
      </div>

        <button className={'btn btn-outline-primary'} onClick={onExportCSV} >
            <Download size={16} className="me-1" />
            Exporter CSV
        </button>
        <ManageButton link={'/general/users/add_user'} name={"gestion d'utilisateur"} />
    </div>
  );
};
