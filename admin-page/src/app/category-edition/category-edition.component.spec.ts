import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditionComponent } from './category-edition.component';

describe('CategoryEditionComponent', () => {
  let component: CategoryEditionComponent;
  let fixture: ComponentFixture<CategoryEditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryEditionComponent]
    });
    fixture = TestBed.createComponent(CategoryEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
