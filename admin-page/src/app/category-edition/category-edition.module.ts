import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoryEditionRoutingModule } from './category-edition-routing.module';
import { CategoryEditionComponent } from './category-edition.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    CategoryEditionComponent
  ],
  imports: [
    CommonModule,
    CategoryEditionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ]
})
export class CategoryEditionModule { }
