import { Component, OnInit} from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';

declare var require: any;
const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};
  data: any[] = []; // Mảng dữ liệu cho DataTables

  ngOnInit(): void {
    // Chuỗi JSON từ yêu cầu của bạn
    const jsonData = {
      "Id": "1",
      "Name": "Doe",
      "Description": "No Description",
      "Status": "No Available",
      "Title": "No Title"
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
        { title: 'Name', data: 'Name' },
        { title: 'Description', data: 'Description' },
        { title: 'Status', data: 'Status' },
        { title: 'Title', data: 'Title' }
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
