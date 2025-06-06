import React, { useState } from "react";
import { CardHeader } from "reactstrap";
import { DashboardCommonHeaderType } from "@/Types/Home";
import { CommonDropdown } from "./CommonDropdown";

const CommonHeader: React.FC<DashboardCommonHeaderType> = ({ title ,tagClass, dropDownFalse,children}) => {
    return (
      <CardHeader className="card-no-border pb-0 d-flex justify-content-between">
        <h5 className={tagClass ? tagClass : ""}>{title}</h5>
        {
          !dropDownFalse ? 
            // <CommonDropdown/>
            <></> 
            : null
          }
        {children}
      </CardHeader>
    );
  };
  
  export default CommonHeader;