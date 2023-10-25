import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OriginService } from '../service/origin/origin.service';
import { Router } from '@angular/router';

declare var require: any;
const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-origin-table',
  templateUrl: './origin-table.component.html',
  styleUrls: ['./origin-table.component.css'],
})
export class OriginTableComponent implements OnInit {
  origins: any;
  infoOrigin: any;
  dtOptions: any = {};
  data: any[] = []; // Mảng dữ liệu cho DataTables

  constructor(
    private formBuilder: FormBuilder,
    private oS: OriginService,
    private router: Router
  ) {
    this.infoOrigin = this.formBuilder.group({
      id: [''],
      country: [''],
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

    this.oS.getAllOrigins().subscribe((data) => {
      console.log(data);
      this.origins = data;
    });
  }
  onUpdate(id: number): void {
    this.router.navigate(['/origin-edition', id]);
  }

  fnDeleteOrigin(id: any) {
    this.oS.deleteOrigin(id).subscribe(
      () => {
        console.log('Danh mục đã được xóa thành công');
        this.origins = []; // Xóa dữ liệu cũ
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
    this.oS.getAllOrigins().subscribe(
      (newData) => {
        this.origins = newData;
        console.log('Dữ liệu mới đã được cập nhật:', this.origins);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu mới:', error);
      }
    );
  }
}
