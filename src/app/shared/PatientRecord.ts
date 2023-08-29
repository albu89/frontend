export interface PatientRecord {

    requestId: string;
    requestTimeStamp: Date;
    timeStampString: string | null;
    score: number;
    risk?: string;
    riskClass: number;
    canEdit: boolean;
}