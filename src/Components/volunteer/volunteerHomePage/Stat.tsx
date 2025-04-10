import React from 'react';
import { Card, CardBody, Col } from "reactstrap";
import CommonHeader from "@/Components/Admin/AdminHomePage/common/CommonHeader";
import {ImagePath} from "@/Constant";

interface StatProps {
    className: string;
    title: string;
    image: string;
    count: number;
    icon: string;
    color: string;
}

const Stat: React.FC<StatProps> = ({ className, title, image, count, icon, color }) => {

    return (
        <Col xl={'3'} sm={6}>
            <Card>
                <CommonHeader title={title} />
                <CardBody className={`pb-5 ${className}`}>
                    <div className={'d-flex align-items-center gap-3'}>
                        <div className="flex-shrink-0">
                            <img src={`${ImagePath}/dashboard-3/icon/${image}`} alt="icon" />
                        </div>
                        <div className="">
                            <div className="d-flex align-items-center">
                                <h2>{count}</h2>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Stat;
