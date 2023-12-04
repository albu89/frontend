import { Billing } from '@models/user/billing.model';

export interface BillingSchema extends Billing {
  billingNameHeader: string;
  billingAddressHeader: string;
  billingZipHeader: string;
  billingCityHeader: string;
  billingCountryHeader: string;
  billingCountryCodeHeader: string;
  billingPhoneHeader: string;
}
