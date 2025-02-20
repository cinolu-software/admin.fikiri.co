import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/Services/axios";
import Cookies from "js-cookie";
import {UserProfileType, UserGetProfileErrorType, InitialState} from "@/Types/Authentication/AuthenticationType";
import {RootState} from "@/Redux/Store";


export const getProfile = createAsyncThunk<UserProfileType, void, { rejectValue: UserGetProfileErrorType }>(
    "auth/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/auth/profile`);
            const profile = response.data.data;
            Cookies.set("fikiri_token", JSON.stringify(profile));
            return profile;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la récupération du profil utilisateur";
            return rejectWithValue({
                message: errorMessage,
                error: "PROFILE_FETCH_ERROR",
                statusCode: e.response?.status || 500
            });
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
    }
})

export default authenticationSlice.reducer;
