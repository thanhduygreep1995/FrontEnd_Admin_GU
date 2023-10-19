import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../service/category/product.servic';
import { ActivatedRoute } from '@angular/router';

interface ProductResponse {
  id: any;
  name: any;
  model: any;
  price: any;
  stock_quantity: any;
  description: any;
  discount: any;
  discount_price: any;
  status: any;
}

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent implements OnInit{
  // product: Product = new Product();
  ButtonSave: boolean = true;
  ButtonDelete: boolean = true;
  ButtonUpdate: boolean = true;
  productForm: FormGroup;
  id: any;
  
  constructor
  (private formBuilder: FormBuilder,
    private pS: ProductService,
     private route: ActivatedRoute
     ) {
      this.productForm = this.formBuilder.group({
      id: [''], 
      name: ['', Validators.required],  
      model: ['', Validators.required],
      price: ['', Validators.required],
      stock_quantity: ['', Validators.required],
      description: ['', Validators.required],
      discount: ['', Validators.required],
      discount_price: ['', Validators.required],
      status: [''],
  
    });
    this.productForm.valueChanges.subscribe(() => {
      const nameControl = this.productForm.controls['name'].invalid;
      const descriptionControl =
        this.productForm.controls['description'].invalid;
      this.ButtonSave = nameControl || descriptionControl;
      
    });
    this.productForm.valueChanges.subscribe(() => {
    this.ButtonDelete = this.productForm.controls['id'].invalid;
    });
    this.productForm.valueChanges.subscribe(() => {
    this.ButtonUpdate = this.productForm.invalid;
    });

  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.pS.getProductById(this.id).subscribe(
          (response: Object) => {
            this.productForm.patchValue(response as ProductResponse);
          },
          (error) => {
            console.log(error);
            // Xử lý lỗi, ví dụ hiển thị thông báo lỗi cho người dùng
          }
        );
      } else {
        // Xử lý trường hợp không tìm thấy `id`, ví dụ chuyển hướng người dùng đến trang khác hoặc hiển thị thông báo lỗi
      }
    });

    // selected status Active
    this.productForm.patchValue({
      status: 'AVAILABLE', // hoặc 'INACTIVE'
    });

  }
  fnAddProduct() {
    const productinfo = {
      name: this.productForm.value.name,
      model: this.productForm.value.model,
      price: this.productForm.value.price,
      stock_quantity: this.productForm.value.stock_quantity,
      description: this.productForm.value.description,
      discount: this.productForm.value.discount,
      discount_price: this.productForm.value.discount_price,
      status: this.productForm.value.status,
    };

    this.pS.createProduct(productinfo).subscribe(
      (response) => {
        console.log('Successfully Create product!');
        this.productForm.reset();
        alert('Successfully');
      },
      (error) => {
        console.error('Failed to Create product:', error);
      }
    );
  }

fnUpdateProduct() {
  const productinfo = {
    name: this.productForm.value.name,
      model: this.productForm.value.model,
      price: this.productForm.value.price,
      stock_quantity: this.productForm.value.stock_quantity,
      description: this.productForm.value.description,
      discount: this.productForm.value.discount,
      discount_price: this.productForm.value.discount_price,
      status: this.productForm.value.status,
  };

  this.pS.updateProduct(this.id, productinfo).subscribe(
    (response) => {
      console.log('Successfully updated poduct!');
      alert('Successfully updated product!');
    },
    (error) => {
      console.error('Failed to update product:', error);
    }
  );
}
 
}
