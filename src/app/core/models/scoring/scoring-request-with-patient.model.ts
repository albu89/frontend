import { ScoringRequest } from './scoring-request.model';

export interface ScoringRequestWithPatientData extends ScoringRequest {
  Firstname: string;
  Lastname: string;
  DateOfBirth: Date;
}
