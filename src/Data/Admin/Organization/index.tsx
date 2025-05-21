import React from 'react'
import {DataGetOrganizationType} from "@/Types/Organization/OrganizationType"
import {useAppDispatch} from "@/Redux/Hooks";
import { setModalDeleteOrganization, setModalEditOrganization} from "@/Redux/Reducers/OrganizationSlice";
import SVG from "@/CommonComponent/SVG";
import {Spinner, Button} from "reactstrap";

const OrganizationListTableName : React.FC<{name: string}> = ({name}) => {
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

export const OrganizationListDataColumn = [
    {
        name : "Nom",
        cell: (row: DataGetOrganizationType) => (
            <OrganizationListTableName name={row.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Action",
        cell: (row: DataGetOrganizationType) => <OrganizationListTableAction organization={row} />,
        grow: 2
    }
]