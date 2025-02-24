import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { PhasesNavTabs } from "@/Data/Application/Phases";
import SVG from "@/CommonComponent/SVG";


interface RightSideNavTabProps {
    tabId: string;
    setTabId: (id: string) => void;
}

const RightSideNavTab: React.FC<RightSideNavTabProps> = ({ tabId, setTabId }) => {
    return (
        <Nav className="email-tabs" id="phases-content-tab">
            {PhasesNavTabs.map((data) => (
                <NavItem key={data.id}>
                    <NavLink
                        className={tabId === data.id ? "active" : ""}
                        aria-selected={tabId === data.id}
                        onClick={() => setTabId(data.id)}
                    >
                        <SVG className="stroke-icon" iconId={data.icon} />
                        <span>{data.title}</span>
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    );
};

export default RightSideNavTab;

