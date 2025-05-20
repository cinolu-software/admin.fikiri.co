import React from 'react';
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



const TableSkeleton = () => {

    return (
        <Container fluid>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            {/* Header Skeleton */}
                            <div className="list-product-header d-flex justify-content-between align-items-center mb-4">
                                <Skeleton height={30} width={250}/>
                            </div>

                            <div className="dataTables_filter d-flex justify-content-end mb-4">
                                <Skeleton height={35} width={250}/>
                            </div>
                            {/* Table Skeleton */}
                            <div className="table-responsive">
                                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                                    <thead>
                                    <tr className="my-5">
                                        <th style={{ width: '50%', padding: '10px' }}>
                                            <Skeleton height={25} width={300} style={{ maxWidth: '250px' }} />
                                        </th>
                                        <th style={{ width: '25%', padding: '10px' }}>
                                            <Skeleton height={25} width={150} style={{ maxWidth: '150px' }} />
                                        </th>
                                        <th style={{ width: '25%', padding: '10px' }}>
                                            <Skeleton height={25} width={150} style={{ maxWidth: '150px' }} />
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Array(10).fill(null).map((_, rowIndex) => (
                                        <tr key={rowIndex} style={{ borderBottom: '1px solid #ddd' }}>
                                            <td style={{ padding: '10px' }}>
                                                <div className="d-flex flex-wrap align-items-center gap-3">
                                                    <Skeleton height={40} width={40} />
                                                    <Skeleton height={15} width={300} style={{ maxWidth: '300px' }} />
                                                </div>
                                            </td>

                                            <td style={{ padding: '10px' }}>
                                                <Skeleton height={15} width={200} style={{ maxWidth: '200px' }} />
                                            </td>

                                            <td style={{ padding: '10px' }}>
                                                <div className="d-flex flex-wrap gap-2 justify-content-start">
                                                    {Array(3).fill(null).map((_, iconIndex) => (
                                                        <Skeleton
                                                            key={iconIndex}
                                                            height={30}
                                                            width={30}
                                                            circle={true}
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>


                            <div className="d-flex flex-wrap justify-content-end align-items-center mt-4">
                                <Skeleton height={20} width={200} style={{ maxWidth: '200px' }} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TableSkeleton;