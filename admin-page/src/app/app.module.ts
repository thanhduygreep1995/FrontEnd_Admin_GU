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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryTableComponent } from './category-table/category-table.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CategoryEditionModule } from './category-edition/category-edition.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    CategoryTableComponent,
    SpecificationsEditionComponent,
    SpecificationsTableComponent,
    OrderTableComponent,
    OrderDetailTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    HttpClientModule,
    CategoryEditionModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
