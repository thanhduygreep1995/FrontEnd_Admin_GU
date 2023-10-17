import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.servic';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent{
  // product: Product = new Product();

  ButtonSave: boolean = true;
  ButtonDelete: boolean = true;
  ProductForm: any;
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private pS: ProductService) {
      this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      description: ['', Validators.required],
      discount: ['', Validators.required],
      discountPrice: ['', Validators.required],
      status: ['', Validators.required],
      product: this.formBuilder.group({
        id: [''],
        name: [''],
        description: [''],
        status: ['']
      })
    });

  }

  onSubmit() {
    if (this.productForm.valid) {
      this.pS.saveProduct(this.productForm.value).subscribe(response => {
        console.log('Product saved successfully:', response);
        // Xử lý response hoặc điều hướng người dùng sau khi lưu thành công.
      });

}}}
