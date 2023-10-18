import { CountryNationality } from './country-nationality.model';
import { CountryName } from './country-name.model';

export interface Country {
  name: string;
  alpha2: string;
  alpha3: string;
  names: CountryName[];
  EU: boolean;
  nationalities: CountryNationality[];
}
