import { TestBed } from '@angular/core/testing';

import { ScoringresponseService } from './scoringresponse.service';

describe('ScoringresponseService', () => {
	let service: ScoringresponseService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ScoringresponseService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
