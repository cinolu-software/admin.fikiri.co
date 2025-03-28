import React from 'react';
import {
    Card, CardBody, CardTitle, Row, Col, ListGroup, ListGroupItem, Badge, Container, TabPane
} from 'reactstrap';
import { Calendar, FileText, User, CheckCircle, XCircle, Phone, Home } from 'react-feather';
import { useAppSelector } from "@/Redux/Hooks";

const Curation = () => {
    const { selectedSolution } = useAppSelector(state => state.reviewer);

    if (!selectedSolution) {
        return <p>Chargement des données...</p>;
    }

    const call = selectedSolution.call;
    const user = selectedSolution.user; 

    return (
        <TabPane tabId={"2"}>
            <Container className="mt-4 ms-3 p-5" fluid>             

            </Container>
        </TabPane>
    );
};

export default Curation;