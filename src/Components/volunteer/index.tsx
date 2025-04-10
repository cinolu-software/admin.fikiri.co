import React from "react";
import {Card, CardBody,} from "reactstrap";
import PublishedCallListContainer from "./published";


const Calls = () => {

    return (
        <Card>
            <CardBody>
                <PublishedCallListContainer/>
            </CardBody>
        </Card>
    )
}

export default Calls