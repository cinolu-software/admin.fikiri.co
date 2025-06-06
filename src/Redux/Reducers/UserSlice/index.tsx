import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/Services/axios";
import {CreateUserType, DataGetUserType, DataUserErrorType, InitialStateUserType, UpdateUserType, UpdateManyUserType, CountByOutreachersType} from "@/Types/User/UserType";

const initialState: InitialStateUserType = {
    countByOutreachers: [],
    inscriptionsByOutreachers: [],
    outReachersStatus: 'idle',
    outReachersTotal: 0,
    outReachersData: [],


    usersData: [],
    totalUsers: null,
    statusUsers: 'idle',
    filterToggle: false,
    errorUsers: null,
    isOpenModalDeleteUser: false,
    isOpenModalUpdateUser: false,
    selectedUser: null,
    navId: 1,
    tabId: 1,
    formValue: {
        email: "",
        name: "",
        phone_number: "",
        address: "",
        roles: []
    }
}

export const fetchUsers = createAsyncThunk<DataGetUserType[], void, {rejectValue: DataUserErrorType}>(
    "user/fetchUser",
        async(_, {rejectWithValue}) => {
            try{
                const response = await axiosInstance.get(`${apiBaseUrl}/users`);
                return response.data.data as DataGetUserType[];
            }
            catch(e: any){
                const errorMessage = e.response?.data?.error?.message || "Erreur lors de la récupération des utilisateurs";
                return rejectWithValue({
                    message: errorMessage,
                    error: "USER_FETCH_ERROR",
                    statusCode: e.response?.status || 500,
                })
            }
    }
);

export const createUser = createAsyncThunk<DataGetUserType, CreateUserType, {rejectValue: DataUserErrorType}>(
    "user/createUser",
    async(userData, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.post(`${apiBaseUrl}/users`, userData);
            return response.data.data as DataGetUserType;
        } catch(e: any){
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la création du l'utilisateur";
            return rejectWithValue({
                message: errorMessage,
                error: "UTILISATEUR_CREATE_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

export const updateUser = createAsyncThunk<DataGetUserType, UpdateUserType, { rejectValue: DataUserErrorType }>(
    "user/updateUser",
    async ({ id, ...userData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${apiBaseUrl}/users/${id}`, userData);
            return response.data.data as DataGetUserType;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la mise à jour de l'utilisateur";
            return rejectWithValue({
                message: errorMessage,
                error: "USER_UPDATE_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

export const deleteUser = createAsyncThunk<string, string, { rejectValue: DataUserErrorType }>(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/users/${id}`);
            return id;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la suppression de l'utilisateur";
            return rejectWithValue({
                message: errorMessage,
                error: "USER_DELETE_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

export const updateMultipleUsers = createAsyncThunk<DataGetUserType[], UpdateManyUserType, { rejectValue: DataUserErrorType }>(
    "user/updateMultipleUsers",
    async (usersData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${apiBaseUrl}/users/update-many`, usersData);
            return response.data.data as DataGetUserType[];
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la mise à jour des utilisateurs";
            return rejectWithValue({
                message: errorMessage,
                error: "USER_UPDATE_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);





export const fetchCountByOutreachers = createAsyncThunk<CountByOutreachersType[], void, { rejectValue: DataUserErrorType }>(
    "user/fetchCountByOutreachers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/users/count-by-outreachers`);
            return response.data.data as CountByOutreachersType[];
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la récupération des utilisateurs par outreachers";
            return rejectWithValue({
                message: errorMessage,
                error: "USER_COUNT_BY_OUTREACHERS_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

export const fetchInscriptionsByOutreachers = createAsyncThunk<DataGetUserType[], {email: string}, { rejectValue: DataUserErrorType }>(
    'user/fetchInscriptionsByOutreachers',
    async ({email}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/users/find-by-outreacher/${email}`, {
                params: { email }
            });
            return response.data.data as DataGetUserType[];
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la récupération des inscriptions par outreachers";
            return rejectWithValue({
                message: errorMessage,
                error: "USER_INSCRIPTIONS_BY_OUTREACHERS_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
)


const filterOutreachers = (countByOutreachers: CountByOutreachersType[], usersData: DataGetUserType[]): DataGetUserType[] => {

    const validEmails = new Set(
        countByOutreachers
            .filter((item) => item.user_outreacher !== null)
            .map((item) => item.user_outreacher as string)
    );

    const safeUsersData = Array.isArray(usersData) ? usersData : [];

    return safeUsersData.filter((user) => user.email && validEmails.has(user.email));
};



const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setNavId: (state, action: PayloadAction<number>) => {
            state.navId = action.payload;
        },

        setTabId: (state, action: PayloadAction<number>) => {
            state.tabId = action.payload;
        },

        setFormValue: (state, action: { payload: { name: keyof any, value: any } }) => {
            state.formValue[action.payload.name] = action.payload.value;
        },
        setModalDeleteUser: (state, action: PayloadAction<{ isOpen: boolean; user: DataGetUserType | null }>) => {
            state.isOpenModalDeleteUser = action.payload.isOpen;
            if (action.payload.user) {
                state.selectedUser = action.payload.user;
            }
        },
        setModalUpdateUser: (state, action: PayloadAction<{isOpen: boolean; user: DataGetUserType | null}>) => {
            state.isOpenModalUpdateUser = action.payload.isOpen;
            if(action.payload.user) {
                state.selectedUser = action.payload.user;
            }
        },

        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        },
        setSelectedUser: (state, action: PayloadAction<{user: DataGetUserType | null}>) => {
            state.selectedUser = action.payload.user;
        },
        resetFormValue : (state) => {
            state.formValue = {
                email: "",
                name: "",
                phone_number: "",
                address: "",
                roles: [],
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.statusUsers = 'loading';
                state.errorUsers = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<DataGetUserType[]>) => {
                state.statusUsers = 'succeeded';
                state.usersData = action.payload;
                state.totalUsers = action.payload.length;

                if (state.countByOutreachers.length > 0) {
                    state.outReachersData = filterOutreachers(
                        state.countByOutreachers,
                        action.payload
                    );
                }
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.statusUsers = 'failed';
            })
            .addCase(createUser.pending, (state) => {
                state.statusUsers = 'loading';
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<DataGetUserType>) => {
                state.statusUsers = 'succeeded';
                state.usersData.push(action.payload);
            })
            .addCase(createUser.rejected, (state) => {
                state.statusUsers = 'failed';
            })
            .addCase(updateUser.pending, (state) => {
                state.statusUsers = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<DataGetUserType>) => {
                const index = state.usersData.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.usersData[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state) => {
                state.statusUsers = 'failed';
            })
            .addCase(deleteUser.pending, (state) => {
                state.statusUsers = 'loading';
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.statusUsers = 'succeeded';
                state.usersData = state.usersData.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state) => {
                state.statusUsers = 'failed';
            })
            .addCase(updateMultipleUsers.pending, (state) => {
                state.statusUsers = 'loading';
            })
            .addCase(updateMultipleUsers.fulfilled, (state, action: PayloadAction<DataGetUserType[]>) => {
                state.statusUsers = 'succeeded';
                state.usersData = action.payload;
            })
            .addCase(updateMultipleUsers.rejected, (state) => {
                state.statusUsers = 'failed';
            })

            .addCase(fetchCountByOutreachers.pending, (state) => {
                state.outReachersStatus = 'loading';
                state.countByOutreachers = [];
            })
            .addCase(fetchCountByOutreachers.fulfilled, (state, action: PayloadAction<CountByOutreachersType[]>) => {
                state.outReachersStatus = 'succeeded';
                state.countByOutreachers = action.payload;

                if (state.usersData.length > 0) {
                    state.outReachersData = filterOutreachers(
                        action.payload,
                        state.usersData
                    );
                }
            })
            .addCase(fetchCountByOutreachers.rejected, (state) => {
                state.outReachersStatus = 'failed';
            })

            .addCase(fetchInscriptionsByOutreachers.pending, (state) => {
                state.outReachersStatus = 'loading';
                state.inscriptionsByOutreachers = [];
            })
            .addCase(fetchInscriptionsByOutreachers.fulfilled, (state, action: PayloadAction<DataGetUserType[]>) => {
                state.outReachersStatus = 'succeeded';
                state.inscriptionsByOutreachers = action.payload;
            })
            .addCase(fetchInscriptionsByOutreachers.rejected, (state) => {
                state.outReachersStatus = 'failed';
                state.inscriptionsByOutreachers = [];
            });
    },
});

export const {
    setModalDeleteUser,
    setFilterToggle,
    setNavId,
    setTabId,
    setFormValue,
    resetFormValue,
    setModalUpdateUser,
    setSelectedUser,
} = UsersSlice.actions;


export default UsersSlice.reducer;