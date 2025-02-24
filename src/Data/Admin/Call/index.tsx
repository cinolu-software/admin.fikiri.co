import React, {useState} from 'react';
import {CallType, CallInstance} from "@/Types/Call/CallType";
import RatioImage from "@/CommonComponent/RatioImage";
import {useAppDispatch} from "@/Redux/Hooks";
// import { publishProject, setSelectedProject, setModalDeleteProject} from "@/Redux/Reducers/projectSlice/projectSlice";
import {setModalDeleteCall} from "@/Redux/Reducers/CallSlice";
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

const CallListTableAction: React.FC<{ call: CallType }> = ({ call }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingPublish, setLoadingPublish] = useState(false);

    const handleEdit = async () => {
        // setLoadingEdit(true);
        // router.push('/project/edit_project');
        // dispatch(setSelectedProject({project}));
    };

    const handleDetail = async () => {
        // setLoadingDetail(true);
        // router.push('/project/detail_project');
        // dispatch(setSelectedProject({project}));
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        dispatch(setModalDeleteCall({ isOpen: true , call }));
        setLoadingDelete(false);
    };

    const handlePublish = async () => {
        // try {
        //     setLoadingPublish(true);
        //     setTimeout(() => {
        //             // @ts-ignore
        //             dispatch(publishProject({projectId: project.id}));
        //             toast.success("Projet publié avec succès", {
        //                 autoClose: 5000,
        //                 position: toast.POSITION.TOP_CENTER,
        //                 transition: Flip,
        //             });
        //             setLoadingPublish(false);
        //         }
        //         , 1000);
        // }
        // catch (e) {
        //     setLoadingPublish(false);
        //     toast.error("Une erreur est survenue", {
        //         autoClose: 5000,
        //         position: toast.POSITION.TOP_CENTER,
        //         transition: Flip,
        //     });
        // }
    }


    return (
        <div className="product-action">
            <div className="row w-100 justify-content-center">
                <div className="col-3">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleEdit}
                        disabled={loadingEdit}
                    >
                        {loadingEdit ? <Spinner size="sm"/> : <SVG iconId="editTable"/>}
                    </button>
                </div>
                <div className="col-3">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleDetail}
                        disabled={loadingDetail}
                    >
                        {loadingDetail ? <Spinner size="sm"/> : <SVG iconId="moreTable"/>}
                    </button>
                </div>
                <div className="col-3">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handlePublish}
                        disabled={loadingPublish}
                    >
                        {loadingPublish ? <Spinner size="sm"/> : <SVG iconId="fill-calendar"/>}
                    </button>
                </div>
                <div className="col-3">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleDelete}
                        disabled={loadingDelete}
                    >
                        {loadingDelete ? <Spinner size="sm"/> : <SVG iconId="trashTable"/>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const CallListTableDataColumn: TableColumn<CallType>[] = [
    {
        name: "Nom",
        cell: (row: CallType) => (
            <CallListTableName
                image={row?.cover ? `${imageBaseUrl}/projects/${row.cover}` : '/assets/images/programs/programs.png'}
                name={row.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Date de début",
        selector: (row: CallType) => row.started_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Date de fin",
        selector: (row: CallType) => row.ended_at,
        sortable: true,
        grow: 1
    },

    {
        name: "Actions",
        cell: (row: CallType) => <CallListTableAction call={row}/>,
        grow: 2
    },
];


export const AddProgram = [
    {
        id: 1,
        // icon: "info",
        title: "Information du programme",
        detail:"Nom et Description",
    },
    {
        id: 2,
        // icon: "calendar",
        title: "Durée du programme",
        detail: "date de début et de fin"
    },
    {
        id: 3,
        // icon: "type",
        title: "Type de programme",
        detail: "Sélectionner le type de programme"
    },
    {
        id: 4,
        // icon: "pricing",
        // icon: "requirement",
        title: "Exigence",
        detail: "Requirements"
    },
    {
        id: 5,
        // icon: "pricing",
        // icon: "partners",
        title: "Partenaires",
        detail: "Partenaires"
    },
];

export const NumberWizardData = [
    {text: "Fill up your details and proceed next steps.",},
];