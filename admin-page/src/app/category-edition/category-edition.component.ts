import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEditionComponent {
  infoCategory: FormGroup;
  ButtonSave: boolean = true;
  ButtonDelete: boolean = true;

constructor(private formBuilder: FormBuilder) {
  this.infoCategory = this.formBuilder.group({
    categoryId: ['', Validators.required],
      categoryName: ['', Validators.required],
      categoryDescription: ['', Validators.required]
  });
  this.infoCategory.valueChanges.subscribe(() => {
    this.ButtonSave = this.infoCategory.invalid;
  });

  this.infoCategory.valueChanges.subscribe(() => {
    this.ButtonDelete = this.infoCategory.controls['categoryId'].invalid;
  });
}

  
  onSubmit() {
    // Xử lý dữ liệu khi form được submit
  }
}
