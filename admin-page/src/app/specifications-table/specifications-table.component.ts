import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecificationService } from '../specification.service';


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
  specificationForm: any;
  specification:any;
  data: any[] = []; // Mảng dữ liệu cho DataTables
  constructor(private fb:FormBuilder, private cs:SpecificationService){
      this.specificationForm=this.fb.group({
        Process:[],
        graphicsCard: [],
        Ram:[],
        Storage: [],
        Display:[],
        OperatingsSystem:[],
        Camera:[]
      });

  }

  ngOnInit(): void {
  
      //call the getAllSpec
    this.cs.getAllSpecifications().subscribe((data)=>{
      this.specification=data;
      console.log(data);
    });




    
    // Chuỗi JSON từ yêu cầu của bạn
    // const jsonData = this.fb.group
    // // {
      
    //   // "Processor": "John",
    //   // "Graphics Card": "Doe",
    //   // "Ram": "123-45 6-7890",
    //   // "Storage": "1990-05-15",
    //   // "Display": "johndoe@example.com",
    //   // "Operating System": "hashed_password_here",
    //   // "Camera": "200mp",
    //   // "Product": "1"

  
    // };

    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
    // const dataObject = JSON.parse(JSON.stringify(jsonData));

    // // Thêm đối tượng vào mảng dữ liệu
    // this.data.push(dataObject);

    // // Cấu hình DataTables
    // this.dtOptions = {
    //   data: this.data, // Sử dụng mảng dữ liệu cho DataTables
    //   columns: [
    //     { title: 'Processor', data: 'Processor' },
    //     { title: 'Graphics Card', data: 'Graphics Card' },
    //     { title: 'Ram', data: 'Ram' },
    //     { title: 'Storage', data: 'Storage' },
    //     { title: 'Display', data: 'Display' },
    //     { title: 'Operating System', data: 'Operating System' },
    //     { title: 'Camera', data: 'Camera' },
    //     { title: 'Product', data: 'Product' }
    //   ],
    //   dom: 'Bfrtip',
    //   buttons: [
    //     // 'columnsToggle',
    //     // 'colvis',
    //     'copy',
    //     'print',
    //     'excel',
    //     // {
    //     //   text: 'Some button',
    //     //   key: '1',
    //     //   action: function (e:any, dt:any, node:any, config:any) {
    //     //     alert('Button activated');
    //     //   }
    //     // }
    //   ]
    // };

  }
  deleteSpec(id:any)
  {
    var id=this.specificationForm.controls.id.value;
    console.log(id);
    this.cs.deleteSpec(id).subscribe ((data)=> console.log(data));
  }
}
  