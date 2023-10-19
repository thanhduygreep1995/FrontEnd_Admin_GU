import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product/product.service';

interface ProductResponse {
  id: any;
  name: any;
  model: any;
  price: any;
  stockQuantity: any;
  description: any;
  discountPercentage: any;
  discountPrice: any;
  status: any;
}

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css'],
})
export class ProductEditionComponent implements OnInit {
  // product: Product = new Product();
  id: any;
  productForm: FormGroup;

  ButtonSave: boolean = true;
  ButtonDelete: boolean = true;
  ButtonUpdate: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private pS: ProductService,
    private route: ActivatedRoute
  ) {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      description: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      discountPrice: ['', Validators.required],
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
      stockQuantity: this.productForm.value.stockQuantity,
      description: this.productForm.value.description,
      discountPercentage: this.productForm.value.discountPercentage,
      discountPrice: this.productForm.value.name,
      status: this.productForm.value.name,
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
      stockQuantity: this.productForm.value.stockQuantity,
      description: this.productForm.value.description,
      discountPercentage: this.productForm.value.discountPercentage,
      discountPrice: this.productForm.value.name,
      status: this.productForm.value.name,
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
