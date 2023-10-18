import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomarkerInfoComponent } from './biomarker-info.component';

describe('BiomarkerInfoComponent', () => {
  let component: BiomarkerInfoComponent;
  let fixture: ComponentFixture<BiomarkerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiomarkerInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BiomarkerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
