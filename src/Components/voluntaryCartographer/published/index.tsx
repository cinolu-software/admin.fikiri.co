import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Col, Container, Input, Label, Row } from "reactstrap";
import {fetchPublishedCall} from "@/Redux/Reducers/CallSlice";
import {PublishedCallListTableDataColumn} from "@/Data/voluntaryCartographer";
import DeleteCallModal from "@/Components/Admin/Calls/common/DeleteCallModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import { CallInstance } from "@/Types/Call/CallType";


const PublishedCallListContainer = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {publishedCallData, publishedStatus} = useAppSelector(state => state.call);
    const filteredItems = publishedCallData?.filter((item: { name: string; })=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));


    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if (publishedStatus === "idle" || publishedStatus === "loading") {
            dispatch(fetchPublishedCall());
        }
    }, [publishedStatus, dispatch]);


    return (
        <Container fluid>
            <DeleteCallModal/>
            {
                publishedStatus !== 'succeeded' ? <TableSkeleton/> : (
                    <Row>
                        <Col sm="12">
                            <div className="list-product-header">
                            </div>
                            <div className="list-product">
                                <div className="table-responsive">
                                    <DataTable
                                        className="theme-scrollbar"
                                        data={filteredItems}
                                        columns={PublishedCallListTableDataColumn as CallInstance[]}
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
        </Container>
    );
};

export default PublishedCallListContainer;

