import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/Services/axios";
import {CreateOrganizationType, UpdateOrganizationType, InitialStateOrganizationType, DataGetOrganizationType, DataGetOrganizationErrorType} from "@/Types/Organization/OrganizationType";

const initialState: InitialStateOrganizationType = {
    dataOrganization: [],
    statusOrganization: 'idle',
    filterToggle: false,
    isOpenModalCreateOrganization: false,
    isOpenModalDeleteOrganization: false,
    isOpenModalEditOrganization: false,
    selectedOrganization: null,
};

export const fetchOrganization = createAsyncThunk<DataGetOrganizationType[], void, { rejectValue: DataGetOrganizationErrorType }>(
    "organization/fetchOrganization",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${apiBaseUrl}/organizations`);
            return response.data.data as DataGetOrganizationType[];
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la récupération des organisations";
            return rejectWithValue({
                message: errorMessage,
                error: "ORGANIZATION_FETCH_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

export const createOrganization = createAsyncThunk<DataGetOrganizationType, CreateOrganizationType, { rejectValue: DataGetOrganizationErrorType }>(
    "organization/createOrganization",
    async (organizationData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/organizations`, organizationData);
            return response.data.data as DataGetOrganizationType;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la création de l'organisation";
            return rejectWithValue({
                message: errorMessage,
                error: "ORGANIZATION_CREATE_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

export const updateOrganization = createAsyncThunk<DataGetOrganizationType, UpdateOrganizationType, { rejectValue: DataGetOrganizationErrorType }>(
    "organization/updateOrganization",
    async ({ id, ...organizationData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${apiBaseUrl}/organizations/${id}`, organizationData);
            return response.data.data as DataGetOrganizationType;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la mise à jour de l'organisation";
            return rejectWithValue({
                message: errorMessage,
                error: "ORGANIZATION_UPDATE_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

export const deleteOrganization = createAsyncThunk<string, string, { rejectValue: DataGetOrganizationErrorType }>(
    "organization/deleteOrganization",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/organizations/${id}`);
            return id;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la suppression de l'organisation";
            return rejectWithValue({
                message: errorMessage,
                error: "ORGANIZATION_DELETE_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
);

const organizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {
        toggleFilter: (state) => {
            state.filterToggle = !state.filterToggle;
        },
        setModalCreateOrganization: (state, action: PayloadAction<{isOpen: boolean}>) => {
            state.isOpenModalCreateOrganization = action.payload.isOpen;
        },
        setModalEditOrganization: (state, action: PayloadAction<{isOpen: boolean, organization: DataGetOrganizationType | null }>) => {
            state.isOpenModalEditOrganization = action.payload.isOpen;
            state.selectedOrganization = action.payload.organization;
        },
        setModalDeleteOrganization: (state, action: PayloadAction<{isOpen: boolean, organization: DataGetOrganizationType | null}>) => {
            state.isOpenModalDeleteOrganization = action.payload.isOpen;
            state.selectedOrganization = action.payload.organization;
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchOrganization.pending, (state) => {
                state.statusOrganization = "loading";
            })
            .addCase(fetchOrganization.fulfilled, (state, action: PayloadAction<DataGetOrganizationType[]>) => {
                state.statusOrganization = "succeeded";
                state.dataOrganization = action.payload;
            })
            .addCase(fetchOrganization.rejected, (state) => {
                state.statusOrganization = "failed";
            })
            .addCase(createOrganization.fulfilled, (state, action: PayloadAction<DataGetOrganizationType>) => {
                state.statusOrganization = "succeeded";
                state.dataOrganization.push(action.payload);
            })
            .addCase(updateOrganization.fulfilled, (state, action: PayloadAction<DataGetOrganizationType>) => {
                const index = state.dataOrganization.findIndex(organization => organization.id === action.payload.id);
                if (index !== -1) {
                    state.dataOrganization[index] = action.payload;
                }
            })
            .addCase(deleteOrganization.fulfilled, (state, action: PayloadAction<string>) => {
                state.dataOrganization = state.dataOrganization.filter(organization => organization.id !== action.payload);
            });
    },
});


export const {toggleFilter, setModalEditOrganization, setModalDeleteOrganization, setModalCreateOrganization} = organizationSlice.actions;
export default organizationSlice.reducer;



