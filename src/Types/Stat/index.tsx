
export interface StatType {
    calls: string;
    solutions: string;
    users: string;
    unpublishedCalls: string;
    publishedCalls: string;
}

export interface DataStatError {
    message: string;
    error: string;
    statusCode: string;
}

export interface initialData {
    statData: StatType;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: DataStatError | null;
}