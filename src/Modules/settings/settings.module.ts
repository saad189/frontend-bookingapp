import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { settingsRoutingComponents, SettingsRoutingModule } from './settings-routing.module';



@NgModule({
  declarations: [
    settingsRoutingComponents
  ],
  imports: [
    CommonModule, SharedModule, SettingsRoutingModule
  ]
})
export class SettingsModule { }
