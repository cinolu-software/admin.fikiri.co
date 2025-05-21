import React from 'react'
import {RoleListTableColumnType, DataGetRoleType} from "@/Types/Role/RoleType";
import RatioImage  from "@/CommonComponent/RatioImage";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {setModalCreateRole, setModalDeleteRole, setModalEditRole } from "@/Redux/Reducers/RoleSlice";
import SVG from "@/CommonComponent/SVG";
import {Button} from "reactstrap";

const RoleListTableName: React.FC<{ name: string }> = ({ name }) => {
    return (
        <div className="d-flex align-items-center h-100 p-2">
            <span className="text-dark text-truncate text-start" 
                  style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.02rem',
                      transition: 'all 0.2s ease'
                  }}>
                {name}
            </span>
        </div>
    );
};

const RoleListTableAction : React.FC<{role : DataGetRoleType}> = ({role}) =>{

    const dispatch = useAppDispatch();
    const handleEdit = () => {
        dispatch(setModalEditRole({isOpen: true, role}));
    }
    const handleDelete = () => {
        dispatch(setModalDeleteRole({isOpen: true, role}))
    }

    return (
        <div className="product-action">
            <div className={'row w-100 justify-content-center'}>
                <div className={'col-6'}>
                    <Button
                        color="primary"
                        outline
                        onClick={handleEdit}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {
                            <SVG iconId="editTable" className="d-none d-md-inline flex-shrink-0" />
                        }
                        <span className="text-truncate">Modifier</span>
                    </Button>
                </div>

                <div className={'col-6'}>
                    <Button
                        color="danger"
                        outline
                        onClick={handleDelete}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {
                            <SVG iconId="trashTable" className="d-none d-md-inline flex-shrink-0" />
                        }
                        <span className="text-truncate">Supprimer</span>
                    </Button>
                </div>
            </div>
        </div>
    )
};

export const RoleListDataColumn = [
    {
        name : "Nom",
        cell: (row: DataGetRoleType) => (
            <RoleListTableName name={row.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Action",
        cell: (row: DataGetRoleType) => <RoleListTableAction role={row} />,
        grow: 2
    }
]