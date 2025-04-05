import { createSlice, createAsyncThunk, PayloadAction, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/Services/axios";
import { CallType, CallInstance, InitialStateCallType, DataGetCallErrorType, CreateCallType, UpdateCallType, UpdateCoverCallType, Author, ReceiveDataReviewer, UpdateReviewerSolution } from "@/Types/Call/CallType";
import { ShowError } from "@/utils";



const initialState: InitialStateCallType = {
    callData: [],
    publishedCallData: [],
    totalAllCall: null,
    totalPublishedCall: null,
    reviewerData: null,
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
        form: [],
        review_form: [],
        requirements: [],
    },
    EditFormValue: {
        name: "",
        description: "",
        started_at: "",
        ended_at: "",
        form: [],
        review_form: [],
        requirements: [],
    },
    numberLevel: 1,
    showFinish: false,
};

export const fetchCall = createAsyncThunk<CallInstance[], void, { rejectValue: DataGetCallErrorType }>(
    "call/fetchCall",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/calls`);
            return response.data.data as CallInstance[];
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

export const fetchCallById = createAsyncThunk<CallInstance, string, { rejectValue: DataGetCallErrorType }>(
    "call/fetchCallById",
    async (callId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/calls/${callId}`);
            return response.data.data as CallInstance;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.statusCode || "Erreur lors de la récupération d'appels";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_FETCH_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            });
        }
    }
);

export const fetchPublishedCall = createAsyncThunk<CallType[], void, { rejectValue: DataGetCallErrorType }>(
    "call/fetchPublishedCall",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/calls/find-published/`);
            return response.data.data[0] as CallType[];
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.statusCode || "Erreur lors de la publication de l'appel";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_FETCH_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            });
        }
    }
);

export const createCall = createAsyncThunk<CallInstance, CreateCallType, { rejectValue: DataGetCallErrorType }>(
    "call/createCall",
    async (callData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/calls`, callData);
            return response.data.data as CallInstance;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.statusCode || "Erreur lors de la création de l'appel";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_CREATE_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            });
        }
    }
);

export const updateCall = createAsyncThunk<CallInstance, UpdateCallType, { rejectValue: DataGetCallErrorType }>(
    "call/updateCall",
    async ({ id, ...callData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${apiBaseUrl}/calls/${id}`, callData);
            return response.data.data as CallInstance;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la mise à jour de l'appel";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_UPDATE_ERROR",
                statusCode: e.response?.status || 500
            });
        }
    }
);

export const deleteCall = createAsyncThunk<string, string, { rejectValue: DataGetCallErrorType }>(
    "call/deleteCall",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/calls/${id}`);
            return id;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la suppresion de l'appel";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_DELETE_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            });
        }
    }
);

export const updatedCoverCall = createAsyncThunk<CallInstance, UpdateCoverCallType, { rejectValue: DataGetCallErrorType }>(
    "call/updateCoverCover",
    async ({ id, imageFile }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("cover", imageFile);

            const response = await axiosInstance.post(
                `${apiBaseUrl}/calls/cover/${id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return response.data.data as CallInstance;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur survenue lors de la mise à jour de l'image de l'appel";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_UPDATE_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            });
        }
    }
);

export const addDocumentCall = createAsyncThunk<CallInstance, { callId: string, document: any }, {rejectValue: any}>(
    "call/addDocumentCall", 
    async ({callId, document}, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            formData.append("thumb", document);

            const response = await axiosInstance.post(
                `${apiBaseUrl}/calls/document/${callId}`,
                formData,
                {headers : { "Content-Type" : 'multipart/form-data' }}
            );
            return response.data.data as CallInstance;
        }
        catch (e: any) {
            const errorMessage = e.response?.data?.error?.statusCode || "Erreur lors de l'ajout du document";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_ADD_DOCUMENT_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            })
        }
    }
);

export const publishCall = createAsyncThunk<CallInstance, { callId: string }, { rejectValue: any}>(
    "call/publishCall", 
    async ({callId}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/calls/publish/${callId}`);
            return response.data.data as CallInstance;
        }
        catch (e: any) {
            const errorMessage = e.response?.data?.error?.statusCode || "Erreur lors de la publication de l'appel";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_FETCH_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            })
        }
    }
);

export const unpublishCall = createAsyncThunk<CallInstance, { callId: string }, { rejectValue: any}>(
    "call/unpublishCall",
     async ({callId}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/calls/publish/${callId}`);
            return response.data.data as CallInstance;
        }
        catch (e: any) {
            const errorMessage = e.response?.data?.error?.statusCode || "Erreur lors de la dépublication de l'appel";
            return rejectWithValue({
                message: errorMessage,
                error: "CALL_FETCH_ERROR",
                statusCode: e.response?.data?.error?.statusCode || 500
            })
        }   
    }
)

export const addReviewer = createAsyncThunk<CallInstance, {email: string, organization: string, callId: string, solutions: number}, {rejectValue: any}>(
    "call/addReviewer",
    async({email, organization, callId, solutions}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.post(`${apiBaseUrl}/calls/add-reviewer/${callId}`, {email, organization, solutions});
            return response.data.data as CallInstance

        }catch(error : any){
            const errorMessage = error.response?.data?.error?.statusCode || "Erreur lors de l'ajout du curateur";
            return rejectWithValue ({
                message : errorMessage,
                error: "REVIEWER_ADDING_ERROR",
                statusCode: error.response?.data?.error?.statusCode || 500
            })
        }
    }
)

export const deleteReviewer = createAsyncThunk<CallInstance, {email: string, callId: string}, {rejectValue: any}>(
    "call/deleteReviewer",
    async({email, callId}, {rejectWithValue})=>{
        try{
            const response = await axiosInstance.delete(`${apiBaseUrl}/calls/delete-reviewer/${callId}`, {
                data: { email }
            });
            return response.data.data as CallInstance
        }catch(error: any){
            const errorMessage = error.response?.data?.error?.statusCode || "Erreur lors de la suppression du curateur";
            return rejectWithValue ({
                message : errorMessage,
                error: "DELEE_REVIEWER_ERROR",
                statusCode: error.response?.data?.error?.statusCode || 500
            })
        }
    }
);

export const resendReviewerLink = createAsyncThunk<{data: string}, {email: string}, {rejectValue: any}>(
    "call/resendReviewLink",
    async({email}, { rejectWithValue })=>{
        try{
            const response = await axiosInstance.post(`${apiBaseUrl}/calls/resend-review-link/${email}`)
            return {data : response.data.data};
        }catch(error: any){
            const errorMessage = error.response?.data?.error?.statusCode || "Erreur lors de la suppression du curateur";
            return rejectWithValue ({
                message : errorMessage,
                error: "DELEE_REVIEWER_ERROR",
                statusCode: error.response?.data?.error?.statusCode || 500
            })
        }
    }
);

export const updateReviewerSolution = createAsyncThunk<CallInstance, UpdateReviewerSolution, {rejectValue: any}>(
    "call/updateReviewerSolution",
    async({email, id, solutions, organization}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.patch(`${apiBaseUrl}/calls/update-reviewer/${id}/${email}`, {solutions, organization, email});
            return response.data.data as CallInstance;
        }catch(error: any){
            const errorMessage = error.response?.data?.error?.statusCode || "Erreur lors de la mise à jour du nombre de solutions";
            return rejectWithValue ({
                message : errorMessage,
                error: "UPDATE_REVIEWER_ERROR",
                statusCode: error.response?.data?.error?.statusCode || 500
            })
        }
    }
);



const validateStep = (state: InitialStateCallType) => {
    const { name, form, requirements, started_at, ended_at, description } = state.AddFormValue;
    switch (state.numberLevel) {
        case 1:
            if (!name || !description) {
                ShowError();
                return false;
            }
            break;
        case 2:
            if (!name || !description || !ended_at || !started_at) {
                ShowError();
                return false;
            }
            break;
        case 3:
            if (!name || !description || !ended_at || !started_at || !form) {
                ShowError();
                return false;
            }
            break;
        case 4:
            if (!name || !description || !ended_at || !started_at || !form || !requirements) {
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
        setNavId: (state, action: PayloadAction<number>) => {
            state.navId = action.payload;
        },
        setTabId: (state, action: PayloadAction<number>) => {
            state.tabId = action.payload;
        },
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        },
        setModalDeleteCall: (state, action: PayloadAction<{ isOpen: boolean, call: CallType | null | CallInstance }>) => {
            state.isOpenModalDeleteCall = action.payload.isOpen;
            state.selectedCall = action.payload.call;
        },
        addRequirement: (state, action: PayloadAction<{ name: string; description: string }>) => {
            // @ts-ignore
            state.AddFormValue.requirements.push(action.payload);
        },
        removeRequirement: (state, action: PayloadAction<number>) => {
            // @ts-ignore
            state.AddFormValue.requirements.splice(action.payload, 1);
        },
        updateRequirement: (state, action: PayloadAction<{ index: number; field: keyof CreateCallType; value: string }>) => {
            const { index, field, value } = action.payload;
            // @ts-ignore
            if (state.AddFormValue.requirements[index]) {
                // @ts-ignore
                state.AddFormValue.requirements[index][field] = value;
            }
        },
        setFormField: (state, action: PayloadAction<{ form?: any, curationForm?: any }>) => {
            if (action.payload.form !== undefined) {
                state.AddFormValue.form = action.payload.form;
            }
            if (action.payload.curationForm !== undefined) {
                state.AddFormValue.review_form = action.payload.curationForm;
            }
        },
        setRequirementsAction: (state, action: PayloadAction<{ requirements: any}>) => {
            state.AddFormValue.requirements = action.payload.requirements;
        },
        setAddFormField: (state, action) => {
            const { index, field, value } = action.payload;
            if (state.AddFormValue.form && state.AddFormValue.form[index]) {
                // @ts-ignore
                state.AddFormValue.form[index][field] = value;
            }
        },
        addFormField: (state, action) => {
            state.AddFormValue.form = state.AddFormValue.form || [];
            state.AddFormValue.form.push(action.payload);
        },
        updateFormField: (state, action) => {
            const { index, updatedField } = action.payload;

            // @ts-ignore
            if (state.form && state.form[index] !== undefined) {
                // @ts-ignore
                state.form[index] = updatedField;
            } else {
                console.error(`Index ${index} invalide dans state.form.`);
            }
        },
        removeFormField: (state, action) => {
            const index = action.payload;
            if (state.AddFormValue.form) {
                state.AddFormValue.form.splice(index, 1);
            }
        },
        resetFormFields: (state) => {
            state.AddFormValue.form = [];
        },
        setAddFormValue: (state, action: PayloadAction<{ field: keyof CreateCallType, value: any }>) => {
            const { field, value } = action.payload;
            if (field === "started_at" || field === "ended_at") {
                state.AddFormValue[field] = new Date(value).toISOString().split("T")[0];
            } else {
                state.AddFormValue[field] = value;
            }
        },
        handleBackButton: (state) => {
            if (state.numberLevel > 1) {
                state.numberLevel--;
            }
        },
        handleNextButton: (state) => {
            state.numberLevel++;
        },
        resetFormValue: (state) => {
            state.AddFormValue = {
                name: "",
                description: "",
                started_at: "",
                ended_at: "",
                form: [],
                review_form: [],
                requirements: [],
            };
            state.numberLevel = 1;
        },
        setSelectedCall: (state, action: PayloadAction<CallInstance | null>) => {
            state.selectedCall = action.payload;
            if (action.payload) {
                state.AddFormValue = {
                    name: action.payload.name,
                    description: action.payload.description,
                    started_at: action.payload.started_at,
                    ended_at: action.payload.ended_at,
                    // @ts-ignore
                    form: action.payload?.form || [],
                    // @ts-ignore
                    requirements: action.payload.requirements || [] ,
                };
            }
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
                state.totalAllCall = action.payload.length;
                state.callData = action.payload;
            })
            .addCase(fetchCall.rejected, (state, action) => {
                state.statusCall = "failed";
                state.error = action.payload ?? null;
            })
            .addCase(deleteCall.fulfilled, (state, action: PayloadAction<string>) => {
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
            .addCase(fetchCallById.pending, (state) => {
                state.statusCall = 'loading';
                state.error = null;
            })
            .addCase(fetchCallById.fulfilled, (state, action: PayloadAction<CallInstance>) => {
                state.statusCall = "succeeded";
                state.selectedCall = action.payload;
            })
            .addCase(fetchCallById.rejected, (state, action) => {
                state.statusCall = "failed";
                state.error = action.payload ?? null;
            })
            .addCase(fetchPublishedCall.pending, (state) => {
                state.publishedStatus = 'loading';
                state.error = null;
            })
            .addCase(fetchPublishedCall.fulfilled, (state, action: PayloadAction<CallType[]>) => {
                state.publishedStatus = 'succeeded';
                state.totalPublishedCall = action.payload.length;
                state.publishedCallData = action.payload;
            })
            .addCase(fetchPublishedCall.rejected, (state, action) => {
                state.statusCall = "failed";
                state.error = action.payload ?? null;
            })
            .addCase(updatedCoverCall.pending, (state) => {
                state.statusCall = "loading";
                state.error = null;
            })
            .addCase(updatedCoverCall.fulfilled, (state, action: PayloadAction<CallInstance>) => {
                state.statusCall = "succeeded";
                const call = state.callData.find(call => call.id === action.payload.id);
                if (call) {
                    call.cover = action.payload.cover;
                }
            })
            .addCase(updatedCoverCall.rejected, (state, action) => {
                state.statusCall = "failed";
                state.error = action.payload ?? null;
            })
            .addCase(addReviewer.fulfilled, (state, action: PayloadAction<CallInstance>) => {
                state.selectedCall = action.payload;
            })
            .addCase(deleteReviewer.fulfilled, (state, action: PayloadAction<CallInstance>) => { 
                state.selectedCall = action.payload;
            })
            .addCase(updateReviewerSolution.fulfilled, (state, action: PayloadAction<CallInstance>) => { 
                state.selectedCall = action.payload;
            })
            .addCase(updateReviewerSolution.rejected, (state, action) => {
                state.statusCall = "failed";
                state.error = action.payload ?? null;
            })
            
            ;
    }
});

export const {
    setFilterToggle,
    setModalDeleteCall,
    resetFormValue,
    setAddFormValue,
    handleNextButton,
    handleBackButton,
    setSelectedCall,
    setFormField,
    setRequirementsAction
} = callSlice.actions;

export default callSlice.reducer;