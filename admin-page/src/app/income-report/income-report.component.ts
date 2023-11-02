import { ReportService } from './../service/report/report.service';
import { Component, OnInit, Renderer2, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import * as moment from 'moment';



declare var $: any;


@Component({
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrls: ['./income-report.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })), // Ẩn khi khởi tạo
      transition('void => *', animate('300ms')), // Hiển thị trong 200ms khi được thêm vào DOM
    ]),
  ]
})
export class IncomeReportComponent implements OnInit, OnChanges {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  IncomeReports: any[] = [];
  infoIncomeReport: any;
  dtOptions: any = {};
  isSpinning: boolean = false;
  progressTimerOut: number = 1200;
  fromDate: any;
  toDate: any;
  tfoot: any[] = [];
  

  constructor(private formBuilder: FormBuilder, 
    private report: ReportService,
    private el: ElementRef
    ) {
    this.infoIncomeReport = this.formBuilder.group({
      date: [''],
      orders: [''],
      revenue: ['']
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['from'] && changes['from'].currentValue || changes['to'] && changes['to'].currentValue) {
      // Tính lại tổng tiền khi IncomeReports thay đổi
      this.getTotalRevenue();
    }
  }

  ngOnInit(): void {
    this.report.getDefaultIncomeReport().subscribe(report => {
      console.log(report);
      this.IncomeReports = report;
    });
    
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
          text: 'Date',
          className: 'btn-default',
          action: (e: any, dt: any, node: any, config: any) => {
            Swal.fire({
              title: 'Pick a Date',
              html: `
              From<input type="date" id="from" class="swal2-input ml-4"><br>
              To<input type="date" id="to" class="swal2-input ml-5">
            `,
              showCancelButton: true,
              preConfirm: () => {
                const fromD = (document.getElementById('from') as HTMLInputElement).value;
                const toD= (document.getElementById('to') as HTMLInputElement).value;
                // Xử lý logic khi người dùng chọn ngày ở đây
    
                const inputFDate = new Date(fromD).toLocaleString('en-GB', 
                  { year: 'numeric', month: '2-digit',
                   day: '2-digit'});
                const inputTDate = new Date(toD).toLocaleString('en-GB', 
                  { year: 'numeric', month: '2-digit',
                   day: '2-digit'});
                const formattedFromDate = moment.default(inputFDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
                
                const formattedToDate = moment.default(inputTDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
                this.fromDate = formattedFromDate;
                this.toDate = formattedToDate;

                console.log('From Date:', this.fromDate);
                console.log('To Date:', this.toDate);
                // Chuyển đổi hàm API thành Observable
                this.getIncomeReportByDate();
              }
            });
          }
        },
        {
          text: 'Reset',
          className: 'btn-default',
          action: (e: any, dt: any, node: any, config: any) =>{
            this.report.getDefaultIncomeReport().subscribe(report => {
              console.log(report);
              this.IncomeReports = report;
            });
          }
        },
        {
          extend: 'copy',
          title: 'Admin - Income Report',
          footer: true,

        },
        {
          extend: 'print',
          title: 'Admin - Income Report',
          footer: true,
        }
        ,
        {
          extend: 'excel',
          title: 'Admin - Income Report',
          footer: true,
        },
        {
          extend: 'csvHtml5',
          title: 'Admin - Income Report',
          footer: true,
        },
      ],
      footerCallback: this.footerCallback.bind(this),
      
    };
    

  }
  getIncomeReportByDate(){
    this.report.getIncomeReportByDay(this.fromDate, this.toDate).subscribe(
      (report) => {
        console.log(report);
        this.IncomeReports = report;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getTotalRevenue(): any {
    let totalRevenue = 0;
    for (let b of this.IncomeReports) {
        totalRevenue += b.revenue;
    };
    return totalRevenue;
  }


  footerCallback(tfoot: Node, data: any[], start: number, end: number, display: any): void {
    // Tính tổng cột 'revenue'

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      const footerColumn = dtInstance.column(2);
      const footerNode = footerColumn.footer();
      
      // Loại bỏ lớp d-none
      footerNode.classList.remove('d-none');
      
      // Thiết lập giá trị colspan
      if (footerNode instanceof HTMLElement) {
        footerNode.setAttribute('colspan', '3');
      }
    
      // // Thiết lập nội dung cho footer
      footerNode.innerHTML = 'Total Revenue';     
    });

  }
}
