import {Nav, NavItem, NavLink} from 'reactstrap';
import {Href} from "@/Constant";
import React from 'react';
import SVG from '@/CommonComponent/SVG';

interface CallNavTabProps {
    navId: string;
    setNavId: React.Dispatch<any>
}


const CallCartographerNavTabs = [
    {
        title: "Candidatures",
        icon: "candidature_call",
        id: "1",
    },
];

const ProjectNavTab : React.FC<CallNavTabProps> = ({navId, setNavId}) => {

    return (
        <Nav className={'email-tabs'} id={'program-pills-tabContent'}>
            {
                CallCartographerNavTabs.map((data, i) => (
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