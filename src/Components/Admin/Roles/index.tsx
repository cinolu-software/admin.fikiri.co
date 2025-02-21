import React, {useMemo, useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import ModalCreateRole from "@/Components/Admin/Roles/ModalCreateRole";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {fetchRole, deleteRole, setModalDeleteRole} from "@/Redux/Reducers/RoleSlice";
import {RoleListDataColumn} from "@/Data/Admin/Role";
import {RoleHeader} from "@/Components/Admin/Roles/Header";
import UpdateRoleModal from "@/Components/Admin/Roles/ModalUpdateRole";
import TableSkeleton from "@/CommonComponent/TableSkeleton";

const Roles = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {statusRole, isOpenModalDeleteRole, selectedRole, dataRoles} = useAppSelector(state => state.role);

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText}/>
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if(statusRole === "idle" || statusRole === "loading"){
            dispatch(fetchRole());
        }
    }, [statusRole, dispatch]);

    const filteredRole = dataRoles?.filter(role => role.name?.toLowerCase()?.includes(filterText.toLowerCase()));

    return (
        <Container fluid>

            <ModalCreateRole />
            <DeleteEntityModal
                isOpen={isOpenModalDeleteRole}
                entityName={'Rôle'}
                selectedEntity={selectedRole}
                entities={dataRoles}
                deleteEntityThunk={deleteRole}
                setModalAction={setModalDeleteRole as any}
            />
            <UpdateRoleModal/>
            {
                statusRole !== 'succeeded' ? <TableSkeleton/> : (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="list-product-header">
                                        <RoleHeader />
                                    </div>
                                    <div className="list-program">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredRole}
                                                columns={ RoleListDataColumn }
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

export default Roles