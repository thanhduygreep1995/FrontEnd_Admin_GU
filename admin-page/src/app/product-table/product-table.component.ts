import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import { FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { ProductService } from '../service/product/product.service';

declare var require: any;
const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit {
  // Must be declared as "any", not as "DataTables.Settings"
  products: any;
  productForm: any;
  dtOptions: any = {};
  data: any[] = []; // Mảng dữ liệu cho DataTables

  constructor(
    private formBuilder: FormBuilder,
    private pS: ProductService,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      id: [''],
      name: [''],
      model: [''],
      price: [''],
      stockQuantity: [''],
      description: [''],
      discountPercentage: [''],
      discountPrice: [''],
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

    this.pS.getAllProduct().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
  onUpdate(id: number): void {
    this.router.navigate(['/product-edition', id]);
  }

  fnDeleteProduct(id: any) {
    this.pS.deleteProduct(id).subscribe(
      () => {
        console.log('Danh mục đã được xóa thành công');
        this.products = []; // Xóa dữ liệu cũ
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
    this.pS.getAllProduct().subscribe(
      (newData) => {
        this.products = newData;
        console.log('Dữ liệu mới đã được cập nhật:', this.products);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu mới:', error);
      }
    );
  }
}
