import { ScoringRequest } from './scoring-request.model';

export interface ScoringRequestWithPatientData extends ScoringRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  id: string;
}
