import { createSlice,  createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/Services/axios";
import { initialData, DataStatError, StatType } from "@/Types/Stat";

const InitialState : initialData = {
    statData: {
        calls: '',
        solutions: '',
        users: '',
        unpublishedCalls: '',
        publishedCalls: ''
    },
    status: 'idle',
    error: null
};

export const fetchStat = createAsyncThunk<StatType, void, {rejectValue: DataStatError}>(
    'stat/fetchStat',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/stats/admin-stats`);
            return response.data.data as StatType;
        } catch (error) {
            const errorMessage = error.response?.data?.error?.message || "Erreur lors de la récupération des utilisateurs";
                return rejectWithValue({
                    message: errorMessage,
                    error: "USER_FETCH_ERROR",
                    statusCode: error.response?.status || 500,
                })
        }
    }
);

export const statSlice = createSlice({
    name: 'stat',
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStat.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchStat.fulfilled, (state, action: PayloadAction<StatType>) => {
            state.status = 'succeeded';
            state.statData = action.payload;
        });
        builder.addCase(fetchStat.rejected, (state, action: PayloadAction<DataStatError | undefined>) => {
            state.status = 'failed';
        });
    }
});

export default statSlice.reducer;