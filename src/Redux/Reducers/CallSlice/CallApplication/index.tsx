
import {InitialStateType, ApplicationInstance, ApplicationsByUser, ErrorType, SubmitSolutionPayload} from "@/Types/Call/Application";
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/Services/axios";

const initialState: InitialStateType = {
    applicationData: [],
    applicationDataByUser: [],
    totalApplication: 0,
    selectedApplication: null,  
    applicationStatus: 'idle',
    applicationByUserStatus: 'idle',
    error: null,
};

export const fetchApplicationsByCall = createAsyncThunk<ApplicationInstance[], { callId: string }, { rejectValue: ErrorType }>(
    "application/fetchApplicationByCall",
    async ({ callId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/solutions/call/${callId}`);
            return response.data.data as ApplicationInstance[];
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la récupération d'appels";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_FETCH_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            });
        }
    }
);

export const fetchApplicationByUser = createAsyncThunk<ApplicationsByUser[], {userId: string}, {rejectValue: ErrorType}>(
    "application/fetchApplicationByUser",
    async({userId}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.get(`${apiBaseUrl}/solutions/user/${userId}`);
            return response.data.data as ApplicationsByUser[];
        }catch(e: any){
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la récupération des solutions";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_FETCH_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            });
        }
    }
);

export const submitSolution = createAsyncThunk<ApplicationInstance, SubmitSolutionPayload, { rejectValue: ErrorType }>(
    "application/submitSolution",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/solutions`, payload);
            return response.data.data as ApplicationInstance;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la soumission de la solution.";
            return rejectWithValue({
                message: errorMessage,
                error: "SUBMIT_SOLUTION_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            });
        }
    }
);



const ApplicationsSlice = createSlice({
    name: "Applications",
    initialState,
    reducers: {
        setSelectedApplication: (state, action: PayloadAction<ApplicationInstance | null>) => {
            //@ts-ignore
            state.selectedApplication = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApplicationsByCall.pending, (state) => {
                state.applicationStatus = 'loading';
                state.error = null;
            })
            .addCase(fetchApplicationsByCall.fulfilled, (state, action: PayloadAction<ApplicationInstance[]>) => {
                state.applicationStatus = 'succeeded';
                state.applicationData = action.payload;
                state.totalApplication = action.payload.length;
            })
            .addCase(fetchApplicationsByCall.rejected, (state, action) => {
                state.applicationStatus = 'failed';
                state.error = action.payload ?? null;
            })

            .addCase(fetchApplicationByUser.pending, (state) => {
                state.applicationByUserStatus = 'loading';
                state.error = null;
            })
            .addCase(fetchApplicationByUser.fulfilled, (state, action:PayloadAction<ApplicationsByUser[]>) => {
                state.applicationByUserStatus = 'succeeded';
                state.applicationDataByUser = action.payload;
            })
            .addCase(fetchApplicationByUser.rejected, (state, action) => {
                state.applicationByUserStatus = 'failed';
                state.error = action.payload ?? null;
            })
            .addCase(submitSolution.pending, (state) => {
                state.applicationStatus = 'loading';
                state.error = null;
            })
            .addCase(submitSolution.fulfilled, (state, action: PayloadAction<ApplicationInstance>) => {
                state.applicationStatus = 'succeeded';
                state.applicationData.push(action.payload);
            })
            .addCase(submitSolution.rejected, (state, action) => {
                state.applicationStatus = 'failed';
                state.error = action.payload ?? null;
            });
    }
});

export const { setSelectedApplication } = ApplicationsSlice.actions;
export default ApplicationsSlice.reducer;