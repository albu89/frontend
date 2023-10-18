import { Warning } from '@models/scoring/scoring-warning.model';

export class WarningMock implements Warning {
  [key: string]: string;
  public message = 'Low glucose Level. 3.0 < 3.9';
}
