import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/Services/axios";
import {CreateRoleType, UpdateRoleType, InitialStateRoleType, DataGetRoleType, DataGetRoleErrorType} from "@/Types/Role/RoleType";


const initialState: InitialStateRoleType = {
    dataRoles: [],
    statusRole: 'idle',
    filterToggle: false,
    isOpenModalCreateRole: false,
    isOpenModalDeleteRole: false,
    isOpenModalEditRole: false,
    selectedRole: null,
};

export const fetchRole = createAsyncThunk<DataGetRoleType[], void, { rejectValue: DataGetRoleErrorType }>(
    "role/fetchRole",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/roles`);
            return response.data.data as DataGetRoleType[];
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la récupération des rôles";
            return rejectWithValue({
                message: errorMessage,
                error: "ROLE_FETCH_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

export const createRole = createAsyncThunk<DataGetRoleType, CreateRoleType, { rejectValue: DataGetRoleErrorType }>(
    "role/createRole",
    async (roleData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/roles`, roleData);
            return response.data.data as DataGetRoleType;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la création du rôle";
            return rejectWithValue({
                message: errorMessage,
                error: "ROLE_CREATE_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

export const updateRole = createAsyncThunk<DataGetRoleType, UpdateRoleType, { rejectValue: DataGetRoleErrorType }>(
    "role/updateRole",
    async ({ id, ...roleData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${apiBaseUrl}/roles/${id}`, roleData);
            return response.data.data as DataGetRoleType;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la mise à jour du rôle";
            return rejectWithValue({
                message: errorMessage,
                error: "ROLE_UPDATE_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

export const deleteRole = createAsyncThunk<string, string, { rejectValue: DataGetRoleErrorType }>(
    "role/deleteRole",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/roles/${id}`);
            return id;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la suppression du rôle";
            return rejectWithValue({
                message: errorMessage,
                error: "ROLE_DELETE_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        toggleFilter: (state) => {
            state.filterToggle = !state.filterToggle;
        },
        setModalCreateRole: (state, action: PayloadAction<{isOpen: boolean}>) => {
            state.isOpenModalCreateRole = action.payload.isOpen;
        },
        setModalEditRole: (state, action: PayloadAction<{isOpen: boolean, role: DataGetRoleType | null }>) => {
            state.isOpenModalEditRole = action.payload.isOpen;
            state.selectedRole = action.payload.role;
        },
        setModalDeleteRole: (state, action: PayloadAction<{isOpen: boolean, role: DataGetRoleType | null}>) => {
            state.isOpenModalDeleteRole = action.payload.isOpen;
            state.selectedRole = action.payload.role;
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchRole.pending, (state) => {
                state.statusRole = 'loading';
            })
            .addCase(fetchRole.fulfilled, (state, action: PayloadAction<DataGetRoleType[]>) => {
                state.statusRole = 'succeeded';
                state.dataRoles = action.payload;
            })
            .addCase(fetchRole.rejected, (state) => {
                state.statusRole = 'failed';
            })
            .addCase(createRole.fulfilled, (state, action: PayloadAction<DataGetRoleType>) => {
                state.statusRole = 'succeeded';
                state.dataRoles.push(action.payload);
            })
            .addCase(updateRole.fulfilled, (state, action: PayloadAction<DataGetRoleType>) => {
                const index = state.dataRoles.findIndex(role => role.id === action.payload.id);
                if (index !== -1) {
                    state.dataRoles[index] = action.payload;
                }
            })
            .addCase(deleteRole.fulfilled, (state, action: PayloadAction<string>) => {
                state.dataRoles = state.dataRoles.filter(role => role.id !== action.payload);
            });
    },
});

export const {toggleFilter, setModalEditRole, setModalDeleteRole, setModalCreateRole} = roleSlice.actions;

export default roleSlice.reducer;



