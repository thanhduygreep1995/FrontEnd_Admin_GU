import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../service/customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../service/role/role.service';

declare var require: any;
const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger mx-3',
    cancelButton: 'btn btn-success',
  },
  buttonsStyling: false,
  timer: 2000
});

interface orderdetailResponse {
  id: any;
  firstName: any;
  lastName : any;
  dateOfBirth: any;
  email: any;
  phoneNumber: any;
  createDate: any;
  status: any;
  role: any;
}
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 0 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      state('out', style({ opacity: 0 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })), // Ẩn khi khởi tạo
      transition('void => *', animate('300ms')), // Hiển thị trong 200ms khi được thêm vào DOM
    ]),
  ]
})
export class UserTableComponent implements OnInit {
  // Must be declared as "any", not as "DataTables.Settings"
  id: any;
  customers: any;
  roles:any;
  customerForm: any;
  dtOptions: any = {};
  data: any[] = []; // Mảng dữ liệu cho DataTables
  isSpinning: boolean = false;
  progressTimerOut: number = 1200;
  selectedOrderId!: number;
  constructor(
    private formBuilder: FormBuilder,
    private cS: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private rS: RoleService
  ) 
  {
    this.customerForm = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      email: [''],
      phoneNumber: [''],
      createDate: [''],
      status: [''],
      role: [''],
    });
  }

ngOnInit(): void {
  // Chuỗi JSON từ yêu cầu của bạn
  this.route.params.subscribe((params) => {
    if (params && params['id']) {
      this.id = params['id'];
      this.cS.getCustomerById(this.id).subscribe(
        (response: Object) => {
          this.customerForm.patchValue(response as orderdetailResponse);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
    }
  });

  this.defaultStatus();
  this.refreshTable();
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
        title: 'Admin - customers',
        exportOptions: {
          columns: ':not(:last-child)', // Ẩn cột cuối cùng
        },
      },
      {
        extend: 'print',
        title: 'Admin - customers',
        exportOptions: {
          columns: ':not(:last-child)', // Ẩn cột cuối cùng
        },
      },
      {
        extend: 'excel',
        title: 'Admin - customers',
        exportOptions: {
          columns: ':not(:last-child)', // Ẩn cột cuối cùng
        },
      },
      {
        extend: 'csvHtml5',
        title: 'Admin - customers',
        exportOptions: {
          columns: ':not(:last-child)', // Ẩn cột cuối cùng
        },
      },
    ],
  };
  this.cS.getCustomer().subscribe((data) => {
    console.log(data);
    this.customers = data.map((customer, index) =>({...customer, index: index + 1}));
  });
  this.rS.getRole().subscribe((data) => {
    this.roles = data;
  });
  
}


defaultStatus() {

}
onUpdate(id: number): void {
  this.selectedOrderId = id;
}

refreshTable() {
  // Gọi API hoặc thực hiện các thao tác khác để lấy lại dữ liệu mới
  this.cS.getCustomer().subscribe(
    (newData) => {
      this.customers = newData;
      console.log('Dữ liệu mới đã được cập nhật:', this.customers);
    },
    (error) => {
      console.error('Lỗi khi lấy dữ liệu mới:', error);
    }
  );
}
}
