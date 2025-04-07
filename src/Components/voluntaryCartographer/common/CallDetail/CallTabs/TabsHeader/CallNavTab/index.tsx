import {Nav, NavItem, NavLink} from 'reactstrap';
import React from 'react';
import SVG from '@/CommonComponent/SVG';

interface CallNavTabProps {
    navId: string;
    setNavId: React.Dispatch<any>
}

const CallNavTabs = [
    {
        title: "Informations",
        icon: "info_call",
        id: "1",
    },
    // {
    //     title: "Candidatures",
    //     icon: "candidature_call",
    //     id: "2",
    // },
    // {
    //     title: "Curateur",
    //     icon: "candidature_curator",
    //     id: "3",
    // },
    // {
    //     title: "Rapports",
    //     icon: "program_report",
    //     id: "4",
    // },
];

const ProjectNavTab : React.FC<CallNavTabProps> = ({navId, setNavId}) => {

    return (
        <Nav className={'email-tabs'} id={'program-pills-tabContent'}>
            {
                CallNavTabs.map((data, i) => (
                    <NavItem key={i}>
                        <NavLink className={navId === data.id ? "active" : ""} id={data.id} onClick={()=>setNavId(data.id)} >
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