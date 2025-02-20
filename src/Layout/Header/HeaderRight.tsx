import { Col } from "reactstrap";
import { Notification } from "./Notification";
import { Profile } from "./Profile";
import MaximizeScreen from "./MaximizeScreen";

export const HeaderRight = () => {
  return (
    <Col xxl="8" xl="6" md="7" xs="8" className="nav-right pull-right right-header p-0 ms-auto">
      <ul className="nav-menus">
        <MaximizeScreen />
        {/*<Notification />*/}
        <Profile/>
      </ul>
    </Col>
  );
};
