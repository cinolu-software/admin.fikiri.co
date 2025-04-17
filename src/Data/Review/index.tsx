import React, {useState} from 'react';
import RatioImage from "@/CommonComponent/RatioImage";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {TableColumn} from "react-data-table-component";
import {useRouter} from "next/navigation";
import {imageBaseUrl} from "@/Services/axios";
import SVG from '@/CommonComponent/SVG';
import {Spinner} from 'reactstrap';
import { Flip, toast } from "react-toastify";
import { ReviewerData } from "@/Types/Reviews";
import { setSelectedSolution } from "@/Redux/Reducers/ReviewerSlice";



const SolutionListTableName: React.FC<{ image: string, name: string }> = ({image, name}) => {
    return (
        <div className="d-flex align-items-center product-names my-2">
            <div className="light-product-box bg-img-cover me-3">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <p className="mb-0">{name}</p>
        </div>
    );
};

const SolutionListTableAction: React.FC<{ data: ReviewerData}> = ({ data }) => {

    const { token } = useAppSelector((state) => state.reviewer);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loadingDetail, setLoadingDetail] = useState(false);

    const handleDetail = async () => {
        setLoadingDetail(true);
            router.push(`/review/details_review?token=${token}`);
        dispatch(setSelectedSolution(data));
    };


    return (
        <div className="product-action">
            <div className="row w-100 justify-content-center">
                <div className="col-3">
                    <button onClick={handleDetail} disabled={loadingDetail} style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} >
                        {loadingDetail ? <Spinner size="sm" /> : <SVG iconId="moreTable" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const SolutionListTableDataColumn: TableColumn<ReviewerData>[] = [
    {
        name: "Nom",
        cell: (row: ReviewerData) => (
            <SolutionListTableName image={'/assets/images/calls/call.jpg'} name={row.user.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Date de soumission",
        selector: (row: ReviewerData) => {
            const date = new Date(row.created_at);
            return date.toLocaleDateString();
        },
        sortable: true,
        grow: 1
    },
    {
        name: "Actions",
        cell: (row: ReviewerData) => <SolutionListTableAction data={row} />,
        grow: 2
    },
];