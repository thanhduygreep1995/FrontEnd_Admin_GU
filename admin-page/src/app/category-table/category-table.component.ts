import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import { CategoryService } from '../service/category/category.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { style, animate, trigger, state, transition } from '@angular/animations';

declare var require: any;
const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css'],
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
export class CategoryTableComponent implements OnInit {
  // Must be declared as "any", not as "DataTables.Settings"
  categories: any;
  infoCategory: any;
  dtOptions: any = {};
  data: any[] = []; // Mảng dữ liệu cho DataTables
  isSpinning: boolean = false;
  isSuccessDel: boolean = false;
  isFailureDel: boolean = false;
  progressTimerOut: number = 1200;
  messageTimerIn: number = 1500;
  messageTimerOut: number = 5000;
  deleteCategoryId: any;
  getCategoryName: any;

  constructor(
    private formBuilder: FormBuilder,
    private cate: CategoryService,
    private router: Router
  ) {
    this.infoCategory = this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: 'Bfrtip', // Hiển thị các nút: buttons, filter, length change, ... (Xem thêm tài liệu DataTables để biết thêm thông tin)
      buttons: [
        {
          extend: 'colvis',
          className: 'btn-primary',
          columns: ':not(:last-child)',
        },
        
        {
          extend: 'copy',
          exportOptions: {
            columns: ':not(:last-child)' // Ẩn cột cuối cùng
          }
        },
        {
          extend: 'print',
          exportOptions: {
            columns: ':not(:last-child)' // Ẩn cột cuối cùng
          }
        },
        {
          extend: 'excel',
          exportOptions: {
            columns: ':not(:last-child)' // Ẩn cột cuối cùng
          }
        },
        {
          extend: 'csvHtml5',
          exportOptions: {
            columns: ':not(:last-child)' // Ẩn cột cuối cùng
          }
        }
      ],
    };
    this.refreshTable();
  }
  onUpdate(id: number): void {
    this.router.navigate(['/category-edition', id]);
  }
  setDeleteCategoryId(id: any , name:any): void {
    this.deleteCategoryId = id;
    this.getCategoryName = name;
    console.log("setDeleteCategoryId" + this.deleteCategoryId);
  }
  fnDeleteCategory() {
    this.isSpinning = true;
    setTimeout(() => {
      this.isSuccessDel = true;
    }, this.messageTimerIn);
    this.cate.deleteCategory(this.deleteCategoryId).subscribe(
      () => {
        // Thực hiện các thao tác khác sau khi xóa thành công
        setTimeout(() => {
          this.isSpinning = false;
          // Xóa dữ liệu cũ
          this.categories = []; 
          // Làm mới bảng
          this.refreshTable();  
          console.log('Danh mục đã được xóa thành công');
        },this.progressTimerOut);

        setTimeout(() => {
          this.isSuccessDel = false;
        },this.messageTimerOut);  

      },
      (error) => {
        setTimeout(() => {
          this.isSpinning = false;
          console.log('Danh mục đã được xóa thành công');
        },this.progressTimerOut);

        setTimeout(() => {
          this.isFailureDel = true;
        }, this.messageTimerIn);
        console.error('Đã xảy ra lỗi khi xóa danh mục:', error);
      }
    );
    setTimeout(() => {
      this.isFailureDel = false;
    }, this.messageTimerOut);
  }

  refreshTable() {
    // Gọi API hoặc thực hiện các thao tác khác để lấy lại dữ liệu mới
    this.cate.getAllCategories().subscribe(
      (newData) => {
        this.categories = newData.map((category, index) => ({ ...category, index: ++index }));
        console.log('Dữ liệu mới đã được cập nhật:', this.categories);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu mới:', error);
      }
    );
  }
}
