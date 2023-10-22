import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryEditionComponent } from './category-edition.component';
const routes: Routes = [
  { path: 'category-edition', component: CategoryEditionComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  MatProgressSpinnerModule
],
  exports: [
    RouterModule,
    MatProgressSpinnerModule
  ]
})
export class CategoryEditionRoutingModule { }
