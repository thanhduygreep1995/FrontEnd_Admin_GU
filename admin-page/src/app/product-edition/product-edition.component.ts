import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent implements OnInit {
  // product: Product = new Product();

  infoProduct: FormGroup; 
  ButtonSave: boolean = true;
  ButtonDelete: boolean = true;
  ProductForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.infoProduct = this.formBuilder.group({
      id:['', Validators.required],
      name: ['', Validators.required], 
      price: ['', Validators.required],
      stock_quantity: ['',Validators.required],
      create_date: ['',Validators.required],
      update_date: ['',Validators.required],
      Model: ['', Validators.required], 
      Description: ['', Validators.required],
      Discount: ['', Validators.required],
      discount_price: ['', Validators.required],
      status: ['', Validators.required]
      // categoryId: ['', Validators.required],
      // brandId: ['', Validators.required],
      // originId: ['', Validators.required]
    });
    this.infoProduct.valueChanges.subscribe(() => {
      this.ButtonSave = this.infoProduct.invalid;
    });

    this.infoProduct.valueChanges.subscribe(() => {
      this.ButtonDelete = this.infoProduct.controls['id'].invalid;
    });

  }

  ngOnInit(): void {
      
  }
  
  // fnAddProduct(){
  //  console.log(this.ProductForm);
  // }
  onSubmit() {
    // console.log(this.product);
  }

}
