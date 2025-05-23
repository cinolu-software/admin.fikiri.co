type GalleryCallType = {
    id: string;
}

export interface GalleryType{
    id: string;
    call: GalleryCallType;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    image: string;
}

export interface CallType {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    description: string;
    ended_at: string;
    started_at: string;
    published_at: string;
    awards: [];
    galery: GalleryType[];
    cover: string | null;
    document: string | null;
    form: FormField[];
    reviewers: Reviewer[];
    review_form: Object[];
    requirements: Requirement[];
    applications?: Application[];
    author?: Author;
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

export interface Applicant {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    email: string;
    name: string;
    password: string | null;
    phone_number: string | null;
    address: string | null;
    google_image: string | null;
    profile: string | null;
    verified_at: string;
}

export interface Application {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    responses: Record<string, string>;
    document: string | null;
    applicant: Applicant;
}

export interface Reviewer {
    phase: string;
    email: string;
    organization: string;
    solutions: number;
}

export interface UpdateReviewerSolution extends Reviewer {
    email: string;
    id: string;
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

export type ReviewPhase = 'cartographie' | 'exploration' | 'experimentation';

export interface ReviewFormSection {
    phase: ReviewPhase;
    fields: FormField[];
}

export interface FormValue{
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    form: DynamicFomType [] | null;
    requirements: RequirementType[] | null;
    review_form: ReviewFormSection[] | null;
}

export interface CreateCallType extends FormValue {}

export interface UpdateCallType extends CreateCallType {
    id: string;
}

export interface UpdateCoverCallType {
    id: string;
    imageFile: File;
}

export interface AddCallGalleryType {
    id: string;
    imageFiles: File[];
}

export interface DataGetCallErrorType{
    message: string;
    error: string;
    statusCode: number;
}

export interface InitialStateCallType {
    callData: CallInstance[];
    totalAllCall: number | null;
    totalPublishedCall: number | null;
    publishedCallData: CallType[];
    statusCall: "idle" | "loading" | "succeeded" | "failed";
    statusOneCall: "idle" | "loading" | "succeeded" | "failed";
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
    id: number | string;
    type: 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date';
    label: string;
    options: string[];
    required: boolean;
}

export interface ReviewForm {
    phase : string;
    fields: FormField[];
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

export interface CallSelected {
    selectedCall: CallType | CallInstance;
}