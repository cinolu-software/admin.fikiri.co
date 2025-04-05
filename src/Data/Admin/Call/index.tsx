import React, {useState} from 'react';
import {CallType, CallInstance} from "@/Types/Call/CallType";
import RatioImage from "@/CommonComponent/RatioImage";
import {useAppDispatch} from "@/Redux/Hooks";
import {setModalDeleteCall, setSelectedCall, publishCall, unpublishCall} from "@/Redux/Reducers/CallSlice";
import {TableColumn} from "react-data-table-component";
import {useRouter} from "next/navigation";
import {imageBaseUrl} from "@/Services/axios";
import SVG from '@/CommonComponent/SVG';
import {Spinner} from 'reactstrap';
import { Flip, toast } from "react-toastify";


const CallListTableName: React.FC<{ image: string, name: string }> = ({image, name}) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <p>{name}</p>
        </div>
    );
};

const CallListTableAction: React.FC<{ call:  CallInstance, isPublished?: boolean }> = ({ call, isPublished }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingPublish, setLoadingPublish] = useState(false);

    const handleEdit = async () => {
        setLoadingEdit(true);
        router.push(`/admin/call/edit_call`);
        dispatch(setSelectedCall(call));
    };

    const handleDetail = async () => {
        setLoadingDetail(true);
        router.push(`/admin/call/detail_call`);
        dispatch(setSelectedCall(call));
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        dispatch(setModalDeleteCall({ isOpen: true, call }));
        setLoadingDelete(false);
    };

    const handlePublish = async () => {
        try {
            setLoadingPublish(true);
            setTimeout(async () => {
                if (isPublished) {
                    await dispatch(unpublishCall({ callId: call.id }));
                    toast.success("Appel dépublié avec succès", {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        transition: Flip,
                    });
                } else {
                    await dispatch(publishCall({ callId: call.id }));
                    toast.success("Appel publié avec succès", {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        transition: Flip,
                    });
                }
                setLoadingPublish(false);
            }, 1000);
        } catch (e) {
            setLoadingPublish(false);
            toast.error("Une erreur est survenue", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER,
                transition: Flip,
            });
        }
    };

    return (
        <div className="product-action">
            <div className="row w-100 justify-content-center">
                <div className="col-3">
                    <button onClick={handleEdit} disabled={loadingEdit} style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} >
                        {loadingEdit ? <Spinner size="sm" /> : <SVG iconId="editTable" />}
                    </button>
                </div>
                <div className="col-3">
                    <button onClick={handleDetail} disabled={loadingDetail} style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} >
                        {loadingDetail ? <Spinner size="sm" /> : <SVG iconId="moreTable" />}
                    </button>
                </div>
                <div className="col-3">
                    <button onClick={handlePublish} disabled={loadingPublish} style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}>
                        {loadingPublish ? <Spinner size="sm" /> : <SVG iconId={isPublished ? "unpublish_call" : "publish_call"} />}
                    </button>
                </div>
                <div className="col-3">
                    <button onClick={handleDelete} disabled={loadingDelete} style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}>
                        {loadingDelete ? <Spinner size="sm" /> : <SVG iconId="trashTable" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const CallListTableDataColumn: TableColumn<CallInstance>[] = [
    {
        name: "Nom",
        cell: (row: CallInstance) => (
            <CallListTableName
                image={row?.cover ? `${imageBaseUrl}/calls/covers/${row.cover}` : '/assets/images/calls/call.jpg'}
                name={row.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Date de début",
        selector: (row: CallInstance) => {
            const date = new Date(row.started_at);
            return date.toLocaleDateString();
        },
        sortable: true,
        grow: 1
    },
    {
        name: "Date de fin",
        selector: (row: CallInstance) => {
            const date = new Date(row.ended_at);
            return date.toLocaleDateString();
        },
        sortable: true,
        grow: 1
    },

    {
        name: "Actions",
        cell: (row: CallInstance) => <CallListTableAction call={row} />,
        grow: 2
    },
];


export const PublishedCallListTableDataColumn: TableColumn<CallInstance>[] = [
    {
        name: "Nom",
        cell: (row: CallInstance) => (
            <CallListTableName
                image={row?.cover ? `${imageBaseUrl}/calls/covers/${row.cover}` : '/assets/images/calls/call.jpg'}
                name={row.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Date de début",
        selector: (row: CallInstance) => {
            const date = new Date(row.started_at);
            return date.toLocaleDateString();
        },
        sortable: true,
        grow: 1
    },
    {
        name: "Date de fin",
        selector: (row: CallInstance) => {
            const date = new Date(row.ended_at);
            return date.toLocaleDateString();
        },
        sortable: true,
        grow: 1
    },
    {
        name: "Actions",
        cell: (row: CallInstance) => <CallListTableAction call={row} isPublished={true} />,
        grow: 2
    },
];
