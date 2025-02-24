import React from "react";
import RightSideNavTab from "@/Components/Applications/projects/common/DetailProject/ProjectTabs/ProjectPhase/PhaseRightSide/RightSideHeader/RightSideNavTab";


interface RightSideHeaderProps {
    tabId: string;
    setTabId: (id: string) => void;
}

const RightSideHeader: React.FC<RightSideHeaderProps> = ({ tabId, setTabId }) => {
    return (
        <div className="mail-header-wrapper">
            <div className="mail-header">
                <div className="form-check form-check-inline m-0">

                    <RightSideNavTab tabId={tabId} setTabId={setTabId} />
                </div>
            </div>
        </div>
    );
};

export default RightSideHeader;
