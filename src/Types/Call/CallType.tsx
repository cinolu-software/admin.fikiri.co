export interface CallType {
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
    form: [] | null;
    reviewers: [] | null;
    requirements: [] | null;
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



export interface CallInstance extends  CallType {
    authors: Author;
}

export interface ReceiveDataReviewer {
    opportunity:  CallInstance;
    token: string;
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
    reviewerData: ReceiveDataReviewer | null
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

export interface FormField {
    id: string | number;
    label: string;
    required: boolean;
}

export interface Requirement {
    name: string;
    description: string;
}

export interface Call {
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    requirements: Requirement[];
    form: FormField[];
    author?: {
        name: string;
        email: string;
        phone_number: string;
        address: string;
    };
}