import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationCardComponent } from './Components/notification-card/notification-card.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent } from './Components/loader/loader.component';
import { TitleWordComponent } from './Components/title-word/title-word.component';
import { EditBookingComponent } from './Components/dialog-components/edit-booking/edit-booking.component';
import { UserInfoInputComponent } from './Components/dialog-components/user-info-input/user-info-input.component';
import { ConfirmationComponent } from './Components/dialog-components/confirmation/confirmation.component';
import { ViewBookingComponent } from './Components/dialog-components/view-booking/view-booking.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ColorDirective } from './Directives/color.directive';
import { BackgroundColorDirective } from './Directives/background-color.directive';
import { ImagefilterDirective } from './Directives/imagefilter.directive';

const components = [NotificationCardComponent, LoaderComponent, TitleWordComponent, EditBookingComponent, UserInfoInputComponent, ConfirmationComponent, ViewBookingComponent];
const modules = [
  MatDialogModule,
  DragDropModule,
  MatSlideToggleModule,
  MatInputModule,
  MatTableModule,
  MatTabsModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatTooltipModule,
  MatCardModule,
  MatGridListModule,
  FormsModule,
  ReactiveFormsModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatSliderModule,
  NgxMaterialTimepickerModule,
  MatRadioModule,
  MatCheckboxModule
];

const directives = [ColorDirective, BackgroundColorDirective, ImagefilterDirective];
@NgModule({
  declarations: [components, directives],
  imports: [
    CommonModule,
    LayoutModule,
    modules
  ],
  exports: [modules, components, directives]
})
export class SharedModule { }
