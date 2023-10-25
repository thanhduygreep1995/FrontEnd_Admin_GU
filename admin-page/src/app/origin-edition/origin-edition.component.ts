import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OriginService } from '../service/origin/origin.service';
import { ActivatedRoute } from '@angular/router';

interface OriginResponse {
  id: any;
  country: any;
}
@Component({
  selector: 'app-origin-edition',
  templateUrl: './origin-edition.component.html',
  styleUrls: ['./origin-edition.component.css'],
})
export class OriginEditionComponent implements OnInit {
  id: any;
  infoOrigin: FormGroup;

  ButtonSave: boolean = true;
  ButtonUpdate: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private oS: OriginService,
    private route: ActivatedRoute
  ) {
    this.infoOrigin = this.formBuilder.group({
      id: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.infoOrigin.valueChanges.subscribe(() => {
      this.ButtonSave = this.infoOrigin.controls['country'].invalid;
    });
    this.infoOrigin.valueChanges.subscribe(() => {
      this.ButtonUpdate = this.infoOrigin.invalid;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.oS.getOriginById(this.id).subscribe(
          (response: Object) => {
            this.infoOrigin.patchValue(response as OriginResponse);
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

  fnAddOrigin() {
    const originInfo = {
      country: this.infoOrigin.value.country,
    };

    this.oS.createOrigin(originInfo).subscribe(
      (response) => {
        console.log('Successfully Create Origin!');
        this.infoOrigin.reset();
        alert('Successfully');
      },
      (error) => {
        console.error('Failed to Create Origin:', error);
      }
    );
  }

  fnUpdateOrigin() {
    const originInfo = {
      country: this.infoOrigin.value.country,
    };

    this.oS.updateOrigin(this.id, originInfo).subscribe(
      (response) => {
        console.log('Successfully updated Origin!');
        alert('Successfully updated Origin!');
      },
      (error) => {
        console.error('Failed to update Origin:', error);
      }
    );
  }
}
