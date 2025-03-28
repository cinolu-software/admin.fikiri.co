import { CallType } from "../Call/CallType";

export interface User{
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    phone_number: string;
    address: string;
    google_image: string;
}

export interface ReviewerData {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    response: Object[];
    reviewer: string;
    user: User;
    call: CallType;
}

export interface ErrorType{
    message: string;
    error: string;
    statusCode: number;
}

export interface ResponsesData {
    answer : string;
    question: string;
}

export interface CurationData {
    token : string;
    note: number;
    data: ResponsesData[];
    solution: string;
}

export interface InitialStateReviewers {
    token: string;
    data: ReviewerData[];
    isValidating: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    selectedSolution: ReviewerData | null;
}

export interface SelectedSolution {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    response: Object[];
    reviewer: string;
    user: User;
}