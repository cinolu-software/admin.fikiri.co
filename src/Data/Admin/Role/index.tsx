import React from 'react'
import {RoleListTableColumnType, DataGetRoleType} from "@/Types/Role/RoleType";
import RatioImage  from "@/CommonComponent/RatioImage";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {setModalCreateRole, setModalDeleteRole, setModalEditRole } from "@/Redux/Reducers/RoleSlice";
import SVG from "@/CommonComponent/SVG";

const RoleListTableName : React.FC<{name: string}> = ({name}) => {
    return (
        <div className={'product-name my-2'}>
            {name}
        </div>
    )
}

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
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleEdit}>
                <span>
                  <SVG iconId="editTable"/>
                </span>
                    </button>
                </div>

                <div className={'col-6'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleDelete} >
                        <SVG iconId="trashTable" />
                    </button>
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
        grow: 3,
    },
    {
        name: "Action",
        cell: (row: DataGetRoleType) => <RoleListTableAction role={row} />,
        grow: 1
    }
]