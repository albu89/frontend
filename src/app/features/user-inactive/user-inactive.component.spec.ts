import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInactiveComponent } from './user-inactive.component';

describe('UserInactiveComponent', () => {
  let component: UserInactiveComponent;
  let fixture: ComponentFixture<UserInactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserInactiveComponent],
    });
    fixture = TestBed.createComponent(UserInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
