import { Directive, HostBinding, Input, SimpleChanges } from '@angular/core';
import { hexToRgbString } from 'src/Helpers/Helpers';
import { AppService } from 'src/Services/app-Service/app.service';

@Directive({
  selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective {

  @Input() currentColor: string = '';
  constructor(private appService: AppService) {
    this.appService.colorChange.subscribe(() =>
      this.changeColor());
  }

  @HostBinding('style.background-color')
  newColor: string = '';


  ngOnChanges(changes: SimpleChanges): void {
    this.changeColor();
  }

  changeColor() {
    this.newColor = this.appService.getSimulatedColor(this.currentColor[0] == '#' ? hexToRgbString(this.currentColor) : this.currentColor);
  }


}
