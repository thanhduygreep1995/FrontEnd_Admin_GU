import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';

declare var require: any;
const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})

export class OrderTableComponent implements OnInit{
 // Must be declared as "any", not as "DataTables.Settings"
 dtOptions: any = {};
 data: any[] = []; // Mảng dữ liệu cho DataTables

 ngOnInit(): void {
   // Chuỗi JSON từ yêu cầu của bạn
   const jsonData = {
     "Id": "John",
     "Email": "johndoe@example.com",
     "Phone Number": "123-456-7890",
     "Date Of Order": "1990-05-15",
     "Note": "Doe",
     "Status": "123-456-7890",
     "Payment Method": "1990-05-15",
     
     "Discount Price": "hashed_password_here",
     "Customer Id": "0",

   };

   // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
   const dataObject = JSON.parse(JSON.stringify(jsonData));

   // Thêm đối tượng vào mảng dữ liệu
   this.data.push(dataObject);

   // Cấu hình DataTables
   this.dtOptions = {
     data: this.data, // Sử dụng mảng dữ liệu cho DataTables
     columns: [
       { title: 'Id', data: 'Id' },
       { title: 'Email', data: 'Email' },
       { title: 'Phone Number', data: 'Phone Number' },
       { title: 'Date Of Order', data: 'Date Of Order' },
       { title: 'Note', data: 'Note' },
       { title: 'Status', data: 'Status' },
       { title: 'Payment Method', data: 'Payment Method' },
       { title: 'Discount Price', data: 'Discount Price' },
       { title: 'Customer Id', data: 'Customer Id' }
     ],
     dom: 'Bfrtip',
     buttons: [
       'columnsToggle',
       'colvis',
       'copy',
       'print',
       'excel',
       // {
       //   text: 'Some button',
       //   key: '1',
       //   action: function (e:any, dt:any, node:any, config:any) {
       //     alert('Button activated');
       //   }
       // }
     ]
   };
 }
}
