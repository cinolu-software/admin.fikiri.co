import React, { useEffect, useMemo } from "react";
import { Card, CardBody, Col, Collapse, Row, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";


export const CollapseFilterData = () => {

    // const { filterToggle } = useAppSelector((state) => state.project);
    // const { transformedProjectData, status } = useAppSelector((state) => state.projectType);
    // const dispatch = useAppDispatch();
    //
    // useEffect(() => {
    //     if (status === 'idle') {
    //         dispatch(fetchProjectType());
    //     }
    // }, [dispatch, status]);
    //
    // const options = useMemo(() => {
    //     return transformedProjectData.map((typeProject) => ({
    //         value: typeProject.name,
    //         label: typeProject.name,
    //     }));
    // }, [transformedProjectData]);

    return (
        <>
            <Card className="shadow-none">
                <CardBody className="list-product-body">
                    <Row className="row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
                        <Col>

                            <Input
                                type="select"
                                className={'custom-sel'}
                            >
                                {/*// <option>Type de projet</option>*/}
                                {/*// {options.map((option) => (*/}
                                {/*//     <option key={option.value} value={option.value}>*/}
                                {/*//         {option.label}*/}
                                {/*//     </option>*/}
                                {/*// ))}*/}
                            </Input>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
};
