import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskLabelComponent } from './risk-label.component';

describe('RiskLabelComponent', () => {
  let component: RiskLabelComponent;
  let fixture: ComponentFixture<RiskLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiskLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RiskLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
