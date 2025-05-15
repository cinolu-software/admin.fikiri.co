import React from 'react';
import SVG from '@/CommonComponent/SVG';
import {AddUser} from "@/Data/Admin/Users";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setNavId} from "@/Redux/Reducers/UserSlice";
import { Col, Nav, NavItem, NavLink } from "reactstrap";

const UserLeftSideBar = () => {
    const {navId} = useAppSelector((state)=>state.user)
    const dispatch = useAppDispatch()

    return (
        <Col xxl="4" xl="4" className="box-col-4e sidebar-left-wrapper mb-2 add-product-tab">
            <Nav pills className="sidebar-left-icons border-0" tabs>
                {AddUser.map((data, i) => (
                    <NavItem key={i}>
                        <NavLink className="border-0" active={navId === data.id} onClick={()=>dispatch(setNavId(data.id))}>
                            <div className="nav-rounded">
                                <div className="product-icons">
                                    <SVG className="stroke-icon" iconId={data.icon} />
                                </div>
                            </div>
                            <div className="product-tab-content">
                                <h5>{data.title}</h5>
                            </div>
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
        </Col>
    );
}

export default UserLeftSideBar