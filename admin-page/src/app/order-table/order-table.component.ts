import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { OrderService } from '../service/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer/customer.service';
import { ButtonService } from '../service/button/buttonservice';


const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger mx-3',
    cancelButton: 'btn btn-success',
  },
  buttonsStyling: false,
  timer: 2000
});

interface orderResponse {
  id: any;
  email: any;
  phone: any;
  orderDate: any;
  note: any;
  status: any;
  paymentMethod: any;
  discountPrice: any;
  customer_id: any;  
}
declare var require: any;
const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
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

export class OrderTableComponent implements OnInit {
  // Must be declared as "any", not as "DataTables.Settings"
  id: any;
  orders: any;
  orderForm: any;
  dtOptions: any = {};
  customer: any;
  data: any[] = []; // Mảng dữ liệu cho DataTables
  isSpinning: boolean = false;
  progressTimerOut: number = 1200;
  customers!: any[];
  selectedOrderId!: number;
  constructor(
    private formBuilder: FormBuilder,
    private oS: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private Cs: CustomerService,
    public buttonService: ButtonService
  ) 
  {
    this.orderForm = this.formBuilder.group({
      id: [''],
      email: [''],
      phone: [''],
      orderDate: [''],
      note: [''],
      status: [''],
      paymentMethod: [''],
      discountPrice: [''],
      customer: [''],
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.oS.getOrderById(this.id).subscribe(
          (response: Object) => {
            this.orderForm.patchValue(response as orderResponse);
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
          title: 'Admin - Order',
          exportOptions: {
            columns: ':not(:last-child)', // Ẩn cột cuối cùng
          },
        },
        {
          extend: 'print',
          title: 'Admin - Order',
          exportOptions: {
            columns: ':not(:last-child)', // Ẩn cột cuối cùng
          },
        },
        {
          extend: 'excel',
          title: 'Admin - Order',
          exportOptions: {
            columns: ':not(:last-child)', // Ẩn cột cuối cùng
          },
        },
        {
          extend: 'csvHtml5',
          title: 'Admin - Order',
          exportOptions: {
            columns: ':not(:last-child)', // Ẩn cột cuối cùng
          },
        },
      ],
    };

    this.oS.getOrder().subscribe((data) => {
      console.log(data);
      this.orders = data.map((order, index) =>({...order, index: index + 1}));
    });
    this.Cs.getCustomer().subscribe((data) => {
      this.customer = data;
    });
    
  }

  
  defaultStatus() {
    // selected status Active
    this.orderForm.patchValue({
      // status: {['PENDING'],['PROCESSING'],['DELIVERED'],['CANCELLED']}
    });
  }
  onUpdate(id: number): void {
    this.selectedOrderId = id;
  }

  refreshTable() {
    // Gọi API hoặc thực hiện các thao tác khác để lấy lại dữ liệu mới
    this.oS.getOrder().subscribe(
      (newData) => {
        this.orders = newData;
        console.log('Dữ liệu mới đã được cập nhật:', this.orders);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu mới:', error);
      }
    );
  }

  fnUpdateOrder() {
    if (this.selectedOrderId) { // Kiểm tra xem selectedOrderId có tồn tại
      const orderinfo = {
        status: this.orderForm.value.status
      };
      this.isSpinning = true;
      this.oS.updateOrderstatus(this.selectedOrderId, orderinfo).subscribe(
        (response) => {
          console.log('Successfully updated Order!');
          this.refreshTable(); // Tải lại dữ liệu sau khi cập nhật thành công
  
          setTimeout(() => {
            this.isSpinning = false;
            this.orderForm.reset();
            this.defaultStatus();
            Swal.fire({
              icon: 'success',
              title: 'Successfully updated Order!',
              showConfirmButton: false,
              timer: 2000
            })
          }, this.progressTimerOut)
        },
        (error) => {
          console.error('Failed to update Order:', error);
        }
      );
    } else {
      console.error('Không có id hợp lệ để cập nhật đơn hàng.');
    }
  }
  
  
}
