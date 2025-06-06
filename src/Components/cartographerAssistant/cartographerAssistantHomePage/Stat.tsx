import React from 'react';
import { Card, CardBody, Col, Spinner } from "reactstrap";
import CommonHeader from "@/Components/Admin/AdminHomePage/common/CommonHeader";
import {ImagePath} from "@/Constant";

interface StatProps {
    className: string;
    title: string;
    image: string;
    count: number | null;
    icon: string;
    color: string;
}

const Stat: React.FC<StatProps> = ({ className, title, image, count, icon, color }) => {
    return (
        <Col xl={'3'} sm={6}>
            <Card>
                <CommonHeader title={title} />
                <CardBody className={`pb-3 ${className}`}>
                    <div className={'d-flex align-items-center gap-2'}>
                        <div className="flex-shrink-0">
                            <img src={`${ImagePath}/dashboard-3/icon/${image}`} alt="icon" />
                        </div>
                        <div className="">
                            <div className="d-flex align-items-center">
                                <h3>
                                    {count !== null
                                        ? count
                                        : <Spinner
                                            color={color}
                                            size="sm"
                                            className="ms-2"
                                        />
                                    }
                                </h3>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Stat;