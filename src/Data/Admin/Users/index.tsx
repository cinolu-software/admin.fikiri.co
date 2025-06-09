import React, {useState} from 'react';
import RatioImage from "@/CommonComponent/RatioImage";
import {UsersListTableColumnType, DataGetUserType} from "@/Types/User/UserType";
import {useAppDispatch} from "@/Redux/Hooks";
import {setModalDeleteUser, setSelectedUser} from "@/Redux/Reducers/UserSlice";
import {imageBaseUrl} from "@/Services/axios";
import SVG from "@/CommonComponent/SVG";
import {useRouter} from "next/navigation";
import {Spinner, Button} from "reactstrap";

const UsersListTableName: React.FC<{ image: string; name: string }> = ({image, name}) => {
    return (
        <div className={'product-names my-2'}>
            <div className={'light-product-box bg-img-cover'}>
                <RatioImage src={`${image}`} alt={'image'}/>
            </div>
            <p>{name}</p>
        </div>
    );
}

const UsersListTableAction: React.FC<{ user: DataGetUserType }> = ({ user }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleDelete = () => {
        dispatch(setModalDeleteUser({ isOpen: true, user }));
    };

    const handleViewDetail = () => {
        setLoadingDetail(true);
        router.push('/general/users/edit_user');
        dispatch(setSelectedUser({ user }));
    };

    const handleModifiedUser = () => {
        setLoadingEdit(true);
        setTimeout(() => {
            router.push('/general/users/edit_user');
            setLoadingEdit(false);
        }, 1000);
        dispatch(setSelectedUser({ user }));
    };

    return (
        <div className="product-action w-100">
            <div className="row w-100 g-2">

                <div className="col-12 col-md-4">
                    <Button
                        color="primary"
                        outline
                        onClick={handleModifiedUser}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {loadingEdit ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <SVG iconId="editTable" className="d-none d-md-inline flex-shrink-0" />
                        )}
                        <span className="text-truncate">Modifier</span>
                    </Button>
                </div>


                <div className="col-12 col-md-4">
                    <Button
                        color="info"
                        outline
                        onClick={handleViewDetail}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {loadingDetail ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <SVG iconId="moreTable" className="d-none d-md-inline flex-shrink-0" />
                        )}
                        <span className="text-truncate">Détails</span>
                    </Button>
                </div>


                <div className="col-12 col-md-4">
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
                        {loadingDelete ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <SVG iconId="trashTable" className="d-none d-md-inline flex-shrink-0" />
                        )}
                        <span className="text-truncate">Supprimer</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

const OutreacherListTableAction: React.FC<{ user: DataGetUserType }> = ({ user }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleDelete = () => {
        dispatch(setModalDeleteUser({ isOpen: true, user }));
    };

    const handleViewDetail = () => {
        setLoadingDetail(true);
        router.push('/general/users/edit_user');
        dispatch(setSelectedUser({ user }));
    };

    const handleModifiedUser = () => {
        setLoadingEdit(true);
        setTimeout(() => {
            router.push('/general/users/edit_user');
            setLoadingEdit(false);
        }, 1000);
        dispatch(setSelectedUser({ user }));
    };

    return (
        <div className="product-action w-100">
            <div className="row w-100 g-2">

                <div className="col-12 col-md-4">
                    <Button
                        color="primary"
                        outline
                        onClick={handleModifiedUser}
                        disabled
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {loadingEdit ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <SVG iconId="editTable" className="d-none d-md-inline flex-shrink-0" />
                        )}
                        <span className="text-truncate">Modifier</span>
                    </Button>
                </div>


                <div className="col-12 col-md-4">
                    <Button
                        color="info"
                        outline
                        onClick={handleViewDetail}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {loadingDetail ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <SVG iconId="moreTable" className="d-none d-md-inline flex-shrink-0" />
                        )}
                        <span className="text-truncate">Détails</span>
                    </Button>
                </div>


                <div className="col-12 col-md-4">
                    <Button
                        color="danger"
                        outline
                        onClick={handleDelete}
                        disabled
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {loadingDelete ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <SVG iconId="trashTable" className="d-none d-md-inline flex-shrink-0" />
                        )}
                        <span className="text-truncate">Supprimer</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const OutreacherListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: UsersListTableColumnType) => (
            <UsersListTableName
                image={
                    row?.profile ?
                        `${imageBaseUrl}/profiles/${row?.profile}` :
                        row?.google_image
                            ? row.google_image
                            : "/assets/images/avtar/avatar.jpg"
                }
                name={row.name}
            />
        ),
        sortable: true,
        grow: 2
    },
    {
        name: "Email",
        selector: (row: UsersListTableColumnType) => row.email,
        sortable: true,
        grow: 2
    },
    {
        name: "Actions",
        cell: (row: UsersListTableColumnType) => (
            <OutreacherListTableAction user={row}/>
        ),
        grow: 2
    }
];

export const UsersListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: UsersListTableColumnType) => (
            <UsersListTableName
                image={
                    row?.profile ?
                        `${imageBaseUrl}/profiles/${row?.profile}` :
                        row?.google_image
                            ? row.google_image
                            : "/assets/images/avtar/avatar.jpg"
                }
                name={row.name}
            />
        ),
        sortable: true,
        grow: 2
    },
    {
        name: "Email",
        selector: (row: UsersListTableColumnType) => row.email,
        sortable: true,
        grow: 2
    },
    {
        name: "Actions",
        cell: (row: UsersListTableColumnType) => (
            <UsersListTableAction user={row}/>
        ),
        grow: 2
    }
];

export const AddUser = [
    {
        id: 1,
        icon: "user_contact",
        title: "Utilisateur",
        detail: "Utilisateur"
    },
    {
        id: 2,
        icon: "user_role",
        title: "Rôle de l'utilisateur",
        detail: "Sélectionner le rôle de l'utilisateur"
    },
];
