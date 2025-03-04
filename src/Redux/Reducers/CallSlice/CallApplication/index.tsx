import {InboxEmailData} from "@/Data/Admin/Call/Application";
import {InitialStateType, ApplicationInstance, ErrorType} from "@/Types/Call/Application";
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/Services/axios";

const initialState: InitialStateType = {
    applicationData: [],
    selectedApplication: null,
    applicationStatus: 'idle',
    error: null,
    modal : false,
    composeEmail : false,
    faIcon :false,
    page : false,
    interviewEmail : false,
    inboxEmail : InboxEmailData,
    emailValidation: false,
};


export const fetchApplicationsByCall = createAsyncThunk<ApplicationInstance[] ,{callId: string}, {rejectValue: ErrorType}>(
    "application/fetchApplicationByCall",
    async ({callId}, {rejectWithValue}) =>{
        try{
            const response = await axiosInstance.get(`${apiBaseUrl}/applications/for/${callId}`);
            return response.data.data as ApplicationInstance[]
        }catch(e: any){
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la récupération d'appels";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_FETCH_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            });
        }
    }
)

const ApplicationsSlice = createSlice({
    name: "Applications",
    initialState,
    reducers: {
        setModal:(state,action)=>{
            state.modal = action.payload
        },
        setComposeEmail : (state,action)=>{
            state.composeEmail = action.payload
        },
        handleEnvelope :(state,action) => {
            state.faIcon = action.payload
        },
        handleInterview: (state,action) => {
            state.interviewEmail = action.payload
        },
        setPage: (state,action) => {
            state.page = action.payload
        },
        removeItems: (state, action) => {
            state.inboxEmail = state.inboxEmail?.filter((data) => data.id !== action.payload);
        },
        addToFavorites :(state, action) => {
            if(action.payload.star === false){
                state.inboxEmail = state.inboxEmail.map((item)=>(item.id === action.payload.id) ? {...item,star:true}:item)
            }else{
                state.inboxEmail = state.inboxEmail.map((item)=>(item.id === action.payload.id) ? {...item,star:false}:item)
            }
        },
        removeFromFavorite : (state,action) => {
            state.inboxEmail = state.inboxEmail.map((data) => (data.id === action.payload.id ? { ...data, star: false } : data));
        },
        setEmailValidation: (state,action) => {
            state.emailValidation = action.payload
        },
        addNewEmail: (state, action) => {
            const emailTemp = {
                id: state.inboxEmail.length + 1,
                star: false,
                image: "14.png",
                color:"primary",
                name: action.payload.userEmail,
                message: action.payload.subject,
                subMessage:"craft beer labore wes anderson cred nesciunt sapiente ea proident...",
                time:"7:50 AM"
            };
            state.inboxEmail = [emailTemp, ...state.inboxEmail];
        },
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
            })
            .addCase(fetchApplicationsByCall.rejected, (state, action) => {
                state.applicationStatus = 'failed';
                state.error = action.payload ?? null;
            })
    }
})

export const {setModal,setComposeEmail,setPage,handleEnvelope,handleInterview,removeItems,addToFavorites,removeFromFavorite,setEmailValidation,addNewEmail} = ApplicationsSlice.actions

export default ApplicationsSlice.reducer