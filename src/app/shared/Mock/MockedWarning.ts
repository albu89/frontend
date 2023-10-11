import { Warning } from '../ScoringResponseSchema';

export class MockedWarning implements Warning {
  [key: string]: string;
  public message = 'Low glucose Level. 3.0 < 3.9';
}
