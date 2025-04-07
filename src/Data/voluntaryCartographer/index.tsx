import React, {useState} from 'react';
import { CallInstance} from "@/Types/Call/CallType";
import RatioImage from "@/CommonComponent/RatioImage";
import {useAppDispatch} from "@/Redux/Hooks";
import {setSelectedCall} from "@/Redux/Reducers/CallSlice";
import {TableColumn} from "react-data-table-component";
import {useRouter} from "next/navigation";
import {imageBaseUrl} from "@/Services/axios";
import SVG from '@/CommonComponent/SVG';
import {Spinner} from 'reactstrap';


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

const CallListTableAction: React.FC<{ call: CallInstance, isPublished?: boolean }> = ({ call, isPublished }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loadingDetail, setLoadingDetail] = useState(false);

    const handleDetail = async () => {
        setLoadingDetail(true);
        router.push(`/voluntaryCartographer/detail_call`);
        dispatch(setSelectedCall(call));
    };


    return (
        <div className="product-action">
            <div className="row w-100 justify-content-center">
                <div className="col-3">
                    <button onClick={handleDetail} disabled={loadingDetail} style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} >
                        {loadingDetail ? <Spinner size="sm" /> : <SVG iconId="moreTable" />}
                    </button>
                </div>
                <div className="col-3">

                </div>

                <div className="col-3">

                </div>
                <div className="col-3">

                </div>
            </div>
        </div>
    );
};


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
