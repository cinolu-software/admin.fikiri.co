import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import {fetchUsers, setModalDeleteUser, deleteUser} from "@/Redux/Reducers/UserSlice";
import {DataGetUserType} from "@/Types/User/UserType";
import {UsersListTableDataColumn} from "@/Data/Admin/Users";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {UserHeader} from "@/Components/General/Users/UserHeader";
import {CollapseFilterData} from "@/Components/General/Users/CollapseFilterData";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import UpdateUserModal from "@/Components/General/Users/Common/UpdateUserModal";
import TableSkeleton from "@/CommonComponent/TableSkeleton";


const UsersListContainer: React.FC = () => {

  const [filterText, setFilterText] = useState("");
  const dispatch = useAppDispatch();
  const {usersData, statusUsers, isOpenModalDeleteUser, selectedUser} = useAppSelector((state) => state.user);
  const [roleFilter, setRoleFilter] = useState<string>("");


    useEffect(() => {
        if (statusUsers === 'idle' || statusUsers === 'loading') {
            dispatch(fetchUsers());
        }
    }, [statusUsers, dispatch]);

    const filteredUsers = usersData.filter((user: DataGetUserType) => {
        const matchesText =
            user.name.toLowerCase().includes(filterText.toLowerCase()) ||
            user.email.toLowerCase().includes(filterText.toLowerCase());

        const matchesRole = roleFilter
            ? user.roles.some((role) => role.name === roleFilter)
            : true;


        return matchesText && matchesRole;
    });

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

    const handleExportCSV = () => {
        const headers = [
            'ID', 'Nom', 'Email', 'Téléphone', 'Adresse',
            'Rôles', 'Date de création', 'Dernière modification'
        ];

        const csvContent = [
            headers.join(';'),
            ...filteredUsers.map(user => {
                const roles = user.roles.map(role => role.name).join(', ');
                return [
                    `"${user.id}"`,
                    `"${user.name}"`,
                    `"${user.email}"`,
                    `"${user.phone_number || ''}"`,
                    `"${user.address || ''}"`,
                    `"${roles}"`,
                    `"${new Date(user.created_at).toLocaleString()}"`,
                    `"${user.updated_at ? new Date(user.updated_at).toLocaleString() : ''}"`
                ].join(';');
            })
        ].join('\n');

        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `utilisateurs_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
      <Container fluid>
          <DeleteEntityModal
              isOpen={isOpenModalDeleteUser}
              entityName="utilisateur"
              selectedEntity={selectedUser}
              entities={usersData}
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
                                        <h5>Liste d'utilisateurs</h5>
                                        <UserHeader onExportCSV={handleExportCSV} />
                                        <CollapseFilterData setRoleFilter={setRoleFilter} />
                                    </div>
                                    <div className="list-user">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                // @ts-ignore
                                                data={filteredUsers}
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