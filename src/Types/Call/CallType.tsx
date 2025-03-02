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

export interface FormInputType {
    name: string;
    type: string;
    label: string;
    required: boolean;
    options?: string[];
}

export interface DynamicFomType {
    inputs: FormInputType[];
}

export interface RequirementType {
    name: string;
    description: string;
}

export interface FormValue{
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    form: DynamicFomType [] | null;
    requirements: RequirementType[] | null;
}

export interface CreateCallType extends FormValue {}

export interface UpdateCallType extends CreateCallType {
    id: string;
}

export interface UpdateCoverCallType {
    id: string;
    imageFile: File;
}

export interface DataGetCallErrorType{
    message: string;
    error: string;
    statusCode: number;
}

export interface InitialStateCallType {
    callData: CallInstance[];
    publishedCallData: CallType[];
    statusCall: "idle" | "loading" | "succeeded" | "failed";
    publishedStatus: "idle" | "loading" | "succeeded" | "failed";
    error: DataGetCallErrorType | null;
    isOpenModalCreateCall: boolean;
    isOpenModalEditCall: boolean;
    isOpenModalDeleteCall: boolean;
    filterToggle: boolean;
    selectedCall: CallInstance | CallType |null;
    navId: number;
    tabId: number;
    AddFormValue: FormValue ;
    EditFormValue: FormValue ;
    numberLevel: number;
    showFinish: boolean;
}

export interface StepPropsType{
    data : FormValue
}

export type StepperHorizontalPropsType = {
    level: number;
};