import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import { CategoryService } from '../service/category/category.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

declare var require: any;
const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css'],
})
export class CategoryTableComponent implements OnInit {
  // Must be declared as "any", not as "DataTables.Settings"
  categories: any;
  infoCategory: any;
  dtOptions: any = {};
  data: any[] = []; // Mảng dữ liệu cho DataTables

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
        'copy',
        'print',
        'excel',
        {
          extend: 'csvHtml5',
          text: 'CSV',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7], // Chỉ định các cột bạn muốn xuất trong file CSV
          },
        },
      ],
    };

    this.cate.getAllCategories().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });
  }
  onUpdate(id: number): void {
    this.router.navigate(['/category-edition', id]);
  }

  fnDeleteCategory(id: any) {
    this.cate.deleteCategory(id).subscribe(
      () => {
        console.log('Danh mục đã được xóa thành công');
        this.categories = []; // Xóa dữ liệu cũ
        // Thực hiện các thao tác khác sau khi xóa thành công
        this.refreshTable(); // Làm mới bảng
      },
      (error) => {
        console.error('Đã xảy ra lỗi khi xóa danh mục:', error);
      }
    );
  }

  refreshTable() {
    // Gọi API hoặc thực hiện các thao tác khác để lấy lại dữ liệu mới
    this.cate.getAllCategories().subscribe(
      (newData) => {
        this.categories = newData;
        console.log('Dữ liệu mới đã được cập nhật:', this.categories);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu mới:', error);
      }
    );
  }
}
