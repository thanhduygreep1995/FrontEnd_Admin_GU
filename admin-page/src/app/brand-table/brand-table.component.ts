import { Component, OnInit } from '@angular/core';
import { BrandService } from '../service/brand/brand.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

declare var require: any;
const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-brand-table',
  templateUrl: './brand-table.component.html',
  styleUrls: ['./brand-table.component.css'],
})
export class BrandTableComponent implements OnInit {
  brands: any;
  infoBrand: any;
  dtOptions: any = {};
  data: any[] = []; // Mảng dữ liệu cho DataTables

  constructor(
    private formBuilder: FormBuilder,
    private bS: BrandService,
    private router: Router
  ) {
    this.infoBrand = this.formBuilder.group({
      id: [''],
      name: [''],
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
            columns: ':not(:last-child)', // Ẩn cột cuối cùng
          },
        },
        {
          extend: 'print',
          exportOptions: {
            columns: ':not(:last-child)', // Ẩn cột cuối cùng
          },
        },
        {
          extend: 'excel',
          exportOptions: {
            columns: ':not(:last-child)', // Ẩn cột cuối cùng
          },
        },
        {
          extend: 'csvHtml5',
          exportOptions: {
            columns: ':not(:last-child)', // Ẩn cột cuối cùng
          },
        },
      ],
    };

    this.bS.getAllBrands().subscribe((data) => {
      console.log(data);
      this.brands = data;
    });
  }

  onUpdate(id: number): void {
    this.router.navigate(['/brand-edition', id]);
  }

  fnDeleteBrand(id: any) {
    this.bS.deleteBrand(id).subscribe(
      () => {
        console.log('Danh mục đã được xóa thành công');
        this.brands = []; // Xóa dữ liệu cũ
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
    this.bS.getAllBrands().subscribe(
      (newData) => {
        this.brands = newData;
        console.log('Dữ liệu mới đã được cập nhật:', this.brands);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu mới:', error);
      }
    );
  }
}
