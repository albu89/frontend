export interface MedicalHistoryOption {
  value: string | boolean | undefined;
  displayName: string;
  sideEffectId: string | null;
  sideEffectValue?: string | null;
}
