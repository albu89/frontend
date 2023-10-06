import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListFixedComponent } from './category-list-fixed.component';

describe('FixedBiomarkersComponent', () => {
  let component: CategoryListFixedComponent;
  let fixture: ComponentFixture<CategoryListFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryListFixedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryListFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
