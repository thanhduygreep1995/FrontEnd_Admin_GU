import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-specifications-edition',
  templateUrl: './specifications-edition.component.html',
  styleUrls: ['./specifications-edition.component.css']
})
export class SpecificationsEditionComponent {
  infoSpecification: FormGroup;
  ButtonSave: boolean = true;
  ButtonDelete: boolean = true;
  
  constructor(private formBuilder: FormBuilder) {
    this.infoSpecification = this.formBuilder.group({
      Processor: ['',Validators.required],
      modelPrice: ['',Validators.required],
      Ram: ['',Validators.required],
      Storage: ['',Validators.required],
      Display: ['',Validators.required],
      operatingSystem: ['',Validators.required],
      Camera: ['',Validators.required],
      originId: ['',Validators.required]
    });
  this.infoSpecification.valueChanges.subscribe(()=> {
    this.ButtonSave = this.infoSpecification.invalid;
  });
  this.infoSpecification.valueChanges.subscribe(()=> {
    this.ButtonDelete = this.infoSpecification.controls['Processor'].invalid;
  });
  }
  onSubmit(){
  }
}
