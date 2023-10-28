import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../service/category/category.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';


const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger mx-3',
    cancelButton: 'btn btn-success',
  },
  buttonsStyling: false,
})

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
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 0 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      state('out', style({ opacity: 0 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })), // Ẩn khi khởi tạo
      transition('void => *', animate('300ms')), // Hiển thị trong 200ms khi được thêm vào DOM
    ]),
  ]
})
export class CategoryEditionComponent implements OnInit {
  id: any;
  infoCategory: FormGroup;
  ButtonSave: boolean = true;
  ButtonUpdate: boolean = true;
  ButtonDelete: boolean = true;
  categories: any;
  isSpinning: boolean = false;
  progressTimerOut: number = 1200;

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
    this.defaultComboBox();
    this.refreshTable();
  }

  defaultComboBox(){
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
    this.isSpinning = true;
    this.cate.createCategory(categoryInfo).subscribe(
      (response) => {

        setTimeout(() => {
          this.isSpinning = false;
          console.log('Successfully Create category!');
          this.infoCategory.reset();
          this.defaultComboBox();
          Swal.fire({
            icon: 'success',
            title: 'Successfully Create category!',
            showConfirmButton: false,
            timer: 2000
          })
        }, this.progressTimerOut);

      },
      (error) => {

        setTimeout(() => {
          this.isSpinning = false;
          Swal.fire({
            icon: 'error',
            title: 'Your work has not been saved',
            showConfirmButton: false,
            timer: 2000
          })
        }, this.progressTimerOut);
      }
    );
  }

  fnUpdateCategory() {
    const categoryInfo = {
      name: this.infoCategory.value.name,
      description: this.infoCategory.value.description,
      status: this.infoCategory.value.status,
    };
    this.isSpinning = true;
    this.cate.updateCategory(this.id, categoryInfo).subscribe(
      (response) => {

        setTimeout(() => {
          this.isSpinning = false;
          console.log('Successfully updated category!');
          this.infoCategory.reset();
          this.defaultComboBox();
          Swal.fire({
            icon: 'success',
            title: 'Successfully updated category!',
            showConfirmButton: false,
            timer: 2000
          })
        }, this.progressTimerOut);
      },
      (error) => {
        setTimeout(() => {
          this.isSpinning = false;
          Swal.fire({
            icon: 'error',
            title: 'Your work has not been updated',
            showConfirmButton: false,
            timer: 2000
          });
        }, this.progressTimerOut);
      }
    );
  }

  fnDeleteCategory() {
    var id = this.infoCategory.controls['id'].value
    const categoryToDelete = this.categories.find((category: { id: any; }) => category.id == id);
    this.isSpinning = true;
    if (categoryToDelete) {
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          // Gửi yêu cầu xóa đến backend
          this.cate.deleteCategory(id).subscribe(() => {
            console.log('Danh mục đã được xóa thành công');
            setTimeout(() => {
              this.isSpinning = false;
              console.log('Danh mục đã được xóa thành công');
              this.infoCategory.reset();
              this.defaultComboBox();
              this.refreshTable();
              Swal.fire({
                title: 'Deleted!',
                text: 'Your data has been deleted.',
                icon: 'success',
                confirmButtonColor: '#007BFF', // Màu khác bạn muốn sử dụng
                timer: 2000
              })
            },this.progressTimerOut);
          }, (error) => {
            this.isSpinning = false;
            Swal.fire({
              title: 'Error',
              text: 'Something went wrong. Please try again!',
              icon: 'error',
              confirmButtonColor: '#007BFF', // Màu khác bạn muốn sử dụng
              timer: 2000
            });
            console.error('Đã xảy ra lỗi khi xóa danh mục:', error);
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {

          setTimeout(() => {
            this.isSpinning = false;
            Swal.fire({
              title: 'Cancelled!',
              text: 'Your data is safe :)',
              icon: 'success',
              confirmButtonColor: '#007BFF', // Màu khác bạn muốn sử dụng
              timer: 2000
            });
          },this.progressTimerOut);
        }
      });
    } else {
      // Hiển thị thông báo lỗi khi id không tồn tại trong danh sách
      this.isSpinning = false;
      Swal.fire({
        title: 'Error',
        text: 'Category with the specified ID does not exist!',
        icon: 'error',
        confirmButtonColor: '#007BFF', // Màu khác bạn muốn sử dụng
        timer: 2000
      });
      setTimeout(() => this.isSpinning = false,this.progressTimerOut);
    } 
  }
  refreshTable() {
      // Gọi API hoặc thực hiện các thao tác khác để lấy lại dữ liệu mới
    this.cate.getAllCategories().subscribe(
      (newData) => {
        this.categories = newData;
        console.log('Dữ liệu mới đã được cập nhật:', this.categories);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu mới:', error);
      }
    );
  }
      onSubmit() {
        // Xử lý dữ liệu khi form được submit
      }
}
