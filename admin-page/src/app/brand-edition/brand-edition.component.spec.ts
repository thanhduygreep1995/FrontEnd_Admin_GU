import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandEditionComponent } from './brand-edition.component';

describe('BrandEditionComponent', () => {
  let component: BrandEditionComponent;
  let fixture: ComponentFixture<BrandEditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandEditionComponent]
    });
    fixture = TestBed.createComponent(BrandEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
