import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../service/category/category.service';
import { ActivatedRoute } from '@angular/router';

interface CategoryResponse {
  id: any;
  name: any;
  description: any;
  status: any;
}
@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css'],
})
export class CategoryEditionComponent implements OnInit {
  id: any;
  infoCategory: FormGroup;
  // categories: any;
  ButtonSave: boolean = true;
  ButtonUpdate: boolean = true;
  ButtonDelete: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private cate: CategoryService,
    private route: ActivatedRoute
  ) {
    this.infoCategory = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: [''],
    });
    this.infoCategory.valueChanges.subscribe(() => {
      const nameControl = this.infoCategory.controls['name'].invalid;
      const descriptionControl =
        this.infoCategory.controls['description'].invalid;
      this.ButtonSave = nameControl || descriptionControl;
      // this.ButtonSave = this.infoCategory.invalid; validate thất cả
    });
    this.infoCategory.valueChanges.subscribe(() => {
      this.ButtonDelete = this.infoCategory.controls['id'].invalid;
    });
    this.infoCategory.valueChanges.subscribe(() => {
      this.ButtonUpdate = this.infoCategory.invalid;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.cate.getCategoryById(this.id).subscribe(
          (response: Object) => {
            this.infoCategory.patchValue(response as CategoryResponse);
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
    this.infoCategory.patchValue({
      status: 'ACTIVE', // hoặc 'INACTIVE'
    });
  }

  fnAddCategory() {
    const categoryInfo = {
      name: this.infoCategory.value.name,
      description: this.infoCategory.value.description,
      status: this.infoCategory.value.status,
    };

    this.cate.createCategory(categoryInfo).subscribe(
      (response) => {
        console.log('Successfully Create category!');
        this.infoCategory.reset();
        alert('Successfully');
      },
      (error) => {
        console.error('Failed to Create category:', error);
      }
    );
  }

  fnUpdateCategory() {
    const categoryInfo = {
      name: this.infoCategory.value.name,
      description: this.infoCategory.value.description,
      status: this.infoCategory.value.status,
    };

    this.cate.updateCategory(this.id, categoryInfo).subscribe(
      (response) => {
        console.log('Successfully updated category!');
        alert('Successfully updated category!');
      },
      (error) => {
        console.error('Failed to update category:', error);
      }
    );
  }

  fnDeleteCategory() {
    var id = this.infoCategory.controls['id'].value;
    this.cate.deleteCategory(id).subscribe(
      () => {
        console.log('Danh mục đã được xóa thành công');
        alert('Done');
      },
      (error) => {
        console.error('Đã xảy ra lỗi khi xóa danh mục:', error);
      }
    );
  }

      onSubmit() {
        // Xử lý dữ liệu khi form được submit
      }
}
