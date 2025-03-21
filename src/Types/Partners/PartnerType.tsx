import {ChangeEvent} from "react";

export interface PartnerType {
    id: string;
    name: string;
    logo: string;
    link: string;
    type: 'standard' | 'program_specific' | ''
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface CreatePartner {
    name: string;
    link: string;
    type: PartnerType['type'];
}

export interface UpdatePartner  extends CreatePartner {
    id: string;
}

export interface DataGetPartnerErrorType {
    message: string;
    error: string;
    statusCode: number;
}

export interface FormValuePartnerType extends CreatePartner{}

export interface InitialStatePatnerType {

    partnerData: PartnerType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    filterToggle: boolean;
    error: string | null;
    isOpenModalCreatePartner: boolean;
    isOpenModalEditPartner: boolean;
    isOpenModalDeletePartner: boolean;
    selectedPartner: PartnerType | null;
    navId: number;
    tabId: number;
    formValue: CreatePartner;
    EditFormValue: CreatePartner;
    numberLevel: number;
    showFinish: boolean;
}

export interface StepProps {
    formValue: FormValuePartnerType;
    getPartnerData: (event: { field: string; value: any }) => void;
}

export interface StaticModalToggleProp {
    staticModalToggle: () => boolean;
}

export interface PartnerListTableColumnType extends PartnerType {}