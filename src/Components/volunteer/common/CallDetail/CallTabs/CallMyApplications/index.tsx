import React, { useState, useEffect } from 'react';
import { TabPane } from 'reactstrap';
import { imageBaseUrl } from "@/Services/axios";
import { useAppSelector, useAppDispatch } from '@/Redux/Hooks';
import {fetchApplicationByUser} from "@/Redux/Reducers/CallSlice/CallApplication";
import { useRouter } from "next/navigation";
import { setSelectedApplication } from "@/Redux/Reducers/CallSlice/CallApplication";
import { ApplicationInstance } from "@/Types/Call/Application";
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const CallMyApplications = () => {

    const { selectedCall } = useAppSelector((state) => state.call);
    const {applicationDataByUser, applicationByUserStatus} = useAppSelector(state=>state.application);

    const {userData} = useAppSelector(state=>state.authentication);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loadingDetail, setLoadingDetail] = useState(false);

    useEffect(() => {
        if(applicationByUserStatus == 'idle' && userData) {
            dispatch(fetchApplicationByUser({userId:userData.id}));
        }
    }, [userData, applicationByUserStatus]);

    useEffect(() => {

    }, []);


    const handleViewDetail =  (application : ApplicationInstance) => {
        setLoadingDetail(true);
        router.push(`/volunteer/detail_call/detail_application`);
        dispatch(setSelectedApplication(application));
    }

    const dynamicCol = selectedCall?.form?.map(field => ({
        name: field.label,
        cell: (row: any) => {
            const value = row.responses[field.label];

            switch (field.type) {
                case 'textarea':
                    return (
                        <div style={{ maxWidth: "300px" }}>
                            {value?.substring(0, 50)}...
                        </div>
                    );
                case 'file':
                    return value ? (
                        <a href={`${imageBaseUrl}/documents/${value}`} target="_blank" rel="noopener noreferrer">
                            Voir le fichier
                        </a>
                    ) : "Aucun fichier";
                case 'select':
                    return value;
                case 'date':
                    return value ? format(new Date(value), 'dd/MM/yyyy') : "";
                default:
                    return value;
            }
        },
        sortable: true,
        minWidth: field.type === 'textarea' ? '300px' : '150px',
    }));

    const endColumns = [
        {
            name: "Date de soumission",
            cell: (row: any) => (
                format(new Date(row.created_at), 'dd MMMM yyyy', { locale: fr })
            ),
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <button className="btn btn-outline-primary btn-sm" onClick={() => handleViewDetail(row)} >
                    { "Voir détails" }
                </button>
            ),
            center: true,
        }
    ];

    const columns = [ ...(dynamicCol || []), ...endColumns];

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px',
            }
        },
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
    };

    if (!selectedCall) {
        return null;
    }


    return (
        <TabPane tabId="2" className={'mb-5'}>
            <div className="p-3">
                <DataTable
                    columns={columns}
                    data={applicationDataByUser || []}
                    pagination
                    responsive
                    striped
                    highlightOnHover
                    customStyles={customStyles}
                    noDataComponent={
                        <div className="p-4 text-center text-muted">
                            Aucune candidature trouvée
                        </div>
                    }
                />
            </div>
        </TabPane>
    );
};
export default CallMyApplications;