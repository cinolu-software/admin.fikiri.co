import React, {useState, useMemo} from 'react';
// import {ReceiveProjectType, ReceiveProjectTypeTable} from "@/Types/Projects/ProjectType";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {Card, CardBody, Col, Input, Label, Row} from "reactstrap";
import {CallHeader} from "@/Components/Admin/Calls/common/CallHeader";
// import {CollapseFilterData} from "@/Components/Applications/projects/common/CollapseFilterData";

import DataTable from "react-data-table-component";
// import {ProjectListTableDataColumn} from "@/Data/Application/Project";

// const ProjectListContainer: React.FC<ReceiveProjectTypeTable> = ({project, projectStatus}) => {
//
//     const [filterText, setFilterText] = useState("");
//     const filteredItems = project?.filter((item : ReceiveProjectType)=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
//     const subHeaderComponentMemo = useMemo(()=>{
//         return (
//             <div className="dataTables_filter d-flex align-items-center">
//                 <Label className="me-2">{"Chercher"}:</Label>
//                 <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
//             </div>
//         );
//     }, [filterText]);
//
//
//     return (
//         <>
//             <Row>
//                 <Col sm="12">6t
//                     <Card>
//                         <CardBody>
//                             <div className="list-product-header">
//                                 <ProjectHeader />
//                                 <CollapseFilterData/>
//                             </div>
//                             <div className="list-product">
//                                 <div className="table-responsive">
//                                     <DataTable
//                                         className="theme-scrollbar"
//                                         data={filteredItems}
//                                         columns={ProjectListTableDataColumn}
//                                         striped
//                                         highlightOnHover
//                                         pagination
//                                         subHeader
//                                         subHeaderComponent={subHeaderComponentMemo}
//                                     />
//                                 </div>
//                             </div>
//                         </CardBody>
//                     </Card>
//                 </Col>
//             </Row>
//         </>
//     )
// }
//
// export default ProjectListContainer;

const CallListContainer = (props: any) => {

    return (
        <div>
        </div>
    )
}

export default CallListContainer