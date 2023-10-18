import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListFlexibleComponent } from './list-flexible.component';

describe('CategoryListComponent', () => {
  let component: CategoryListFlexibleComponent;
  let fixture: ComponentFixture<CategoryListFlexibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryListFlexibleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListFlexibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
