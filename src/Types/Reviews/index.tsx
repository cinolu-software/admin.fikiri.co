import { CallType } from "../Call/CallType";
import {FormInputType} from "../Call/CallType";

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

export interface Reviewes {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    reviewer: string;
    data: {
        phase: string;
        responses: ResponsesData[];
    }
}

export interface ReviewerForm {
    phase: string;
    fields: FormInputType[];
}

export interface ReviewerData {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    responses: Object[];
    reviews: Reviewes[];
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
    dataForm: ReviewerForm | null;
    isValidating: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    statusForm: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    selectedSolution: ReviewerData | null;
}