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
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};
  data: any[] = []; // Mảng dữ liệu cho DataTables

  ngOnInit(): void {
    // Chuỗi JSON từ yêu cầu của bạn
    const jsonData = {
      "First Name": "John",
      "Last Name": "Doe",
      "Phone Number": "123-456-7890",
      "Date Of Birth": "1990-05-15",
      "Email": "johndoe@example.com",
      "Password": "hashed_password_here",
      "Role": "admin",
      "Edit": ""
    };

    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
    const dataObject = JSON.parse(JSON.stringify(jsonData));

    // Thêm đối tượng vào mảng dữ liệu
    this.data.push(dataObject);

    // Cấu hình DataTables
    this.dtOptions = {
      data: this.data, // Sử dụng mảng dữ liệu cho DataTables
      columns: [
        { title: 'First Name', data: 'First Name' },
        { title: 'Last Name', data: 'Last Name' },
        { title: 'Phone Number', data: 'Phone Number' },
        { title: 'Date Of Birth', data: 'Date Of Birth' },
        { title: 'Email', data: 'Email' },
        { title: 'Password', data: 'Password' },
        { title: 'Role', data: 'Role' },
        { title: 'Edit', data: 'Edit' }
      ],
      dom: 'Bfrtip',
      buttons: [
        // 'columnsToggle',
        // 'colvis',
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
