import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomarkerComponent } from './biomarker.component';

describe('BiomarkerComponent', () => {
	let component: BiomarkerComponent;
	let fixture: ComponentFixture<BiomarkerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BiomarkerComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(BiomarkerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
