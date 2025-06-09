import { Href, ImagePath, Logout } from "@/Constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "react-feather";
import { useEffect } from "react";
import { imageBaseUrl } from "@/Services/axios";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { getProfile, logOut } from "@/Redux/Reducers/AuthenticationSlice";

export const Profile = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { userData } = useAppSelector((state) => state.authentication);

    useEffect(() => {
        try {
            dispatch(getProfile());
        } catch (e) {
            router.push(process.env.NEXT_PUBLIC_URL_HOST_CLIENT as string);
        }
    }, [dispatch]);

    useEffect(() => {
        if (
            userData?.roles &&
            Array.isArray(userData?.roles) &&
            userData?.roles.length === 0
        ) {
            router.push(process.env.NEXT_PUBLIC_URL_HOST_CLIENT as string);
        }
    }, [userData]);

    const LogOutUser = async () => {
        await dispatch(logOut());
        router.push(process.env.NEXT_PUBLIC_HOST_CLIENT as string);
    };

    const truncateName = (name: string, maxLength: number =10) => {
        if (name.length <= maxLength) return name;
        return name.substring(0, maxLength - 3) + "...";
    };

    return (
        <li className="profile-nav onhover-dropdown px-0 py-0">
            {userData ? (
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
                        <div className="flex-grow-1" style={{ minWidth: 0 }}>
                          <span
                              style={{
                                  display: "block",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                              }}
                          >
                            {userData ? truncateName(userData.name) : "Utilisateur"}
                          </span>
                            <p className="mb-0 font-outfit d-flex" style={{ minWidth: 0 }}>
                         <span
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                flex: 1,
                                minWidth: 0,
                            }}
                        >
                  {
                      userData?.roles &&
                      Array.isArray(userData.roles) &&
                      userData.roles.length > 0
                          ? truncateName(userData.roles.join(", "))
                          : null
                  }
                </span>
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
            ) : null}
        </li>
    );
};
