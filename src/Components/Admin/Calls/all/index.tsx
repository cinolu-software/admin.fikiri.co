import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {  Col, Container, Input, Label, Row } from "reactstrap";
import {  fetchProjects } from "@/Redux/Reducers/projectSlice/projectSlice";
import { ProjectListTableDataColumn } from "@/Data/Application/Project/";
import DeleteProjectModal from "@/Components/Applications/projects/common/DeleteProjectsModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {RootState} from "@/Redux/Store";
import { ToastContainer} from "react-toastify";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {ProjectHeader} from "@/Components/Applications/projects/common/ProjectList";
import {CollapseFilterData} from "@/Components/Applications/projects/common/CollapseFilterData";


const ProjectListContainer = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {status, originalProjectData} = useAppSelector((state: RootState) => state.project);
    const filteredItems = originalProjectData?.filter((item: { name: string; })=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if (status === "idle" || status === "loading") {
            console.log(status)
            dispatch(fetchProjects());
        }
    }, [status, dispatch]);


    return (
        <Container fluid>
            <DeleteProjectModal />
            {
                status !== 'succeeded' ? <TableSkeleton/> : (
                    <Row>
                        <Col sm="12">

                            <div className="list-product-header">
                                <ProjectHeader />
                                <CollapseFilterData/>
                            </div>
                            <div className="list-product">
                                <div className="table-responsive">
                                    <DataTable
                                        className="theme-scrollbar"
                                        data={filteredItems}
                                        columns={ProjectListTableDataColumn}
                                        striped
                                        highlightOnHover
                                        pagination
                                        subHeader
                                        subHeaderComponent={subHeaderComponentMemo}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                )
            }
            <ToastContainer/>
        </Container>
    );
};

export default ProjectListContainer;

