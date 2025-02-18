import SVG from "@/CommonComponent/SVG";
import { NotiFications } from "@/Constant";
import { Badge } from "reactstrap";

export const Notification = () => {
  

  return (
    <li className="onhover-dropdown">
      <div className="notification-box">
        <SVG iconId="notification" />
        <Badge pill color="primary">4</Badge>
      </div>
      <div className="onhover-show-div notification-dropdown">
        <h5 className="f-18 f-w-600 mb-0 dropdown-title">{NotiFications}</h5>
        <ul className="notification-box">

        </ul>
      </div>
    </li>
  );
};
