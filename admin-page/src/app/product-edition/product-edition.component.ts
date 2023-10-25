import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product/product.service';
import { OriginService } from '../service/origin/origin.service';
import { BrandService } from '../service/brand/brand.service';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../service/category/category.service';

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
  brand_id: any;  
  category_id: any;  
  origin_id: any;  
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
  categories!: any[];
  Origin!: any[];
  brands!: any[];
  selectedBrandId!: any;
  selectedOriginId!: any;
  selectedCategoryId!: any;

  constructor(
    private formBuilder: FormBuilder,
    private pS: ProductService,
    private route: ActivatedRoute,
    private oS: OriginService,
    private bS: BrandService,
    private cS: CategoryService
    ) 
  {
    this.productForm = this.formBuilder.group({
      selectedBrand: [null, Validators.required], // Tên control phải khớp với formControlName trong template
      selectedOrigin    : [null, Validators.required],
      selectedCategory: [null, Validators.required], // Tên control phải khớp với formControlName trong template
      id: ['', Validators.required],
      name: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      description: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      discountPrice: ['', Validators.required],
      status: [''],
      category: this.formBuilder.group({
        id: ["", Validators.required],
      }),
      brand: this.formBuilder.group({
        id: ["", Validators.required],
      }),
      origin: this.formBuilder.group({
        id: ["", Validators.required],
      }),
  
      }) ,


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

  };
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
    this.oS.getAllOrigins().subscribe((data) => {
      this.Origin = data;
    });

    this.bS.getAllBrands().subscribe((data) => {
      this.brands = data;
    });
    this.cS.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
    // selected status Active
    this.productForm.patchValue({
      status: 'AVAILABLE', // hoặc 'INACTIVE'

    });
  }

  onBrandSelectionChange() {
    // Biến selectedBrandId sẽ giữ giá trị của tùy chọn được chọn
    console.log(this.selectedBrandId); // Hoặc làm bất kỳ xử lý nào bạn muốn ở đây
  }
  fnAddProduct() {
        const productinfo = {
          name: this.productForm.value.name,
          model: this.productForm.value.model,
          price: this.productForm.value.price,
          stockQuantity: this.productForm.value.stockQuantity,
          description: this.productForm.value.description,
          discountPercentage: this.productForm.value.discountPercentage,
          discountPrice: this.productForm.value.discountPrice,
          status: this.productForm.value.status,
          category: {
            id: this.selectedCategoryId,
          },
          brand: {
            id: this.selectedBrandId
          },
          origin: {
            id: this.selectedOriginId
          }
        };
  
        this.pS.createProduct(productinfo).subscribe(
          (response) => {
            console.log('Successfully Create Product!');
            this.productForm.reset();
            alert('Successfully');
          },
          (error) => {
            console.error('Failed to Create Product:', error);
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
          discountPrice: this.productForm.value.discountPrice,
          status: this.productForm.value.status,
          category_id: this.selectedCategoryId,
          brand_id:this.selectedBrandId,
          origin_id:this.selectedOriginId
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