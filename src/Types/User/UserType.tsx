import {DataGetRoleType} from "@/Types/Role/RoleType";

export interface DataGetUserType {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    email: string;
    password: string;
    phone_number: string | null;
    address: string | null;
    google_image: string | null;
    profile: string | null;
    verified_at: string | null;
    roles: DataGetRoleType[];
    detail: string | null;
}

export interface CreateUserType {
    email: string;
    name: string;
    phone_number: string | null;
    address: string | null;
    organisation: string;
    roles : string[];
}

export interface UpdateUserType  extends CreateUserType {
    id: string;
}

export interface UpdateManyUserType {
    ids: string[];
    data: CreateUserType[];
}


export interface DataUserErrorType {
    message: string;
    error: string;
    statusCode: number;
}


export interface CountByOutreachersType {
    user_outreacher: string;
    count: string;
}



export interface InitialStateUserType {
    countByOutreachers: CountByOutreachersType[];
    inscriptionsByOutreachers: DataGetUserType[];
    outReachersTotal: number;
    outReachersStatus: 'idle' | 'loading' | 'succeeded' | 'failed';

    usersData: DataGetUserType[];
    totalUsers: number | null;
    statusUsers: 'idle' | 'loading' | 'succeeded' | 'failed';
    filterToggle: boolean;
    errorUsers: DataGetUserType | null;
    isOpenModalDeleteUser: boolean;
    isOpenModalUpdateUser: boolean;
    selectedUser: DataGetUserType | null;
    navId: number;
    tabId: number;
    formValue: any;
}

export interface UsersListTableColumnType extends DataGetUserType {}