import { Badge, Nav, NavItem, NavLink } from "reactstrap";
import React, {useEffect} from "react";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import {PhaseNavMenuProps} from "@/Types/Projects/PhasesType";
import {fetchProjectById} from "@/Redux/Reducers/projectSlice/projectSlice";


const PhaseNavMenu: React.FC<PhaseNavMenuProps> = ({ navId, setNavId }) => {

    const { projectData, publishedProjectStatus, selectedProject } = useAppSelector(state => state.project);
    const { status } = useAppSelector(state => state.projectPhase)
    // @ts-ignore
    const phases = projectData?.phases || [];
    const dispatch = useAppDispatch()

    const getPhaseStatus = (startDate: string, endDate: string): { status: string, color: string } => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) {
            return { status: "À venir", color: "primary" };
        } else if (now >= start && now <= end) {
            return { status: "En cours", color: "warning" };
        } else {
            return { status: "Terminée", color: "success" };
        }
    };

    const truncateText = (text: string, maxLength: number): string => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    useEffect(() => {
        if (status === "succeeded") {
            // @ts-ignore
            const projectId = selectedProject.id;
            dispatch(fetchProjectById(projectId));
        }
    }
    , [publishedProjectStatus, selectedProject, status]);

    return (
        <Nav pills tabs className="main-menu email-category border-0">
            {phases.length > 0 ? (
                phases.map((phase: any, index: number) => {
                    const { status, color } = getPhaseStatus(phase.started_at, phase.ended_at);
                    return (
                        <NavItem key={index}>
                            <NavLink
                                className={navId === phase.id ? "active" : ""}
                                onClick={() => setNavId(phase.id)}
                            >
                                <div>
                                    {truncateText(phase.name, 15)}
                                </div>
                                <Badge color={color} pill className="ms-2">
                                    {status}
                                </Badge>
                            </NavLink>
                        </NavItem>
                    );
                })
            ) : (
                <div className="text-muted">Aucune phase disponible</div>
            )}
        </Nav>
    );
};

export default PhaseNavMenu;


