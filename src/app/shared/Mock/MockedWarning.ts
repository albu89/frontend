import { Warning } from "../ScoringResponseSchema";

export class MockedWarning implements Warning {
    [key: string]: string;
    message = 'Low glucose Level. 3.0 < 3.9'
}