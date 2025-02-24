import React, {useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import ProjectImage from "@/Components/Applications/projects/common/CallDetail/ProjectImage";
import ProjectTabs from "@/Components/Applications/projects/common/CallDetail/ProjectTabs";
import {useRouter} from "next/navigation";
import {fetchProjectById} from "@/Redux/Reducers/projectSlice/projectSlice";


const DetailProjectContainer = () => {

    const {selectedProject, projectData} = useAppSelector(state=> state.project);
    const router = useRouter();
    const dispatch = useAppDispatch();


    useEffect(() => {
        if(selectedProject){
            dispatch(fetchProjectById(selectedProject.id));
        }
        else {
            router.push('/project');
        }
    }, [selectedProject]);

    return (
        <Container fluid>
            <BackButton link={'/project'} />
            {
                projectData && (
                    <>
                        <ProjectImage image={projectData?.image} />
                        <ProjectTabs/>
                    </>
                )
            }
        </Container>
    );
}

export default DetailProjectContainer;