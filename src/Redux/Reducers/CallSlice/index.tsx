import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/Services/axios";
import {CallType, CallInstance, InitialStateCallType, FormValue, DataGetCallErrorType, CreateCallType, UpdateCallType} from "@/Types/Call/CallType";


const initialState: InitialStateCallType = {
    callData: [],
    statusCall: 'idle',
    filterToggle: false,
    publishedStatus: 'idle',
    error: null,
    isOpenModalCreateCall: false,
    isOpenModalDeleteCall: false,
    isOpenModalEditCall: false,
    selectedCall: null,
    navId: 1,
    tabId: 1,
    AddFormValue: null,
    EditFormValue: null,
    numberLevel: 1,
    showFinish: false,
}

export const fetchCall = createAsyncThunk<CallInstance[], void, {rejectValue: DataGetCallErrorType } >(
    "call/fetchCall",
    async(_, {rejectWithValue})=>{
        try{
            const response = await axiosInstance.get(`${apiBaseUrl}/opportunities`);
            return response.data.data as CallInstance[];
        }catch (e: any){
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la récupération d'appels";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_FETCH_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            })
        }
    }
)

export const createCall = createAsyncThunk<CallInstance, CreateCallType, {rejectValue: DataGetCallErrorType}>(
    "call/createCall",
    async(callData, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.post(`${apiBaseUrl}/opportunities`, callData);
            return response.data.data as CallInstance
        }catch(e: any){
            const errorMessage = e.response?.data?.error?.statusCode || "Erreur lors de la création de l'appel";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_CREATE_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            })
        }
    }
)

export const updateCall = createAsyncThunk<CallInstance, UpdateCallType, {rejectValue: DataGetCallErrorType}>(
    "call/updateCall",
    async ({id, ...callData}, {rejectWithValue})=>{
        try{
            const response = await axiosInstance.patch(`${apiBaseUrl}/opportunities/${id}`, callData);
            return response.data.data as CallInstance
        }catch(e: any) {
            const errorMessage = e.responsde?.data?.error?.message || "Erreur lors de la mise à jour de l'appel";
            return rejectWithValue(
                {
                    message: errorMessage,
                    error: "CALL_UPDATE_ERROR",
                    statusCode: e.response?.status || 500
                }
            )
        }
    }
)

export const deleteCall = createAsyncThunk<string, string, {rejectValue: DataGetCallErrorType}>(
    "call/deleteCall",
    async(id, {rejectWithValue})=>{
        try{
            await axiosInstance.delete(`${apiBaseUrl}/opportunities/${id}`);
            return id;
        }catch(e: any){
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la suppresion de l'appel";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_DELETE_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            });
        }
    }
);

const callSlice = createSlice({
    name: "call",
    initialState,
    reducers: {
        setNavId: (state, action: PayloadAction<number>) =>{
            state.navId = action.payload;
        },
        setTabId: (state, action: PayloadAction<number>) =>{
            state.tabId = action.payload;
        },
        setFilterToggle: (state) =>{
            state.filterToggle = !state.filterToggle;
        },
        setModalDeleteCall: (state, action: PayloadAction<{isOpen: boolean, call: CallType | null}>) =>{
            state.isOpenModalDeleteCall = action.payload.isOpen;
            state.selectedCall = action.payload.call;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCall.pending, (state) => {
                state.statusCall = 'loading';
                state.error = null;
            })
            .addCase(fetchCall.fulfilled, (state, action: PayloadAction<CallInstance[]>) => {
                state.statusCall = "succeeded";
                state.callData = action.payload
            })
            .addCase(fetchCall.rejected, (state, action) => {
                state.statusCall = "failed";
                state.error = action.payload ?? null;
            })
            .addCase(deleteCall.fulfilled, (state, action : PayloadAction<string>) => {
                state.callData = state.callData.filter(call => call.id !== action.payload);
            })
    }
})

export const { setFilterToggle, setModalDeleteCall, setTabId, setNavId } = callSlice.actions;

export default callSlice.reducer;

