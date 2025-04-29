import { Author } from "../CallType";
import {CallType, CallInstance} from "../CallType";

export interface ApplicationInstance {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    responses: Record<string, any>;
    status: "pending" | "mapped" | "explored" | "experimented";
    document: string | null;
    applicant: Author;
    image: string;
    user: Author;
    call: CallType;
    reviewers: Object | null;
}

export interface UpdateApplicationStatus {
    applicationId: string,
    call: string,
    responses: Record<string, any>,
    status : "pending" | "mapped" | "explored" | "experimented"
}

export interface ApplicationData {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    responses: Object ;
    reviewers: Object | null;
    status: "PENDING" | "MAPPED" | "EXPLORED" | "EXPERIMENTED";
    document: string | null;
    applicant: Author;
    user: Author;
    call: CallInstance;
}
export interface ErrorType{
    message: string;
    error: string;
    statusCode: number;
}
export interface ApplicationsByUser {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    responses: Object;
    reviewer : Object | null;
    user: Author;
    call: CallType | CallInstance;
}
export interface InitialStateType {
    applicationData: ApplicationInstance[];
    applicationDataByUser: ApplicationsByUser[];
    selectedApplication:  ApplicationInstance | null;
    applicationStatus: "idle" | "loading" | "succeeded" | "failed";
    applicationByUserStatus: "idle" | "loading" | "succeeded" | "failed";
    error : ErrorType | null;
    totalApplication: number;
}
export type SubmitSolutionPayload = {
    call: string;
    responses: Record<string, any>;
};