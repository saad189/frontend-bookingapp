import { EventEmitter, Injectable } from '@angular/core';
import { Deficiency, simulate } from '@bjornlu/colorblind';
import { RGB } from '@bjornlu/colorblind/dist/types';
import { CookieService } from "ngx-cookie-service";
import { COLORMODES } from 'src/Models/constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  colorChange = new EventEmitter();
  optionChange = new EventEmitter<{ option: string, checked: boolean }>();
  get currentColorMode() {
    const colorMode = this.getFromCookie('colorMode');
    return colorMode ?? COLORMODES.ORIGINAL_COLOR_MODE;
  }

  constructor(private cookieService: CookieService) {
    console.log('StoredColor:', this.currentColorMode)
  }

  storeInCookie(key: string, data: any) {
    this.cookieService.set(key, JSON.stringify(data));
  }

  getFromCookie(key: string): any {
    let data = null;
    if (this.cookieService.check(key)) {
      try {
        data = JSON.parse(this.cookieService.get(key));
      } catch (e) { data = null }
    }

    return data;
  }


  setColorMode(colorMode: string): void {
    this.storeInCookie('colorMode', colorMode);
    this.colorChange.next('');
  }

  generateColorValues(color: string): RGB {
    let colors = color.split(/[ \(,\)]+/)
    return { r: Number(colors[1]), g: Number(colors[2]), b: Number(colors[3]) };
  }

  getSimulatedColor(color: string): string {
    const rgb = this.generateColorValues(color);

    const colorMode = this.currentColorMode;

    if (colorMode.length > 0 && colorMode != COLORMODES.ORIGINAL_COLOR_MODE) {
      const { r, g, b } = simulate({ r: rgb.r, g: rgb.g, b: rgb.b }, this.currentColorMode as Deficiency);
      return `rgb(${r},${g},${b})`;
    }

    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
  }

  setOption(key: string, checked: boolean) {
    this.storeInCookie(key, checked);
    this.optionChange.next({ option: key, checked });
  }

  getOption(key: string): boolean {
    return this.getFromCookie(key);
  }

}
