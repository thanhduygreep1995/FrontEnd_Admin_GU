import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import { FormBuilder } from '@angular/forms';
import { SpecService } from '../service/specification/Spec.service';
import { Router } from '@angular/router';


declare var require: any;
const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-specifications-table',
  templateUrl: './specifications-table.component.html',
  styleUrls: ['./specifications-table.component.css']
})

export class SpecificationsTableComponent implements OnInit {
  specs: any;
  SpecForm: any;
  dtOptions: any = {};
  data: any[] = []; // Mảng dữ liệu cho DataTables

  constructor(
    private formBuilder: FormBuilder,
    private ss: SpecService,
    private router: Router
  ) {
    this.SpecForm = this.formBuilder.group({
      id: [''],
      processor: [''],
      graphicsCard: [''],
      ram: [''],
      storage: [''],
      display: [''],
      operatingSystem: [''],
      camera: [''],
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

    this.ss.getAllSpec().subscribe((data) => {
      console.log(data);
      this.specs = data;
    });
  }
  onUpdate(id: number): void {
    this.router.navigate(['/specifications-edition', id]);
  }

  fnDeleteProduct(id: any) {
    this.ss.deleteSpec(id).subscribe(
      () => {
        console.log('Danh mục đã được xóa thành công');
        this.specs = []; // Xóa dữ liệu cũ
        alert('Successfully Delete product!');
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
    this.ss.getAllSpec().subscribe(
      (newData) => {
        this.specs = newData;
        console.log('Dữ liệu mới đã được cập nhật:', this.specs);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu mới:', error);
      }
      );
    }
  }