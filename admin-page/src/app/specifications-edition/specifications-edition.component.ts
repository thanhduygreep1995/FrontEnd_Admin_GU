import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecService } from '../service/specification/Spec.service';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ButtonService } from '../service/button/buttonservice';

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

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger mx-3',
    cancelButton: 'btn btn-success',
  },
  buttonsStyling: false,
  timer: 2000
})

@Component({
  selector: 'app-specifications-edition',
  templateUrl: './specifications-edition.component.html',
  styleUrls: ['./specifications-edition.component.css'],
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
export class SpecificationsEditionComponent implements OnInit {
  id: any;
  specForm: FormGroup;
  Specs: any;
  ButtonSave: boolean = true;
  ButtonDelete: boolean = true;
  ButtonUpdate: boolean = true;
  isSpinning: boolean = false;
  progressTimerOut: number = 1200;

  constructor(
    private formBuilder: FormBuilder,
    private ss: SpecService,
    private route: ActivatedRoute,
    private router: Router,
    public buttonService: ButtonService
  ) {
    this.specForm = this.formBuilder.group({
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
    this.isSpinning = true;
    this.ss.createSpec(Specinfo).subscribe(
      (response) => {
        console.log('Successfully Create Specification!');
        this.specForm.reset();
        setTimeout(() => {
          this.isSpinning = false;
          console.log('Successfully Create Specification!');
          this.router.navigate(['/specifications-table']);
          this.specForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Successfully Create Specification!',
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
    this.isSpinning = true;
    this.ss.updateSpec(this.id, Specinfo).subscribe(
      (response) => {
        console.log('Successfully updated specification!');
        setTimeout(() => {
          this.isSpinning = false;
          console.log('Successfully updated specification!');
          window.location.reload();
          this.specForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Successfully updated specification!',
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
        console.error('Failed to update specification:', error);
      }
    );
  }
}
