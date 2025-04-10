import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {  Col, Container, Input, Label, Row } from "reactstrap";
import {fetchCall} from "@/Redux/Reducers/CallSlice";
import {CallListTableDataColumn} from "@/Data/Admin/Call";
import DeleteCallModal from "@/Components/Admin/Calls/common/DeleteCallModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import { ToastContainer} from "react-toastify";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {CallHeader} from "@/Components/Admin/Calls/common/CallHeader";
import {CallType} from "@/Types/Call/CallType";


const CallListContainer = () => {

    const [filterText, setFilterText] = useState("");

    const dispatch = useAppDispatch();

    const {callData, statusCall, totalPublishedCall, totalAllCall} = useAppSelector(state => state.call);

    const filteredItems = callData?.filter((item: { name: string; })=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if (statusCall === "idle" || statusCall === "loading") {
            dispatch(fetchCall());
        }
    }, [statusCall, dispatch]);


    return (
        <Container fluid>
            <DeleteCallModal />
            {
                statusCall !== 'succeeded' ? <TableSkeleton/> : (
                    <Row>
                        <Col sm="12">
                            <div className="list-product-header">
                                <CallHeader />
                            </div>
                            <div className="list-product">
                                <div className="table-responsive">
                                    <DataTable
                                        className="theme-scrollbar"
                                        data={filteredItems}
                                        // @ts-ignore
                                        columns={CallListTableDataColumn}
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

export default CallListContainer;

