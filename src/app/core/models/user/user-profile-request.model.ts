import { Profile } from '@models/user/user-profile.model';

export interface ProfileRequest extends Profile {
  isSeparateBilling: boolean;
  billing: {
    billingName: string | null;
    billingAddress: string | null;
    billingZip: string | null;
    billingCity: string | null;
    billingCountry: string | null;
    billingCountryCode: string | null;
    billingPhone: string | null;
  };
}
