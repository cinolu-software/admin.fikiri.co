import { Href, ImagePath, Logout } from "@/Constant";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "react-feather";

export const Profile = () => {
  
  const router = useRouter();
  const LogOutUser = () => {
    Cookies.remove("mofi_token");
    router.push("/auth/login");
  };

  return (
    <li className="profile-nav onhover-dropdown px-0 py-0">
      <div className="d-flex profile-media align-items-center">
        <div className="flex-grow-1">
            <div className="ps-5">
                <img className="img-30" src={`${ImagePath}/dashboard/profile.png`} alt="" />
            </div>
        </div>
          <div className="ms-1">
              <i className="fa fa-angle-down mt-2"></i>
          </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        <li onClick={LogOutUser}>
            <Link href={Href} scroll={false} ><LogOut /><span>{Logout} </span></Link>
        </li>
      </ul>
    </li>
  );
};
