import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListFlexibleEditComponent } from './category-list-flexible-edit.component';

describe('CategoryListEditComponent', () => {
  let component: CategoryListFlexibleEditComponent;
  let fixture: ComponentFixture<CategoryListFlexibleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryListFlexibleEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListFlexibleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
