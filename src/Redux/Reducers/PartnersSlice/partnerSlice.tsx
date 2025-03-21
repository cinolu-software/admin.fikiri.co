import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/Services/axios";
import { PartnerType, InitialStatePatnerType, FormValuePartnerType, DataGetPartnerErrorType, CreatePartner, UpdatePartner } from "@/Types/Partners/PartnerType";
import {ShowError} from "@/utils";
import {isRejectedWithValue} from "@reduxjs/toolkit/src";


const initialState: InitialStatePatnerType = {
    partnerData: [],
    status: "idle",
    error: null,
    filterToggle: false,
    isOpenModalDeletePartner: false,
    isOpenModalEditPartner: false,
    isOpenModalCreatePartner: false,
    selectedPartner: null,
    navId: 0,
    tabId: 0,
    formValue: {
        name: '',
        link: '',
        type: ''
    },
    EditFormValue: {
        name: '',
        link: '',
        type: ''
    },
    numberLevel: 1,
    showFinish: false
};

export const fetchPartner = createAsyncThunk<PartnerType[], void, { rejectValue: DataGetPartnerErrorType }>(
    "partners/fetchPartner",
    async(_, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.get(`${apiBaseUrl}/partners`);
            return response.data.data as PartnerType[];
        }catch( e: any){
            const errorMessage = e.response.data.error.message || 'Erreur lors de la récupération des partenaires';
            return rejectWithValue ({
                message: errorMessage,
                error: "PARTENAIRE_FETCH_ERROR",
                statusCode: e.response.data.error.statusCode || 500
            })
        }
    }
)

export const createPartner = createAsyncThunk<PartnerType, CreatePartner, { rejectValue: DataGetPartnerErrorType}>(
    "partners/createPartner",
    async(partnerData, {rejectWithValue}) =>{
        try{
            const response = await axiosInstance.post(`${apiBaseUrl}/partners`, partnerData);
            return response.data.data as PartnerType;
        } catch (e : any){
            const errorMessage = e.response.data.error.message || 'Erreur lors de la création du partenaire';
            return rejectWithValue ({
                message: errorMessage,
                error: "PARTENAIRE_FETCH_ERROR",
                statusCode: e.response.data.error.statusCode || 500
            })
        }
    }
);

export const deletePartner = createAsyncThunk<string, string, { rejectValue: DataGetPartnerErrorType }>(
    "partner/delePartner",
    async(id: string, { rejectWithValue }) => {
        try{
            await axiosInstance.delete(`${apiBaseUrl}/partners/${id}`);
            return id;
        }catch( e: any){
            const errorMessage = e.response?.data?.error?.message || "Erreur lors de la suppression de l'organisation";
            return rejectWithValue({
                message: errorMessage,
                error: "ORGANIZATION_DELETE_ERROR",
                statusCode: e.response?.status || 500,
            });
        }
    }
)

export const updatePartner = createAsyncThunk<PartnerType, UpdatePartner, { rejectValue: DataGetPartnerErrorType } >(
    "partner/updatePartner",
    async ({id, ...partnerData}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${apiBaseUrl}/partners/${id}`, partnerData);
            return response.data.data as PartnerType;
        } catch (error: any) {
            const errorMessage = error.response?.data?.error?.message || "Erreur lors de la mise à jour du partenaire";
            return rejectWithValue({
                message: errorMessage,
                error: "PARTENAIRE_UPDATE_ERROR",
                statusCode: error.response?.status || 500,
            });
        }
    }
);

export const addProfileImage = createAsyncThunk<{ data: PartnerType }, { id: string; formData: any }, { rejectValue: string }>(
    "partner/addProfileImage",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<{ data: PartnerType }>(
                `${apiBaseUrl}/partners/${id}/logo`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            return { data: response.data.data };
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Une erreur est survenue lors de l'ajout du logo du partenaire."
            );
        }
    }
);


// const validateStep = (state: InitialStatePatnerType) => {
//     const {name, link, type} = state.formValue;
//     switch(state.numberLevel){
//         case 1:
//             if(!name || !description){
//                 ShowError();
//                 return false;
//             }
//             break;
//         case 2:
//             if(!name || !description || !website_link){
//                 ShowError();
//                 return false
//             }
//             break
//         case 3:
//             if(!name || !description || !website_link || partnerships.length === 0 ){
//                 ShowError();
//                 return false
//             }
//             break
//     }
//     return true;
// };

const PartnerSlice = createSlice({
    name: "partner",
    initialState,
    reducers: {
        setSelectedPartner: (state, action: PayloadAction<{ partner: PartnerType | null}>) => {
            state.selectedPartner = action.payload.partner;
            if(action.payload.partner){
                state.EditFormValue = {
                    name: action.payload.partner.name,
                    link: action.payload.partner.link,
                    type: action.payload.partner.type,
                };
            }
        },
        setModalCreatePartner: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreatePartner = action.payload.isOpen;
        },
        setModalEditPartner: (state, action: PayloadAction<{ isOpen: boolean; partner?: PartnerType | null }>) => {
            state.isOpenModalEditPartner = action.payload.isOpen;
            if (action.payload.partner) {
                state.selectedPartner = action.payload.partner;
            }
        },
        setModalDeletePartner: (state, action: PayloadAction<{ isOpen: boolean; partner?: PartnerType | null }>) => {
            state.isOpenModalDeletePartner = action.payload.isOpen;
            if (action.payload.partner) {
                state.selectedPartner = action.payload.partner;
            }
        },
        setNavId: (state, action: PayloadAction<number>) => {
            state.navId = action.payload;
        },
        setTabId: (state, action: PayloadAction<number>) => {
            state.tabId = action.payload;
        },
        setFormValue: (state, action: PayloadAction<{field: keyof CreatePartner, value: any}>) => {
            const {field, value} = action.payload;
            state.formValue[field] = value
        },
        setShowFinish: (state, action) => {
          state.showFinish = action.payload
        },
        handleBackButton: (state)=> {
            // if(state.numberLevel > 1) state.numberLevel--;
        },
        handleNextButton: (state)=>{
            // const isValid = validateStep(state);
            // if (isValid) {
            //     if (state.numberLevel < 7) {
            //         state.numberLevel++;
            //     } else if( state.numberLevel === 7) {
            //         state.showFinish = true;
            //     }
            // }
        },
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchPartner.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPartner.fulfilled, (state, action: PayloadAction<PartnerType[]>) => {
                state.status = "succeeded";
                state.partnerData = action.payload;
            })
            .addCase(fetchPartner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Erreur lors de la récupération des partenaires.";
            });


        builder
            .addCase(createPartner.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createPartner.fulfilled, (state, action: PayloadAction<PartnerType>) => {
                state.status = "succeeded";
                state.partnerData.push(action.payload);
            })
            .addCase(createPartner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Erreur lors de la création du partenaire.";
            });


        builder
            .addCase(deletePartner.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deletePartner.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "succeeded";
                state.partnerData = state.partnerData.filter((partner) => partner.id !== action.payload);
            })
            .addCase(deletePartner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Erreur lors de la suppression du partenaire.";
            });

        builder
            .addCase(updatePartner.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updatePartner.fulfilled, (state, action: PayloadAction<PartnerType>) => {
                state.status = "succeeded";
                const updatedPartnerIndex = state.partnerData.findIndex((partner) => partner.id === action.payload.id);
                if (updatedPartnerIndex >= 0) {
                    state.partnerData[updatedPartnerIndex] = action.payload;
                }
            })
            .addCase(updatePartner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Erreur lors de la mise à jour du partenaire.";
            })
            .addCase(addProfileImage.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })

            .addCase(addProfileImage.fulfilled, (state, action: PayloadAction<{ data: PartnerType }>) => {
                state.status = "succeeded";
                const updatedPartnerIndex = state.partnerData.findIndex(
                    (partner) => partner.id === action.payload.data.id
                );
                if (updatedPartnerIndex >= 0) {
                    state.partnerData[updatedPartnerIndex] = action.payload.data;
                }
            })
            .addCase(addProfileImage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Erreur lors de l'ajout de l'image de profil.";
            });
    }
});

export const {
    setModalCreatePartner,
    setModalEditPartner,
    setModalDeletePartner,
    setNavId,
    setTabId,
    setFormValue,
    setFilterToggle,
    setShowFinish,
    handleBackButton,
    handleNextButton,
    setSelectedPartner
} = PartnerSlice.actions;

export default PartnerSlice.reducer;