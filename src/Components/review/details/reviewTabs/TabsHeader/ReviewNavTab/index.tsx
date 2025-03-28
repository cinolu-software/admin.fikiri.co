import {Nav, NavItem, NavLink} from 'reactstrap';
import {Href} from "@/Constant";
import React from 'react';
import SVG from '@/CommonComponent/SVG';

interface ReviewNavTabProps {
    navId: string;
    setNavId: React.Dispatch<any>
}

const ReviewNavTabs = [
    {
        title: "Informations",
        icon: "info_call",
        id: "1",
    },
    {
        title: "Curation",
        icon: "candidature_call",
        id: "2",
    },
];

const ReviewNavTab : React.FC<ReviewNavTabProps> = ({navId, setNavId}) => {

    return (
        <Nav className={'email-tabs'} id={'program-pills-tabContent'}>
            {
                ReviewNavTabs.map((data, i) => (
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

export default ReviewNavTab;