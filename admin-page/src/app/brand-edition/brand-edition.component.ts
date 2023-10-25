import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../service/brand/brand.service';
import { ActivatedRoute } from '@angular/router';

interface BrandResponse {
  id: any;
  name: any;
}
@Component({
  selector: 'app-brand-edition',
  templateUrl: './brand-edition.component.html',
  styleUrls: ['./brand-edition.component.css'],
})
export class BrandEditionComponent implements OnInit {
  id: any;
  infoBrand: FormGroup;

  ButtonSave: boolean = true;
  ButtonUpdate: boolean = true;

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
  }

  fnAddBrand() {
    const brandInfo = {
      name: this.infoBrand.value.name,
    };

    this.bS.createBrand(brandInfo).subscribe(
      (response) => {
        console.log('Successfully Create Brand!');
        this.infoBrand.reset();
        alert('Successfully');
      },
      (error) => {
        console.error('Failed to Create Brand:', error);
      }
    );
  }

  fnUpdateBrand() {
    const brandInfo = {
      name: this.infoBrand.value.name,
    };

    this.bS.updateBrand(this.id, brandInfo).subscribe(
      (response) => {
        console.log('Successfully updated Brand!');
        alert('Successfully updated Brand!');
      },
      (error) => {
        console.error('Failed to update Brand:', error);
      }
    );
  }

  fnDeleteBrand(id: any) {
    this.bS.deleteBrand(id).subscribe(
      () => {
        console.log('Danh mục đã được xóa thành công');
        alert('Done');
      },
      (error) => {
        console.error('Đã xảy ra lỗi khi xóa danh mục:', error);
      }
    );
  }
}
