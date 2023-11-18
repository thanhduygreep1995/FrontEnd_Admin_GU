import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageProductComponent } from './image-product.component';

describe('ImageProductComponent', () => {
  let component: ImageProductComponent;
  let fixture: ComponentFixture<ImageProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageProductComponent]
    });
    fixture = TestBed.createComponent(ImageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
