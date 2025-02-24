import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Col, Container, Input, Label, Row } from "reactstrap";
import { fetchPublishedProject } from "@/Redux/Reducers/projectSlice/projectSlice";
import { ProjectListTableDataColumn } from "@/Data/Application/Project/";
import DeleteProjectModal from "@/Components/Applications/projects/common/DeleteProjectsModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import { ToastContainer} from "react-toastify";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {CollapseFilterData} from "@/Components/Applications/projects/common/CollapseFilterData";

const PublishedProjectListContainer = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const { publishedProjectData, publishedProjectStatus } = useAppSelector((state) => state.project);
    const filteredItems = publishedProjectData?.filter((item: { name: string; })=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if (publishedProjectStatus === "idle" || publishedProjectStatus === "loading") {
            dispatch(fetchPublishedProject());
        }
    }, [publishedProjectStatus, dispatch]);


    return (
        <Container fluid>
            <DeleteProjectModal />
            {
                publishedProjectStatus !== 'succeeded' ? <TableSkeleton/> : (
                    <Row>
                        <Col sm="12">
                            <div className="list-product-header">
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

export default PublishedProjectListContainer;

