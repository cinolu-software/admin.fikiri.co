import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/Services/axios";
import Cookies from "js-cookie";
import {UserProfileType, UserGetProfileErrorType, InitialState, UpdateProfilePassword, UpdateProfilePayload} from "@/Types/Authentication/AuthenticationType";


export const getProfile = createAsyncThunk<UserProfileType, void, { rejectValue: UserGetProfileErrorType }>(
    "auth/getProfile",
    async (_, { rejectWithValue }) => {
        try {

            const response = await axiosInstance.get(`${apiBaseUrl}/auth/profile`);
            const profile = response.data.data;
            localStorage.setItem("IsAuthenticated", "true");

            return profile;

        } catch (e: any) {

            if (e.response?.status === 401) {
                localStorage.removeItem("IsAuthenticated");
                Cookies.remove("fikiri_token"); 
                return rejectWithValue({ message: "Session expirée", error: "AUTH_ERROR", statusCode: 401 });
            }
            
            return rejectWithValue({ message: "Erreur lors de la récupération du profil utilisateur", error: "PROFILE_FETCH_ERROR", statusCode: 500 });
        }
    }
);

export const logOut = createAsyncThunk<void, void, {rejectValue: UserGetProfileErrorType}>(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try{
            await axiosInstance.post(`${apiBaseUrl}/auth/sign-out`);
            localStorage.removeItem("IsAuthenticated");
            // Cookies.remove("fikiri_token");
        }catch(e : any){
            const errorMessage = e.response?.data?.error?.message || "Erreur";
            return rejectWithValue({
                message: errorMessage,
                error: "PROFILE_FETCH_ERROR",
                statusCode: 500
            })
        }
    }
);

export const updateProfile = createAsyncThunk<any, UpdateProfilePayload, { rejectValue: string }>(
    "auth/updateProfile",
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${apiBaseUrl}/auth/profile`, profileData);
            const updatedProfile = response.data.data;
            return { user: updatedProfile };
        }
        catch (error: any) {
            const errorMessage = "Une erreur est survenue lors de la mise à jour du profil";
            return rejectWithValue(errorMessage);
        }
    }
);


export const updateProfileImage = createAsyncThunk<UserProfileType, FormData, { rejectValue: string }>(
    "auth/updateProfileImage",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/users/image-profile/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.data;
        }
        catch (error: any) {
            const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la mise à jour de l'image de profil";
            return rejectWithValue(errorMessage);
        }
    }
);

export const updatePassword = createAsyncThunk<UserProfileType, UpdateProfilePassword, { rejectValue: string }>(
    "auth/updatePassword",
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${apiBaseUrl}/auth/update-password`, passwordData);
            return response.data.data;
        }
        catch (error: any) {
            const errorMessage = error.response?.data?.message?.map((err: { message: string }) => `${err.message}`).join(", ") || "Une erreur est survenue lors de la mise à jour du mot de passe";
            return rejectWithValue(errorMessage);
        }
    }
);



const initialState : InitialState = {
    userData: null,
    statusAuthentication: "idle",
    UserGetProfileError: null,
    isAuthenticated: false
}

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state)=> {
                state.statusAuthentication = 'loading';
                state.UserGetProfileError = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.statusAuthentication = "succeeded";
                state.userData = action.payload
                state.isAuthenticated = true
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.statusAuthentication = 'failed';
                state.UserGetProfileError = action.payload ?? null;
            })
            .addCase(logOut.pending, (state)=> {
                state.statusAuthentication = "loading";
            })
            .addCase(logOut.fulfilled, (state)=> {
                state.statusAuthentication = "succeeded";
                state.userData= null;
                state.isAuthenticated = false;
            })
            .addCase(logOut.rejected, (state, action)=>{
                state.statusAuthentication = "failed";
                state.UserGetProfileError = action.payload ?? null;
            })
            .addCase(updateProfileImage.pending, (state) => {
                state.statusAuthentication = "loading";
            })
            .addCase(updateProfileImage.fulfilled, (state, action) => {
                state.statusAuthentication = "succeeded";
                if (state.userData) {
                    state.userData = { ...state.userData, ...action.payload };
                }
            })
            .addCase(updateProfileImage.rejected, (state, action) => {
                state.statusAuthentication = "failed";
                state.UserGetProfileError = {
                    message: action.payload || "Error updating profile image",
                    error: "PROFILE_UPDATE_ERROR",
                    statusCode: 500
                };
            })
            .addCase(updatePassword.pending, (state) => {
                state.statusAuthentication = "loading";
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.statusAuthentication = "succeeded";
                if (state.userData) {
                    state.userData = { ...state.userData, ...action.payload };
                }
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.statusAuthentication = "failed";
                state.UserGetProfileError = {
                    message: action.payload || "Error updating password",
                    error: "PASSWORD_UPDATE_ERROR",
                    statusCode: 500
                };
            })
            .addCase(updateProfile.pending, (state) => {
                state.statusAuthentication = "loading";
                state.UserGetProfileError = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.statusAuthentication = "succeeded";
                if (state.userData) {
                    state.userData = { ...state.userData, ...action.payload.user };
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.statusAuthentication = "failed";
                state.UserGetProfileError = {
                    message: action.payload || "Error updating profile",
                    error: "PROFILE_UPDATE_ERROR",
                    statusCode: 500
                };
            })
    }
})

export default authenticationSlice.reducer;
