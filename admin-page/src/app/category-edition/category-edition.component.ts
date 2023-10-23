import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../service/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { style, animate, trigger, state, transition } from '@angular/animations';

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
  // categories: any;
  ButtonSave: boolean = true;
  ButtonUpdate: boolean = true;
  ButtonDelete: boolean = true;

  isSpinning: boolean = false;
  isSuccessIn: boolean = false;
  isSuccessUp: boolean = false;
  isSuccessDel: boolean = false;

  isFailureIn: boolean = false;
  isFailureUp: boolean = false;
  isFailureDel: boolean = false;
  
  progressTimerOut: number = 1200;
  messageTimerIn: number = 1500;
  messageTimerOut: number = 5000;

  constructor(
    private formBuilder: FormBuilder,
    private cate: CategoryService,
    private route: ActivatedRoute,
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
        setTimeout(() => this.isSuccessIn = true, this.messageTimerIn);
        setTimeout(() => {
          this.isSpinning = false;
          console.log('Successfully Create category!');
          this.infoCategory.reset();
          this.defaultComboBox();
        }, this.progressTimerOut);

        setTimeout(() => this.isSuccessIn = false,this.messageTimerOut)
        
      },
      (error) => {
        setTimeout(() => this.isSpinning = false, this.progressTimerOut);
        console.error('Failed to Create category:', error);
        setTimeout(() => this.isFailureIn = true, this.messageTimerIn);
        setTimeout(() => this.isFailureIn = false, this.messageTimerOut);
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
        setTimeout(() => this.isSuccessUp = true, this.messageTimerIn);

        setTimeout(() => {
          this.isSpinning = false;
          console.log('Successfully updated category!');
          this.infoCategory.reset();
          this.defaultComboBox();
        }, this.progressTimerOut);
        setTimeout(() => this.isSuccessUp = false,this.messageTimerOut);       
      },
      (error) => {
        setTimeout(() => this.isSpinning = false, this.progressTimerOut);     
        console.error('Failed to update category:', error);
        setTimeout(() => this.isFailureUp = true, this.messageTimerIn);

        setTimeout(() => this.isFailureUp = false, this.messageTimerOut);
      }
    );
  }

  defaultComboBox() {
    // selected status Active
    this.infoCategory.patchValue({
      status: 'ACTIVE', // hoặc 'INACTIVE'
    });
  }

  fnDeleteCategory() {
    var id = this.infoCategory.controls['id'].value;
    this.isSpinning = true;
    this.cate.deleteCategory(id).subscribe(
      () => {     
        setTimeout(() => this.isSuccessDel = true, this.messageTimerIn);

        setTimeout(() => {
          this.isSpinning = false;
          console.log('Danh mục đã được xóa thành công');
          this.infoCategory.reset();
          this.defaultComboBox();
        },this.progressTimerOut);

        setTimeout(() => this.isSuccessDel = false,this.messageTimerOut);  
      },
      (error) => {   
        setTimeout(() => this.isSpinning = false,this.progressTimerOut);

        setTimeout(() => this.isFailureDel = true, this.messageTimerIn);
        console.error('Đã xảy ra lỗi khi xóa danh mục:', error);

        setTimeout(() => this.isFailureDel = false, this.messageTimerOut);
      }
    );

  }

  onSubmit() {
    // Xử lý dữ liệu khi form được submit
  }
}
