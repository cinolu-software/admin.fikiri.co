import React, {useState} from 'react';
import {ApplicationInstance} from "@/Types/Call/Application";
import RatioImage from "@/CommonComponent/RatioImage";
import {TableColumn} from "react-data-table-component";
import {useRouter} from "next/navigation";
import {imageBaseUrl} from "@/Services/axios";
import SVG from '@/CommonComponent/SVG';
import {Spinner} from 'reactstrap';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import {setSelectedApplication} from "@/Redux/Reducers/CallSlice/CallApplication";
import {useAppDispatch} from "@/Redux/Hooks";

const SolutionListTableName: React.FC<{ image: string; name: string }> = ({ image, name }) => {
    return (
        <div className="product-names" style={{ maxWidth: '200px' }}>
            <div className="light-product-box bg-img-cover">
                <RatioImage
                    className="img-fluid"
                    src={image ? `${imageBaseUrl}/solutions/${image}` : '/assets/images/calls/call.jpg'}
                    alt="solution"
                />
            </div>
            <p
                className="mt-2 text-truncate mb-0"
                title={name}
                style={{
                    maxWidth: '180px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {name}
            </p>
        </div>
    );
};

const SolutionListTableAction : React.FC<{ solution : ApplicationInstance }> = ({ solution }) => {
    const router = useRouter();
    const [loadingDetail, setLoadingDetail] = useState(false);
    const dispatch = useAppDispatch();

    const handleViewDetail = async () => {
        setLoadingDetail(true);
        dispatch(setSelectedApplication(solution));
        router.push(`/admin/call/detail_call/application_detail/`);
        setLoadingDetail(false);
    };

    return (
        <div className="product-action">
            <div className="d-flex gap-2">
                <button
                    style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                    onClick={handleViewDetail}
                >
                    {loadingDetail ? <Spinner size="sm" /> : <SVG iconId="moreTable" />}
                </button>
            </div>
        </div>
    );
};

const generateDynamicColumns = (sampleResponse: Record<string, any>): TableColumn<ApplicationInstance>[] => {
    if (!sampleResponse) return [];

    return Object.keys(sampleResponse).map((key) => {
        const value = sampleResponse[key];

        return {
            name: key,
            cell: (row: ApplicationInstance) => {
                const cellValue = row.responses[key];


                if (typeof cellValue === 'string') {
                    if (cellValue.startsWith('http')) {
                        return (
                            <Link href={cellValue} target="_blank" rel="noopener noreferrer" className={"text-sm-start text-truncate"} >
                                {cellValue}
                            </Link>
                        );
                    }
                    return <div className="text-truncate" style={{ maxWidth: '200px' }}>{cellValue}</div>;
                }

                return JSON.stringify(cellValue);
            },
            sortable: true,
            grow: 1,
            omit: key === 'Nom de la solution'
        };
    });
};

export const SolutionListTableDataColumn = (applications: ApplicationInstance[]): TableColumn<ApplicationInstance>[] => {
    const sampleResponse = applications[0]?.responses || {};

    return [
        {
            name: "Solution",
            cell: (row: ApplicationInstance) => (
                <SolutionListTableName
                    image={row.image}
                    name={row.responses["Nom de la solution"] || 'Sans nom'}
                />
            ),
            sortable: true,
            grow: 1
        },
        ...generateDynamicColumns(sampleResponse),
        {
            name: "Date de soumission",
            cell: (row: ApplicationInstance) => format(new Date(row.created_at), 'dd MMMM yyyy', { locale: fr }),
            sortable: true,
            grow: 1
        },
        {
            name: "Statut",
            cell: (row: ApplicationInstance) => (
                <span className={`badge badge-${row.status === 'mapped' ? 'success' : 'warning'}`}>
                    {row.status}
                </span>
            ),
            sortable: true,
            grow: 1
        },
        {
            name: "Actions",
            cell: (row: ApplicationInstance) => <SolutionListTableAction solution={row} />,
            grow: 1
        }
    ];
};