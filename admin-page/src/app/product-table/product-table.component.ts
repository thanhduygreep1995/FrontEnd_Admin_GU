import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import { ProductService } from '../product.servic';
import { Product } from '../product';
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
    });
  }

  onUpdate(id: number): void {
    this.router.navigate(['/product-edition', id]);
  }
}
