import {Nav, NavItem, NavLink} from 'reactstrap';
import {Href} from "@/Constant";
import React from 'react';
import SVG from '@/CommonComponent/SVG';

interface ProjectNavTabProps {
    navId: string;
    setNavId: React.Dispatch<any>
}

const ProjectNavTabs = [
    {
        title: "Informations",
        icon: "info_program",
        id: "1",
    },
    {
        title: "Phases de l'activité",
        icon: "program_phase",
        id: "2",
    },
    {
        title: "Indicateurs de l'activité",
        icon: "program_criteria",
        id: "3",
    },
    {
        title: "Rapports",
        icon: "program_report",
        id: "4",
    },
];

const ProjectNavTab : React.FC<ProjectNavTabProps> = ({navId, setNavId}) => {

    return (
        <Nav className={'email-tabs'} id={'program-pills-tabContent'}>
            {
                ProjectNavTabs.map((data, i) => (
                    <NavItem key={i}>
                        <NavLink className={navId === data.id ? "active" : ""} id={data.id} href={Href} onClick={()=>setNavId(data.id)} >
                            <SVG className="stroke-icon" iconId={data.icon} />
                            <span>{data.title} </span>
                        </NavLink>
                    </NavItem>
                ))
            }
        </Nav>
    )
}

export default ProjectNavTab;