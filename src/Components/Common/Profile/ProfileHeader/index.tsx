import React, { useRef } from "react";
import { CardHeader } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { ImagePath } from "@/Constant";
import { updateProfileImage } from "@/Redux/Reducers/AuthenticationSlice";
import { imageBaseUrl } from "@/Services/axios";

const ProfileHeader = () => {

    const dispatch = useAppDispatch();
    const { userData } = useAppSelector((state) => state.authentication);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const formatDate = (dateString: string) => {
        if (!dateString) return "Date inconnue";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const inscriptionDate = userData?.created_at ? formatDate(userData.created_at) : "Date inconnue";

    const handleCameraClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.append("image", event.target.files[0]);
            dispatch(updateProfileImage(formData));
        }
    };

    return (
        <CardHeader>
            <div className="row profile-header">
                <div className="col-12 bg-light-primary block-backgroud"></div>
                <div className={'container-avatar'}>
                    <div className="avatar-profile">
                        {
                            userData?.profile ?
                                <img src={`${imageBaseUrl}/profiles/${userData.profile}`} alt="Profile"/> :
                                <img src={`${ImagePath}/avtar/avatar_.jpg`} alt="Profile"/>
                        }
                    </div>
                </div>

                <div className="col-12 block-info">
                    <h1>{userData?.name || "Utilisateur Inconnu"}</h1>
                    <h4> {userData?.email || "Email non disponible"} • Rejoint le {inscriptionDate} </h4>
                </div>
            </div>
        </CardHeader>
    );
};

export default ProfileHeader;