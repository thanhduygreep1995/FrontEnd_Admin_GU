import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../service/brand/brand.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface BrandResponse {
  id: any;
  name: any;
}

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger mx-3',
    cancelButton: 'btn btn-success',
  },
  buttonsStyling: false,
})

@Component({
  selector: 'app-brand-edition',
  templateUrl: './brand-edition.component.html',
  styleUrls: ['./brand-edition.component.css'],
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
export class BrandEditionComponent implements OnInit {
  id: any;
  infoBrand: FormGroup;

  ButtonSave: boolean = true;
  ButtonUpdate: boolean = true;
  isSpinning: boolean = false;
  progressTimerOut: number = 1200;
  brands: any;

  constructor(
    private formBuilder: FormBuilder,
    private bS: BrandService,
    private route: ActivatedRoute
  ) {
    this.infoBrand = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
    this.infoBrand.valueChanges.subscribe(() => {
      this.ButtonSave = this.infoBrand.controls['name'].invalid;
    });
    this.infoBrand.valueChanges.subscribe(() => {
      this.ButtonUpdate = this.infoBrand.invalid;
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.bS.getBrandById(this.id).subscribe(
          (response: Object) => {
            this.infoBrand.patchValue(response as BrandResponse);
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
    this.refreshTable();
  }

  fnAddBrand() {
    const brandInfo = {
      name: this.infoBrand.value.name,
    };
    this.isSpinning = true;
    this.bS.createBrand(brandInfo).subscribe(
      (response) => {
        console.log('Successfully Create Brand!');  
        setTimeout(() => {
          this.isSpinning = false;
          console.log('Successfully Create Brand!');
          this.infoBrand.reset();
          Swal.fire({
            icon: 'success',
            title: 'Successfully Create Brand!',
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
        console.error('Failed to Create Brand:', error);
      }
    );
  }

  fnUpdateBrand() {
    const brandInfo = {
      name: this.infoBrand.value.name,
    };
    this.isSpinning = true;
    this.bS.updateBrand(this.id, brandInfo).subscribe(
      (response) => {
        console.log('Successfully updated Brand!');
        setTimeout(() => {
          this.isSpinning = false;
          console.log('Successfully updated brand!');
          this.infoBrand.reset();
          Swal.fire({
            icon: 'success',
            title: 'Successfully updated brand!',
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
        console.error('Failed to update Brand:', error);
      }
    );
  }

  fnDeleteBrand(id: any) {
    const brandToDelete = this.brands.find((brand: { id: any; }) => brand.id == id);
    this.isSpinning = true;
    if (brandToDelete) {
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
          this.bS.deleteBrand(id).subscribe(() => {
            console.log('Danh mục đã được xóa thành công');
            setTimeout(() => {
              this.isSpinning = false;
              console.log('Danh mục đã được xóa thành công');
              this.infoBrand.reset();
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
        text: 'Brand with the specified ID does not exist!',
        icon: 'error',
        confirmButtonColor: '#007BFF', // Màu khác bạn muốn sử dụng
        timer: 2000
      });
      setTimeout(() => this.isSpinning = false,this.progressTimerOut);
    } 
  }

  refreshTable() {
    // Gọi API hoặc thực hiện các thao tác khác để lấy lại dữ liệu mới
    this.bS.getAllBrands().subscribe(
      (newData) => {
        this.brands = newData;
        console.log('Dữ liệu mới đã được cập nhật:', this.brands);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu mới:', error);
      }
    );
  }
}
