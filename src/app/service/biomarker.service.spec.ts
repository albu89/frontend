import { TestBed } from '@angular/core/testing';

import { BiomarkerService } from './biomarker.service';

describe('BiomarkerService', () => {
	let service: BiomarkerService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BiomarkerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
