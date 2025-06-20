"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import { Col, Container, Row, Spinner } from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {getProfile} from "@/Redux/Reducers/AuthenticationSlice";


const UserLogin = () => {

    const dispatch = useAppDispatch();

    const router = useRouter();

    const { statusAuthentication, isAuthenticated, userData} = useAppSelector(state => state.authentication);

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch]);

    const handleRoleBasedRedirection = (roles: string[]) => {

        if (roles.includes('admin')) {
            return '/admin/homeAdmin';
        }
        if(roles.includes('volunteer')) {
            return '/volunteer/homeVolunteer';
        }
        if (roles.includes('cartograph')) {
            return '/cartograph/homeCartograph';
        }
        if (roles.includes('experimentor')) {
            return '/experimentor/homeExperimentor';
        }
        if (roles.includes('explorator')) {
            return '/explorator/homeExplorator';
        }
        if (roles.includes('user')) {
            return '/user/homeUser';
        }
        if (roles.includes('cartographer-assistant')) {
            return '/cartographerAssistant/dashboard';
        }
        return process.env.NEXT_PUBLIC_HOST_CLIENT as string;
    };

    useEffect(
        () => {
            if(statusAuthentication === "succeeded" && isAuthenticated && userData)
            {
                const redirectPath = handleRoleBasedRedirection(userData.roles);
                router.push(redirectPath);
            }
            else if(statusAuthentication === 'failed')
            {
                router.push(process.env.NEXT_PUBLIC_HOST_CLIENT as string);
            }
        },
        [statusAuthentication, isAuthenticated, userData, router]
    );

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card login-dark">
            {
              statusAuthentication === "loading" && ( <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" /> )
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserLogin;