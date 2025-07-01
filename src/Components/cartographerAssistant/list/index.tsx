
import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import {fetchUsers, fetchCountByOutreachers} from "@/Redux/Reducers/UserSlice";
import {DataGetUserType} from "@/Types/User/UserType";
import {OutreacherListTableDataColumn} from "@/Data/Admin/Users";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {CollapseFilterData} from "@/Components/General/Users/CollapseFilterData";
import TableSkeleton from "@/CommonComponent/TableSkeleton";

const UsersListContainer: React.FC = () => {
    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {
        statusUsers,
        outReachersData,
        outReachersStatus,
        countByOutreachers
    } = useAppSelector((state) => state.user);

    const [roleFilter, setRoleFilter] = useState<string>("");

    useEffect(() => {
        if (outReachersStatus === "idle" || outReachersStatus === "loading") {
            dispatch(fetchCountByOutreachers());
        }
        if (statusUsers === 'idle' || statusUsers === 'loading') {
            dispatch(fetchUsers());
        }
    }, [statusUsers, dispatch, outReachersStatus]);


    const countMap = useMemo(() => {
        const map = new Map<string, number>();
        countByOutreachers.forEach(item => {
            if (item.user_outreacher) {
                //@ts-ignore
                map.set(item.user_outreacher, item.count);
            }
        });
        return map;
    }, [countByOutreachers]);

    const filteredUsers = outReachersData.map(user => ({
        ...user,
        sponsoredCount: countMap.get(user.email) || 0
    })).filter((user: DataGetUserType & { sponsoredCount: number }) => {
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


    const columns = useMemo(() => {
        const emailIndex = OutreacherListTableDataColumn.findIndex(
            (col) => col.name === "Email"
        );

        const sponsoredColumn = {
            name: "Nombre de parrainés",
            selector: (row: any) => row.sponsoredCount,
            cell: (row: any) => (
                <div className="text-center d-flex justify-content-center align-items-center">
                    <div>
                        <span className="badge bg-primary">{row.sponsoredCount}</span>
                    </div>
                </div>
            ),
            sortable: true,
            grow: 1
        };

        const columnsBefore = OutreacherListTableDataColumn.slice(0, emailIndex + 1);
        const columnsAfter = OutreacherListTableDataColumn.slice(emailIndex + 1);

        return [...columnsBefore, sponsoredColumn, ...columnsAfter];
    }, []);


    return (
        <Container fluid>

            {
                statusUsers !== 'succeeded' ? (
                    <TableSkeleton/>
                ) : (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="list-product-header">
                                        <h5>Liste de vulgarisateurs</h5>
                                        <CollapseFilterData setRoleFilter={setRoleFilter} />
                                    </div>
                                    <div className="list-user">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredUsers}
                                                // @ts-ignore
                                                columns={columns}
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