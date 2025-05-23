import React from 'react';
import {Card, CardBody, Col, Container, Row, Button, FormGroup} from "reactstrap";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {PlusSquare} from "react-feather";
import SVG from "@/CommonComponent/SVG";


const Gallery = () => {
    return (
        <Container fluid>

            <Row>
                <Card>
                    <CardBody>
                        <CommonCardHeader title={'Galerie'}/>
                    </CardBody>
                </Card>
            </Row>

        </Container>
    )
}

export default Gallery