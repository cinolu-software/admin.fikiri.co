export interface CallInstance {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    description: string;
    ended_at: string;
    started_at: string;
    published_at: string;
    cover: string | null;
    document: string | null;
    form: Object | null;
    reviewers: string | null;
    requirements: Object | null;
}

export interface Author {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    email: string;
    name: string;
    password: string;
    phone_number: string;
    address: string;
    google_image: string | null;
    profile: string | null;
    verified_at: string;
}

export interface CallType extends  CallInstance {
    authors: Author;
}

export interface InitialStateCallType {
    callData: CallInstance[];
    statusCall: "idle" | "loading" | "succeeded" | "failed";

}