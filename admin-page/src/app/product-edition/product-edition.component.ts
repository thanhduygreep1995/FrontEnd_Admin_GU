import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent {
  infoProduct: FormGroup;
  ButtonSave: boolean = true;
  ButtonDelete: boolean = true;

  constructor(private formBuilder: FormBuilder) {
    this.infoProduct = this.formBuilder.group({
      productName: ['', Validators.required], 
      modelPrice: ['', Validators.required],
      description: ['', Validators.required],
      discount: ['', Validators.required],
      discountPrice: ['', Validators.required],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
      originId: ['', Validators.required]
    });
    this.infoProduct.valueChanges.subscribe(() => {
      this.ButtonSave = this.infoProduct.invalid;
    });

    this.infoProduct.valueChanges.subscribe(() => {
      this.ButtonDelete = this.infoProduct.controls['id'].invalid;
    });

  }
  

  onSubmit() {
    // Handle form submission
  }

}
