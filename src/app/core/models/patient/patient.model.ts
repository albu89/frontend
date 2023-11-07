export interface Patient {
  firstname: string;
  lastname: string;
  dateOfBirth: Date | null;
  requestId: string | undefined;
}
