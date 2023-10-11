export interface UserPreferences {
  [key: string]: UserPreference;
}
export interface UserPreference {
  orderNumber: number;
  preferredUnit: string;
}
