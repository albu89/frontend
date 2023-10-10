import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScoringResponse } from '../shared/ScoringResponse';

@Injectable({
	providedIn: 'root',
})
export class ScoringresponseService {
	private ScoringResponse: BehaviorSubject<ScoringResponse> = new BehaviorSubject({} as ScoringResponse);

	onScoringRequestChange(): Observable<ScoringResponse> {
		return this.ScoringResponse.asObservable();
	}

	setScoringResponse(nextResponse: ScoringResponse) {
		this.ScoringResponse.next(nextResponse);
	}

	resetResponse(): void {
		this.ScoringResponse.next({} as ScoringResponse);
	}
}
