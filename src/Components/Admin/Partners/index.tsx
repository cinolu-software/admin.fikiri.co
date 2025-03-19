import React, {useMemo, useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import ModalCreateOrganization from "@/Components/Admin/Organizations/ModalCreateOrganization";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {fetchOrganization, deleteOrganization, setModalDeleteOrganization} from "@/Redux/Reducers/OrganizationSlice";
import {OrganizationListDataColumn} from "@/Data/Admin/Organization";
import {OrganizationHeader} from "@/Components/Admin/Organizations/Header";
import UpdateOrganizationModal from "@/Components/Admin/Organizations/ModalUpdateOrganization";
import TableSkeleton from "@/CommonComponent/TableSkeleton";

const Organizations = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {statusOrganization, isOpenModalDeleteOrganization, dataOrganization, selectedOrganization} = useAppSelector(state => state.organization);

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText}/>
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if(statusOrganization === "idle" || statusOrganization === "loading"){
            dispatch(fetchOrganization());
        }
    }, [statusOrganization, dispatch]);

    const filteredOrganization = dataOrganization?.filter(organization => organization.name?.toLowerCase()?.includes(filterText.toLowerCase()));


    return (
        <Container fluid>

            <ModalCreateOrganization />
            <DeleteEntityModal
                isOpen={isOpenModalDeleteOrganization}
                entityName={'Organisation'}
                selectedEntity={selectedOrganization}
                entities={dataOrganization}
                deleteEntityThunk={deleteOrganization}
                setModalAction={setModalDeleteOrganization as any}
            />
            <UpdateOrganizationModal/>
            {
                statusOrganization !== 'succeeded' ? <TableSkeleton/> : (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="list-product-header">
                                        <OrganizationHeader />
                                    </div>
                                    <div className="list-program">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredOrganization}
                                                columns={ OrganizationListDataColumn }
                                                striped
                                                highlightOnHover
                                                pagination
                                                subHeader
                                                subHeaderComponent={subHeaderComponentMemo}
                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                )
            }
        </Container>
    )
}

export default Organizations