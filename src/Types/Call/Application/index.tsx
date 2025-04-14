import { Author } from "../CallType";
import {CallType, CallInstance} from "../CallType";

export interface ApplicationInstance {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    response : Object;
    document: string | null;
    applicant: Author
}

export interface ApplicationData {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    responses: Object ;
    reviewers: Object | null;
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
    selectedApplication:  ApplicationData | null;
    applicationStatus: "idle" | "loading" | "succeeded" | "failed";
    applicationByUserStatus: "idle" | "loading" | "succeeded" | "failed";
    error : ErrorType | null;
    totalApplication: number;

}

export type SubmitSolutionPayload = {
    call: string;
    responses: Record<string, any>;
};
  

