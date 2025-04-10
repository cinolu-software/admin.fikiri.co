import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { fetchApplicationsByCall } from "@/Redux/Reducers/CallSlice/CallApplication";
import { imageBaseUrl } from "@/Services/axios";
import { ImagePath } from '@/Constant';
import { useRouter } from "next/navigation";
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import { fr, id } from 'date-fns/locale';
import { TabPane, Spinner } from "reactstrap";
import { setSelectedApplication } from "@/Redux/Reducers/CallSlice/CallApplication";
import { ApplicationInstance } from "@/Types/Call/Application";

const ApplicationInfo = () => {

  const { applicationData, applicationStatus } = useAppSelector((state) => state.application);
  const { selectedCall } = useAppSelector((state) => state.call);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    if(!selectedCall) {
      router.push('/admin/call');
    }
  }, []);

  useEffect(() => {
    if(selectedCall) {
      dispatch(fetchApplicationsByCall({callId: selectedCall.id}));
    }
  }, [selectedCall]);

  const handleViewDetail =  (application : ApplicationInstance) => {
    setLoadingDetail(true);
    router.push(`/admin/call/detail_call/application_detail`);
    dispatch(setSelectedApplication(application))
  }

  const baseColumns = [
    {
      name: 'Candidat',
      cell: (row: any) => (
        <div className="d-flex align-items-center gap-2">
          <div style={{ width: "40px", height: "40px" }}>
            <img
              className="rounded-circle w-100 h-100"
              src={
                    row.applicant?.profile
                      ? `${imageBaseUrl}/profiles/${row.applicant.profile}`
                      : row.applicant?.google_image
                        ? row.applicant.google_image
                        : `${ImagePath}/avtar/avatar_.jpg`
                  }
              alt={row.applicant?.name || 'Avatar'}
            />
          </div>
        </div>
      ),
      sortable: true,
      minWidth: '250px',
    }
  ];


  const dynamicColumns = selectedCall?.form?.map(field => ({
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
          { loadingDetail ?  <Spinner size={'sm'} /> : "Voir détails" }
        </button>
      ),
      center: true,
    }
  ];

  // const columns = [...baseColumns, ...(dynamicColumns || []), ...endColumns];
  const columns = [ ...(dynamicColumns || []), ...endColumns];

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

  console.log("applicationData===>|",applicationData);
  
  return (
    <TabPane tabId={'2'} className="mb-5">
      <div className="p-3">
        <DataTable
          columns={columns}
          data={applicationData || []}
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
}

export default ApplicationInfo;