import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/Services/axios";
import {CallType, CallInstance, InitialStateCallType, FormValue, DataGetCallErrorType, CreateCallType, UpdateCallType} from "@/Types/Call/CallType";
import {ShowError} from "@/utils";


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
    AddFormValue: {
        name: "",
        description: "",
        started_at: "",
        ended_at: "",
        form: null,
        requirements: null,
    },
    EditFormValue: {
        name: "",
        description: "",
        started_at: "",
        ended_at: "",
        form: null,
        requirements: null,
    },
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

const validateStep = (state: InitialStateCallType) => {
    // @ts-ignore
    const {name, form, requirements, started_at, ended_at, description} = state.AddFormValue;
    switch(state.numberLevel){
        case 1:
            if(!name || !description ){
                ShowError();
                return false;
            }
            break;
        case 2:
            if(!name || !description || !ended_at || !started_at ){
                ShowError();
                return false;
            }
            break;
        case 3:
            if(!name || !description || !ended_at || !started_at || !form ){
                ShowError();
                return false;
            }
            break;
        case 4:
            if(!name || !description || !ended_at || !started_at || !form || !requirements){
                ShowError();
                return false;
            }
            break;
    }
    return true;
};

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
        },
        setAddFormValue: (state, action: PayloadAction<{field: keyof CreateCallType, value: any}>) => {
            const {field, value} = action.payload;
            if( field === "started_at" || field === "ended_at"){
                state.AddFormValue[field] = new Date(value).toISOString().split("T")[0]
            }else {
                state.AddFormValue[field] = value;
            }
        },
        handleBackButton: (state) => {
            if(state.numberLevel > 1){
                state.numberLevel--;
            }
        },
        handleNextButton: (state) => {
            const isValid = validateStep(state);
            if(isValid){
                if(state.navId < 5){
                    state.numberLevel++;
                }else if(state.numberLevel === 5){
                    state.showFinish = true;
                }
            }
        },
        resetFormValue: (state) => {
            state.AddFormValue = {
                name: "",
                description: "",
                started_at: "",
                ended_at: "",
                form: null,
                requirements: null,
            }
            state.numberLevel = 1
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
            .addCase(createCall.pending, (state) => {
                state.statusCall = 'loading';
                state.error = null;
            })
            .addCase(createCall.fulfilled, (state, action: PayloadAction<CallInstance>) => {
                state.statusCall = "succeeded";
                state.callData.push(action.payload);
            })
            .addCase(createCall.rejected, (state, action) => {
                state.statusCall = "failed";
                state.error = action.payload ?? null;
            })
    }
})

export const { setFilterToggle, setModalDeleteCall, setTabId, setNavId, resetFormValue, setAddFormValue, handleNextButton, handleBackButton } = callSlice.actions;

export default callSlice.reducer;

