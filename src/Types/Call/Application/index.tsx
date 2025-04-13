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
    response: Object;
    reviewer : Object | null;
    user: Author;
    call: CallType | CallInstance;
}

export interface InitialStateType {
    applicationData: ApplicationInstance[];
    applicationDataByUser: ApplicationsByUser[];
    selectedApplication: ApplicationInstance | null;
    applicationStatus: "idle" | "loading" | "succeeded" | "failed";
    applicationByUserStatus: "idle" | "loading" | "succeeded" | "failed";
    error : ErrorType | null;
    totalApplication: number;
}

export type SubmitSolutionPayload = {
    call: string;
    responses: Record<string, any>;
};
  

