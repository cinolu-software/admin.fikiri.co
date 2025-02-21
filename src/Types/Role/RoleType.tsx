export interface CreateRoleType {
    name: string;
}

export interface UpdateRoleType  extends CreateRoleType {
    id: string;
}

export interface DataGetRoleType {
    name: string;
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string|null;
}

export interface DataGetRoleErrorType {
    message: string;
    error: string;
    statusCode: number;
}

export interface InitialStateRoleType {
    dataRoles : DataGetRoleType[];
    statusRole : 'idle' | 'loading' | 'succeeded' | 'failed';
    filterToggle: boolean;
    isOpenModalCreateRole: boolean;
    isOpenModalEditRole: boolean;
    isOpenModalDeleteRole: boolean;
    selectedRole: DataGetRoleType | null;
}

export interface RoleListTableColumnType {
    name : string;
    created_at : string;
    updated_at: string;
    deleted_at: string;
}
