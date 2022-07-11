import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardRoutingComponents, DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LabDetailsComponent } from './Components/lab-details/lab-details.component';
import { LabsContainerComponent } from './Components/labs-container/labs-container.component';

@NgModule({
  declarations: [dashboardRoutingComponents, LabDetailsComponent, LabsContainerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
