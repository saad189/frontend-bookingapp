import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DatatableComponent } from './datatable/datatable.component';
import { SharedModule } from '../shared/shared.module';
import { instructorRoutingComponents, InstructorRoutingModule } from './instructor-routing.module';


@NgModule({
  declarations: [
    instructorRoutingComponents,
    DatatableComponent,
  ],
  imports: [
    CommonModule, SharedModule,
    InstructorRoutingModule
  ],
  providers: [DatePipe]
})
export class InstructorModule { }
