import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecificationService } from '../specification.service';

@Component({
  selector: 'app-specifications-edition',
  templateUrl: './specifications-edition.component.html',
  styleUrls: ['./specifications-edition.component.css']
})
export class SpecificationsEditionComponent {
  ButtonSave: boolean = true;
  ButtonDelete: boolean = true;
  SpecFrom: any;
  specForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private ss: SpecificationService) {
    this.specForm = this.formBuilder.group({
      processor: ['', Validators.required],
      graphicsCard: ['', Validators.required],
      ram: ['', Validators.required],
      storage: ['', Validators.required],
      display: ['', Validators.required],
      operatingSystem: ['', Validators.required],
      camera: ['', Validators.required],
      specification: this.formBuilder.group({
        id: [''],
        processor: [''],
        ram: [''],
        camera: ['']
      })
    });
  }
  onSubmit(){
    if (this.specForm.valid) {
      this.ss.saveSpec(this.specForm.value).subscribe(response => {
        console.log('Spec saved successfully:', response);
        // Xử lý response hoặc điều hướng người dùng sau khi lưu thành công.
      });

  }
}}
