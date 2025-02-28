import {SupportEmailData} from "@/Data/Admin/Call/Application";
import { TabPane } from "reactstrap";
import UserEmailContent from "./UserEmailContent";

const SupportContent = () => {
  return (
    <TabPane tabId="8">
      <div className="mail-body-wrapper">
        <ul className="simple-list">
          {SupportEmailData.map((data, i) => (
            <li className="inbox-data" key={i}>
              <UserEmailContent data={data} ids={i}/> 
            </li>
          ))}
        </ul>
      </div>
    </TabPane>
  );
};

export default SupportContent;
