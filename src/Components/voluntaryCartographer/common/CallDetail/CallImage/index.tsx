import React from 'react';
import { Card, CardBody, Col, Row} from "reactstrap";
import {imageBaseUrl} from "@/Services/axios";


const CallImage : React.FC<{cover: string | null }> = ({cover}) => {

    return (
        <>
            <Row className={'program-detail'}>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <img src={cover ? `${imageBaseUrl}/projects/${cover}` : ''} alt={''}  className={'cover-image'} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CallImage