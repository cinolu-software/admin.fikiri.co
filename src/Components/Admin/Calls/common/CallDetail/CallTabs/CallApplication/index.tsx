import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { fetchApplicationsByCall } from "@/Redux/Reducers/CallSlice/CallApplication";
import { useRouter } from "next/navigation";
import DataTable from 'react-data-table-component';
import { TabPane } from "reactstrap";
import { SolutionListTableDataColumn } from "@/Data/Admin/Call/Application";

const ApplicationInfo = () => {
  const { applicationData } = useAppSelector((state) => state.application);
  const { selectedCall } = useAppSelector((state) => state.call);
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  return (
      <TabPane tabId={'2'} className="mb-5">
        <div className="p-3">
          <DataTable
              className="theme-scrollbar"
              columns={SolutionListTableDataColumn(applicationData || [])}
              striped
              highlightOnHover
              data={applicationData || []}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 25, 50]}
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