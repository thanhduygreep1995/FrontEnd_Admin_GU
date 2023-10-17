import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.servic';
import { Product } from '../product';
import { loadAsync } from 'jszip';
import { Router } from '@angular/router';
declare var require: any;
const jszip: any = require('jszip');
const pdfMake: any = require('pdfmake/build/pdfmake.js');
const pdfFonts: any = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})

export class ProductTableComponent implements OnInit{
  // @ViewChild('closebutton') closebutton;
  products: Product[] = [];

      constructor(private ps: ProductService, private router: Router){
      }

      
      
    // Must be declared as "any", not as "DataTables.Settings"
    // dtOptions: any = {};
    // productForm: any;
    // product: any;
    // data: any[] = []; // Mảng dữ liệu cho DataTables
    // constructor(private fb:FormBuilder, private cs:ProductService){
    //   this.productForm=this.fb.group({
    //     id:[],
    //     Name: [],
    //     Model:[],
    //     Price: [],
    //     stock_quantity:[],
    //     create_date:[],
    //     update_date:[],
    //     Description:[],
    //     Discount:[],
    //     discount_price:[],
    //     status:[]
    //   });

    // }
  ngOnInit(): void {
  this.getProduct();
  
  }
  private getProduct(){
    this.ps.getProductList().subscribe(data => {
      this.products = data;
      
    });
  }
  deleteProduct(id: number) {
    this.ps.deleteProduct(id).subscribe(data => {
      this.getProduct(); 
      this.router.navigate(['/']);
      // Sau khi xóa sản phẩm và nhận kết quả từ server, hãy tải lại trang
      // hoặc window.location = window.location;
    });
  }
  public onSave() {
    // this.closebutton.nativeElement.click();
  }

  // this.products =[{
  //   "id":12,
  //   "name": "John",
  //   "Model": "Doe02",
  //   "price": 253,
  //   "stock_quantity":12,
  //   "create_date": "1990-05-15",
  //   "update_date": "1990-05-15",
  //   "Description": "hashed_password_here",
  //   "Discount": 12,
  //   "discount_price": "50",
  //   "status": "active"
  // }];

  //   this.cs.getAllProduct().subscribe((data)=>{
  //     this.product=data;
  //     console.log(data);
  //   });
  // Chuỗi JSON từ yêu cầu của bạn
  // const jsonData = {
  //   "Name": "John",
  //   "Model": "Doe02",
  //   "Price": "2533",
  //   "Create Date": "1990-05-15",
  //   "Update Date": "1990-05-15",
  //   "Description": "hashed_password_here",
  //   "Discount": "admin",
  //   "Discount Price": "50",
  //   "Status": "active",
  //   "Category Id": "1",
  //   "Brand Id": "1",
  //   "Origin Id": "1"
  // };

  // // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
  // const dataObject = JSON.parse(JSON.stringify(jsonData));

  // // Thêm đối tượng vào mảng dữ liệu
  // this.data.push(dataObject);

  // // Cấu hình DataTables
  // this.dtOptions = {
  //   data: this.data, // Sử dụng mảng dữ liệu cho DataTables
  //   columns: [
  //     { title: 'Name', data: 'Name' },
  //     { title: 'Model', data: 'Model' },
  //     { title: 'Price', data: 'Price' },
  //     { title: 'Create Date', data: 'Create Date' },
  //     { title: 'Update Date', data: 'Update Date' },
  //     { title: 'Description', data: 'Description' },
  //     { title: 'Discount', data: 'Discount' },
  //     { title: 'Discount Price', data: 'Discount Price' },
  //     { title: 'Status', data: 'Status' },
  //     { title: 'Catogory Id', data: 'Category Id' },
  //     { title: 'Brand Id', data: 'Brand Id' },
  //     { title: 'Origin Id', data: 'Origin Id' },
  //   ],
  //   dom: 'Bfrtip',
  //   buttons: [
  //     // 'columnsToggle',
  //     // 'colvis',
  //     'copy',
  //     'print',
  //     'excel',
      // {
      //   text: 'Some button',
      //   key: '1',
      //   action: function (e:any, dt:any, node:any, config:any) {
      //     alert('Button activated');
      //   }
      // }
    // ]
  }
