import { Href, ImagePath, Logout } from "@/Constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "react-feather";
import {useEffect} from "react";
import {imageBaseUrl} from "@/Services/axios";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {getProfile, logOut} from "@/Redux/Reducers/AuthenticationSlice";


export const Profile = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userData } =useAppSelector(state=>state.authentication);

    useEffect(() => {
        try{
            dispatch(getProfile());
        }catch (e){
            router.push(process.env.NEXT_PUBLIC_URL_HOST_CLIENT as string);
        }
    }, [dispatch]);

    useEffect(() => {
        if(userData?.roles && Array.isArray(userData?.roles) && userData?.roles.length  === 0){
            router.push(process.env.NEXT_PUBLIC_URL_HOST_CLIENT as string);
        }
    }, [userData]);

  const LogOutUser = async () => {
      await dispatch(logOut());
      router.push(process.env.NEXT_PUBLIC_HOST_CLIENT as string);
  };

  return (
    <li className="profile-nav onhover-dropdown px-0 py-0">
        {
            userData ? (

                <>
                    <div className="d-flex profile-media align-items-center">
                        <img
                            className="profile-img"
                            src={
                                userData?.profile
                                    ? `${imageBaseUrl}/profiles/${userData.profile}`
                                    : userData?.google_image
                                        ? userData.google_image
                                        : `${ImagePath}/avtar/avatar_.jpg`
                            }
                            alt="profile utilisateur"
                        />
                        <div className="flex-grow-1">
                            <span>{userData ? userData.name : "Utilisateur"}</span>
                            <p className="mb-0 font-outfit">
                                {
                                    userData?.roles && Array.isArray(userData.roles) ? (
                                        userData.roles.map((role, index) => (
                                            <span key={index} className="me-1">
                                                {role}
                                            </span>
                                        ))
                                    ) : (
                                            <span></span>
                                        )
                                }
                                <i className="ms-2 fa fa-angle-down"></i>
                            </p>
                        </div>
                    </div>
                    <ul className="profile-dropdown onhover-show-div">
                        <li onClick={LogOutUser}>
                            <Link href={Href} scroll={false}>
                                <LogOut />
                                <span>{Logout}</span>
                            </Link>
                        </li>
                    </ul>
                </>

            ) : (
                <></>
            )
        }
    </li>
  );
};
