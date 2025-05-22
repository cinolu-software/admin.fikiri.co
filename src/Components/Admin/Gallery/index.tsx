import React from 'react';
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";


const Gallery = () => {
    return (
        <Container fluid>
            <Row>
                <Col md="12">
                    <Card>
                        <CardBody>
                            <CommonCardHeader title={'Galerie'}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Gallery