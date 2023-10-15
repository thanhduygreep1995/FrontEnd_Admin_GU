import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { ProductEditionComponent } from './product-edition/product-edition.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { UserTableComponent } from './user-table/user-table.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryEditionComponent } from './category-edition/category-edition.component';
import { SpecificationsEditionComponent } from './specifications-edition/specifications-edition.component';
import { SpecificationsTableComponent } from './specifications-table/specifications-table.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { OrderDetailTableComponent } from './order-detail-table/order-detail-table.component';


const routes: Routes = [
  { path:'', component:OrderTableComponent},
  { path:'dashboard', component:MainContentComponent},
  { path:'product-edition', component:ProductEditionComponent},
  { path:'product-table', component:ProductTableComponent},
  { path:'user-table', component:UserTableComponent},
  { path:'category-table', component:CategoryTableComponent},
  { path:'category-edition', component:CategoryEditionComponent},
  { path:'specifications-edition', component:SpecificationsEditionComponent},
  { path:'specifications-table', component:SpecificationsTableComponent},
  { path:'orders-table', component:OrderTableComponent},
  { path:'orders-detail-table', component:OrderDetailTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
