import { trigger, state, style, transition, animate } from '@angular/animations';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OPTIONS } from 'src/Models/constants';
import { MODULE_ADDRESS, MODULE_NAMES } from 'src/Models/modules';
import { AppService } from 'src/Services/app-Service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({ transform: 'translateX(-100%)' })),
      state('false', style({ transform: 'translateX(0%)' })),
      transition('* => true', animate(500, style({ transform: 'translateX(-100%)' })))
    ])
  ],
})
export class AppComponent {
  title = 'bookingapp-frontend';
  colorMode = this.appService.currentColorMode;
  modulesAddress = MODULE_ADDRESS;
  moduleNames = MODULE_NAMES;

  env = environment;
  isLoading = false;
  isMainRoute = false;
  isOpen = false;
  appTitle = "Booking App"

  zoomEnabled = false;
  zoomValue = 1;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private appService: AppService) {
    this.appService.colorChange.subscribe(() => this.colorMode = this.appService.currentColorMode);
    this.appService.optionChange.subscribe(({ option, checked }) => {
      this.checkOptions(option, checked);
    });

    this.checkOptions(OPTIONS.ZOOM, this.appService.getOption(OPTIONS.ZOOM))
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        const paths = this.router.url.split("/").slice(1);
        this.isMainRoute = paths[0] === 'main';

        if (this.isMainRoute) {
          this.triggerRouteChange();
        } else {
          this.isOpen = false;
        }
      }
    });
  }

  triggerRouteChange() {
    setTimeout(() => {
      this.isOpen = true;
      setTimeout(() => {
        this.router.navigateByUrl(MODULE_ADDRESS.DASHBOARD);
      }, 500)
    }, 1500);
  }

  checkOptions(option: string, checked: boolean) {
    if (option === OPTIONS.ZOOM) {
      this.zoomEnabled = checked;
    }
  }
}
