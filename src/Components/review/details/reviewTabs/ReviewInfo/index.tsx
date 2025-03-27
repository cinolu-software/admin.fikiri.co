import React from 'react';
import {
CardBody,
    CardTitle,
    CardText,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Badge,
    Container,
    TabPane
} from 'reactstrap';
import { Calendar, FileText, Tag, User, Target } from 'react-feather';
import { useAppSelector } from "@/Redux/Hooks";


const ReviewInfo = () => {

    

    return (
        <TabPane tabId={"1"}>
            <Container className="mt-4 ms-3 pe-5" fluid>
                <Row className="mb-4">
                    
                </Row>
            </Container>
        </TabPane>
    );
};

export default ReviewInfo;
