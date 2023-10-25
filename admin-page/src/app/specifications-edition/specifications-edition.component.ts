import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecService } from '../service/specification/Spec.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


interface SpecResponse {
  id: any;
  processor: any;
  graphicsCard: any;
  ram: any;
  storage: any;
  display: any;
  operatingSystem: any;
  camera: any;
}


@Component({
  selector: 'app-specifications-edition',
  templateUrl: './specifications-edition.component.html',
  styleUrls: ['./specifications-edition.component.css']
})
export class SpecificationsEditionComponent implements OnInit {
  id: any;
  specForm: FormGroup;

  ButtonSave: boolean = true;
  ButtonDelete: boolean = true;
  ButtonUpdate: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private ss: SpecService,
    private route: ActivatedRoute
  ) {
    this.specForm = this.formBuilder.group({
      id: ['', Validators.required],
      processor: ['', Validators.required],
      graphicsCard: ['', Validators.required],
      ram: ['', Validators.required],
      storage: ['', Validators.required],
      display: ['', Validators.required],
      operatingSystem: ['', Validators.required],
      camera: ['', Validators.required],
    });
    this.specForm.valueChanges.subscribe(() => {
      const nameControl = this.specForm.controls['processor'].invalid;
      const descriptionControl =
        this.specForm.controls['graphicsCard'].invalid;
      this.ButtonSave = nameControl || descriptionControl;
    });
    this.specForm.valueChanges.subscribe(() => {
      this.ButtonDelete = this.specForm.controls['id'].invalid;
    });
    this.specForm.valueChanges.subscribe(() => {
      this.ButtonUpdate = this.specForm.invalid;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.ss.getSpecById(this.id).subscribe(
          (response: Object) => {
            this.specForm.patchValue(response as SpecResponse);
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
  fnAddSpec() {
    const Specinfo = {
      processor: this.specForm.value.processor,
      graphicsCard: this.specForm.value.graphicsCard,
      ram: this.specForm.value.ram,
      storage: this.specForm.value.storage,
      display: this.specForm.value.display,
      operatingSystem: this.specForm.value.operatingSystem,
      camera: this.specForm.value.camera,
    };

    this.ss.createSpec(Specinfo).subscribe(
      (response) => {
        console.log('Successfully Create Specification!');
        this.specForm.reset();
        alert('Successfully');
      },
      (error) => {
        console.error('Failed to Create Specification:', error);
      }
    );
  }

  fnUpdateSpec() {
    const Specinfo = {
      processor: this.specForm.value.processor,
      graphicsCard: this.specForm.value.graphicsCard,
      ram: this.specForm.value.ram,
      storage: this.specForm.value.storage,
      display: this.specForm.value.display,
      operatingSystem: this.specForm.value.operatingSystem,
      camera: this.specForm.value.camera,
    };

    this.ss.updateSpec(this.id, Specinfo).subscribe(
      (response) => {
        console.log('Successfully updated specification!');
        alert('Successfully updated specification!');
      },
      (error) => {
        console.error('Failed to update specification:', error);
      }
    );
  }

  fnDeleteSpec() {
    var id = this.specForm.controls['id'].value;
    this.ss.deleteSpec(id).subscribe(
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
