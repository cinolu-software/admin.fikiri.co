import {MonthlyHistoryChart} from "@/Data/Admin/Chart";
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, Col, Row } from 'reactstrap';

const MonthlyHistory = () => {

    return (
        <Col md="12" className="box-col-12">
            <Card className="o-hidden">
                <div className="bar-chart-widget">
                    <CardBody className="bottom-content">
                        <Row>
                            <Col xs="12">
                                <ReactApexChart id="chart-widget4" options={MonthlyHistoryChart} series={MonthlyHistoryChart.series} type="bar" height={380}/>
                            </Col>
                        </Row>
                    </CardBody>
                </div>
            </Card>
        </Col>
    )
}

export default MonthlyHistory