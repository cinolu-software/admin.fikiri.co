import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/Services/axios";
import { InitialStateReviewers } from "@/Types/Reviews";


const initialState : InitialStateReviewers = {
    token: ''
}

const ReviewerSlice = createSlice ({
    name: "reviewer",
    initialState,
    reducers : {
        setToken: (state, action: PayloadAction<{token:string}>) => {
            state.token = action.payload.token
        }
    }
})

export const { setToken } = ReviewerSlice.actions

export default ReviewerSlice.reducer