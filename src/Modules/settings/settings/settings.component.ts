import { Component, OnInit } from '@angular/core';
import { COLORMODES, OPTIONS } from 'src/Models/constants';
import { AppService } from 'src/Services/app-Service/app.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  colorModes = [
    {
      title: COLORMODES.ORIGINAL_COLOR_MODE,
      description: 'no simulation'
    },
    {
      title: COLORMODES.PROTANOPIA,
      description: 'No red',

    }, {
      title: COLORMODES.DEUTERANOPIA,
      description: 'No green',

    }, {
      title: COLORMODES.TRITANOPIA,
      description: 'No blue',

    }, {
      title: COLORMODES.ACHROMATOPSIA,
      description: 'No color',
    }];

  accessOptions = [{
    title: OPTIONS.ZOOM,
    description: 'Enable Zoom Slider',
    checked: false

  }];

  selectedColorMode = '';

  constructor(private appService: AppService) {
    this.selectedColorMode = this.appService.currentColorMode;
  }

  ngOnInit(): void {
    this.accessOptions.forEach(option => option.checked = this.appService.getOption(option.title))
  }

  onColorChange(color: string): void {
    this.selectedColorMode = color;
    this.appService.setColorMode(color);
  }

  onOptionSelect(checked: boolean, title: string) {
    this.appService.setOption(title, checked);
  }
}
