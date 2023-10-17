import { Component, OnInit, ViewChild } from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import { SpecificationService } from '../specification.service';
import { DataTableDirective } from 'angular-datatables';
import { Spec } from '../specification';


declare var require: any;
// const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-specifications-table',
  templateUrl: './specifications-table.component.html',
  styleUrls: ['./specifications-table.component.css']
})

export class SpecificationsTableComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective ;
  sp: Spec[] = [];
  dtOptions: any = {};
  specification:any[] = [];
  constructor(private cs:SpecificationService){
  }
  deleteSpec(id: number) {
    this.cs.deleteSpec(id).subscribe(data => {
      this.getSpec(); 

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
    this.getSpec();  
  }
  private getSpec(){
         this.cs.getAllSpecifications().subscribe((data) => {
          this.specification = data;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Do something with dtInstance (for example, draw the table again)
      dtInstance.clear();
      dtInstance.rows.add(this.specification);
      dtInstance.draw();
    });
  });

  
}
}

