export interface CreateOrganizationType {
    name: string;
}

export interface UpdateOrganizationType  extends CreateOrganizationType {
    id: string;
}

export interface DataGetOrganizationType {
    name: string;
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string|null;
}

export interface DataGetOrganizationErrorType {
    message: string;
    error: string;
    statusCode: number;
}

export interface InitialStateOrganizationType {
    dataOrganization : DataGetOrganizationType[];
    statusOrganization : 'idle' | 'loading' | 'succeeded' | 'failed';
    filterToggle: boolean;
    isOpenModalCreateOrganization: boolean;
    isOpenModalEditOrganization: boolean;
    isOpenModalDeleteOrganization: boolean;
    selectedOrganization: DataGetOrganizationType | null;
}

export interface OrganizationListTableColumnType {
    name : string;
    created_at : string;
    updated_at: string;
    deleted_at: string;
}