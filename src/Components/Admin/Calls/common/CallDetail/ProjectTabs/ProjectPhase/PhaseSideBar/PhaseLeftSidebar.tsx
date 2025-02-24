import React from "react";
import PhaseNavMenu from "@/Components/Applications/projects/common/CallDetail/ProjectTabs/ProjectPhase/PhaseSideBar/PhaseNavMenu";
import {PhaseLeftSidebarProps} from "@/Types/Projects/PhasesType";
import {setModalcreateProjectPhase} from "@/Redux/Reducers/projectSlice/ProjectPhaseSlice";
import {useAppDispatch} from "@/Redux/Hooks";

const PhaseLeftSidebar : React.FC<PhaseLeftSidebarProps> = ({navId, setNavId}) => {
    const dispatch = useAppDispatch();

    return (
        <div className={'my-5 bg-light-primary rounded'}>
            <div>
                <div>
                    <div className={'email-app-sidebar'}>
                        <button className={'btn btn-outline-primary emailbox'} onClick={()=>dispatch(setModalcreateProjectPhase({isOpen: true}))}>
                            <i className={'fa fa-plus'} /> Ajouter une phase
                        </button>
                        <PhaseNavMenu navId={navId} setNavId={setNavId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhaseLeftSidebar