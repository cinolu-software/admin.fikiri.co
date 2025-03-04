import { useAppSelector } from "@/Redux/Hooks";
import ApplicationInfo from "./ApplicationInfo";
import ApplicationPagination from "./ApplicationPagination";
import { TabPane } from "reactstrap";

const ApplicationList = () => {

  return (

    <TabPane tabId="1" >
      <div className="mail-body-wrapper">
        <ul>
          <ApplicationInfo />
        </ul>
        <ApplicationPagination />
      </div>
    </TabPane>

  );
};

export default ApplicationList;
