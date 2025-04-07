import React from 'react'
import {DataGetOrganizationType} from "@/Types/Organization/OrganizationType"
import {useAppDispatch} from "@/Redux/Hooks";
import { setModalDeleteOrganization, setModalEditOrganization} from "@/Redux/Reducers/OrganizationSlice";
import SVG from "@/CommonComponent/SVG";

const OrganizationListTableName : React.FC<{name: string}> = ({name}) => {
    return (
        <div className={'product-name my-2'}>
            {name}
        </div>
    )
}

const OrganizationListTableAction : React.FC<{organization : DataGetOrganizationType}> = ({organization}) =>{

    const dispatch = useAppDispatch();
    
    const handleEdit = () => {
        dispatch(setModalEditOrganization({isOpen: true, organization}));
    }
    const handleDelete = () => {
        dispatch(setModalDeleteOrganization({isOpen: true, organization}))
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

export const OrganizationListDataColumn = [
    {
        name : "Nom",
        cell: (row: DataGetOrganizationType) => (
            <OrganizationListTableName name={row.name}/>
        ),
        sortable: true,
        grow: 3,
    },
    {
        name: "Action",
        cell: (row: DataGetOrganizationType) => <OrganizationListTableAction organization={row} />,
        grow: 1
    }
]