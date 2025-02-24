import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner, Col } from 'reactstrap';
import NumberingWizard from "@/Components/Applications/projects/common/Common/NumberingWizard";
import { fetchProjectById } from "@/Redux/Reducers/projectSlice/projectSlice";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";

const EditProjectContainer = () => {

    const { selectedProject, status } = useAppSelector((state) => state.project);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (selectedProject === null) {
            router.push('/project');
        } else {
            if (selectedProject?.id) {
                dispatch(fetchProjectById(selectedProject?.id));
            }
        }
    }, [selectedProject]);

    if (status === 'loading') {
        return (
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner color="primary" />
            </Container>
        );
    }

    return (
        <Container fluid>
            <Row>
                <NumberingWizard mode={'edit'} initialValues={selectedProject}  />
            </Row>
        </Container>
    );
};

export default EditProjectContainer;
