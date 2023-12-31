import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterComponent } from './footer/footer.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductEditionComponent } from './product-edition/product-edition.component';
import { UserTableComponent } from './user-table/user-table.component';
import { CategoryEditionComponent } from './category-edition/category-edition.component';
import { SpecificationsEditionComponent } from './specifications-edition/specifications-edition.component';
import { SpecificationsTableComponent } from './specifications-table/specifications-table.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { OrderDetailTableComponent } from './order-detail-table/order-detail-table.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryTableComponent } from './category-table/category-table.component';
import { BrandEditionComponent } from './brand-edition/brand-edition.component';
import { BrandTableComponent } from './brand-table/brand-table.component';
import { OriginEditionComponent } from './origin-edition/origin-edition.component';
import { OriginTableComponent } from './origin-table/origin-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import { ButtonService } from './service/button/buttonservice';
import { IncomeReportComponent } from './income-report/income-report.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CustomerReportComponent } from './customer-report/customer-report.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    MainContentComponent,
    FooterComponent,
    ControlSidebarComponent,
    ProductTableComponent,
    ProductEditionComponent,
    UserTableComponent,
    CategoryEditionComponent,
    CategoryTableComponent,
    SpecificationsEditionComponent,
    SpecificationsTableComponent,
    OrderTableComponent,
    OrderDetailTableComponent,
    BrandEditionComponent,
    BrandTableComponent,
    OriginEditionComponent,
    OriginTableComponent,
    IncomeReportComponent,
    CustomerReportComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule, 
    MatInputModule,
    CommonModule
  ],
  providers: [ButtonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
