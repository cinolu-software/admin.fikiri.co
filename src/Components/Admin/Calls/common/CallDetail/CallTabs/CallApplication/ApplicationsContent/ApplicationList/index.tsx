import { useAppSelector } from "@/Redux/Hooks";
import ApplicationInfo from "./ApplicationInfo";
import ApplicationPagination from "./ApplicationPagination";
import { TabPane } from "reactstrap";

const ApplicationList = () => {

  const { inboxEmail, page } = useAppSelector((state) => state.letterBox);

  return (

    <TabPane tabId="1" >
      <div className="mail-body-wrapper">
        <ul>
          {inboxEmail.map((data, i) => (
            <li className={`inbox-data ${page ? i < 7 ? "hidden" : "" : i < 7 ? "" : "hidden" }`} key={i}>
              <ApplicationInfo data={data} ids={i} />
            </li>
          ))}
        </ul>
        <ApplicationPagination />
      </div>
    </TabPane>

  );
};

export default ApplicationList;
