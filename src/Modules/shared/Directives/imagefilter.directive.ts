import { Directive, HostBinding, Input, SimpleChanges } from '@angular/core';
import { COLORMODES } from 'src/Models/constants';
import { AppService } from 'src/Services/app-Service/app.service';

@Directive({
  selector: '[appImagefilter]'
})
export class ImagefilterDirective {

  hueModes = [
    {
      title: COLORMODES.ORIGINAL_COLOR_MODE,
      value: 'hue-rotate(0deg)'
    },
    {
      title: COLORMODES.PROTANOPIA,
      value: 'hue-rotate(45deg)'
    },
    {
      title: COLORMODES.DEUTERANOPIA,
      value: 'hue-rotate(150deg)'
    },
    {
      title: COLORMODES.TRITANOPIA,
      value: 'hue-rotate(300deg)'
    },
    {
      title: COLORMODES.ACHROMATOPSIA,
      value: 'grayscale(1)'
    },
  ]

  constructor(private appService: AppService) {
    this.changeFilter();
    this.appService.colorChange.subscribe(() =>
      this.changeFilter());
  }

  @HostBinding('style.filter')
  filterBinding: string = '';


  ngOnChanges(changes: SimpleChanges): void {
    this.changeFilter();
  }

  changeFilter() {
    this.filterBinding = this.hueModes.find(mode => mode.title === this.appService.currentColorMode)?.value as string + ` sepia(50%)`;
  }


}
