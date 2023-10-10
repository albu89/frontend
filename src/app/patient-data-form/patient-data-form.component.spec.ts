import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDataFormComponent } from './patient-data-form.component';

describe('PatientDataFormComponent', () => {
	let component: PatientDataFormComponent;
	let fixture: ComponentFixture<PatientDataFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PatientDataFormComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PatientDataFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
