
export interface UserProfileType {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    name: string;
    password: string;
    phone_number: string;
    address: string;
    google_image: string;
    profile: string;
    verified_at: string;
    roles: string[];
    detail: string;
    popularization_link: string;
    popularizer: string;
    chat_token: string;
}

export interface UserGetProfileErrorType {
    message: string;
    error: string;
    statusCode: number;
}

export interface InitialState {
    userData: UserProfileType | null;
    statusAuthentication: 'idle' | 'loading' | 'succeeded' | 'failed';
    UserGetProfileError: UserGetProfileErrorType | null;
    isAuthenticated: boolean;
}

export interface UpdateProfilePayload {
    name: string;
    email: string;
    phone_number: string;
    address: string
}

export interface UpdateProfilePassword {
    old_password: string;
    password: string;
    password_confirm: string;
}