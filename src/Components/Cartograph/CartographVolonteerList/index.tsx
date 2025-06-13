import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import {fetchUsers, setModalDeleteUser, deleteUser} from "@/Redux/Reducers/UserSlice";
import {DataGetUserType} from "@/Types/User/UserType";
import { UsersListTableDataColumn } from "@/Data/Cartograph/VolunteerList";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import UpdateUserModal from "@/Components/General/Users/Common/UpdateUserModal";
import TableSkeleton from "@/CommonComponent/TableSkeleton";

const UsersListContainer: React.FC = () => {
    
    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {usersData, statusUsers, isOpenModalDeleteUser, selectedUser} = useAppSelector((state) => state.user);
    const [volunteersData, setVolunteersData] = useState<DataGetUserType[]>([]);

    useEffect(() => {
        if (statusUsers === 'idle') {
            dispatch(fetchUsers());
        } else if (statusUsers === 'succeeded' && usersData) {
            const onlyVolunteers = usersData.filter((user: DataGetUserType) =>
                user.roles.some((role) => role.name === "volunteer")
            );
            setVolunteersData(onlyVolunteers);
        }
    }, [statusUsers, usersData, dispatch]);

    const filteredVolunteers = useMemo(() => {
        return volunteersData.filter((user: DataGetUserType) =>
            user.name.toLowerCase().includes(filterText.toLowerCase()) ||
            user.email.toLowerCase().includes(filterText.toLowerCase())
        );
    }, [filterText, volunteersData]);

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">Chercher:</Label>
                <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                    type="search"
                    value={filterText}
                />
            </div>
        );
    }, [filterText]);


    return (
        <Container fluid>
            <DeleteEntityModal
                isOpen={isOpenModalDeleteUser}
                entityName="utilisateur"
                selectedEntity={selectedUser}
                entities={volunteersData}
                // @ts-ignore
                setModalAction={setModalDeleteUser}
                deleteEntityThunk={deleteUser}
            />
            <UpdateUserModal selectedUser={selectedUser as DataGetUserType}/>
            {
                statusUsers !== 'succeeded' ? (
                    <TableSkeleton/>
                ) : (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="list-product-header">
                                        <h5>Liste de volontaires</h5>
                                    </div>
                                    <div className="list-user">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                //@ts-ignore
                                                data={filteredVolunteers}
                                                columns={UsersListTableDataColumn}
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
    );
};

export default UsersListContainer;