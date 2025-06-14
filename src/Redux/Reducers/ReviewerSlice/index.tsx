import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/Services/axios";
import { InitialStateReviewers, ReviewerData, ErrorType, CurationData, ReviewerForm} from "@/Types/Reviews";

const initialState : InitialStateReviewers = {
    token: '',
    data: [],
    dataForm: null,
    isValidating: false,
    status: 'idle',
    statusForm: 'idle',
    error: null,
    selectedSolution: null
}

export const fetchReviewer = createAsyncThunk<ReviewerData[], {token: string}, {rejectValue: ErrorType}>(
    "reviewer/fetchReviewer",
    async ({token}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/solutions/reviewer/${token}`);
            return response.data.data as ReviewerData[];
        } catch (error: any) {
            const errorMessage = error.response?.data?.error?.message || "Erreur lors de la récupération des revueurs";
            return rejectWithValue({
                message: errorMessage,
                error: "REVIEWER_FETCH_ERROR",
                statusCode: error.response?.data?.error?.statusCode || 500
            });
        }
    }
);

export const findReviewForm = createAsyncThunk<ReviewerForm, {token: string}, {rejectValue: ErrorType}>(
    "reviewer/fetchReviewForm",
    async({token}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.get(`${apiBaseUrl}/calls/find-review-form/${token}`);
            return response.data.data as ReviewerForm;
        }catch (error : any) {
            const errorMessage = error.response?.data?.error?.message || "Erreur lors de la récupération des forms";
            return rejectWithValue({
                message: errorMessage,
                error: "REVIEWER_FETCH_ERROR",
                statusCode: error.response?.data?.error?.statusCode || 500
            });
        }
    }
);


export const curateSolution = createAsyncThunk<CurationData, {token: string, data: CurationData["data"], solution: string}, {rejectValue: ErrorType}>(
    "reviewer/curation",
    async ({token, data, solution}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/reviews/${token}`, {data, solution});
            return response.data.data as CurationData;
        } catch (error: any) {
            const errorMessage = error.response?.data?.error?.message || "Erreur lors de la curatation de la solution";
            return rejectWithValue({
                message: errorMessage,
                error: "CURATION_ERROR",
                statusCode: error.response?.data?.error?.statusCode || 500
            });
        }
    }
);

const ReviewerSlice = createSlice ({
    name: "reviewer",
    initialState,
    reducers : {
        setToken: (state, action: PayloadAction<{token:string}>) => {
            state.token = action.payload.token
        },
        setSelectedSolution: (state, action: PayloadAction<ReviewerData>) => {
            state.selectedSolution = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReviewer.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchReviewer.fulfilled, (state, action : PayloadAction<ReviewerData[]>) => {
            state.status = 'succeeded';
            state.data = action.payload;
            if(action.payload.length > 0) {
                state.isValidating = true
            }
        })
        builder.addCase(fetchReviewer.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload?.error || 'An error occurred';
            state.isValidating = false;
        })
        builder.addCase(findReviewForm.fulfilled, (state, action: PayloadAction<ReviewerForm>) => {
            state.dataForm = action.payload;
            state.statusForm = 'succeeded';
        })
    }
})

export const { setToken, setSelectedSolution } = ReviewerSlice.actions

export default ReviewerSlice.reducer