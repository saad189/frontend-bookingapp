import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/Guards/auth/auth.guard';
import { MODULE_ADDRESS } from 'src/Models/modules';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { MainComponent } from './Components/main/main.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';


const routes: Routes = [
  { path: "", redirectTo: `/main`, pathMatch: "full" },
  { path: "main", component: MainComponent },
  {
    path: `${MODULE_ADDRESS.DASHBOARD}`,
    loadChildren: () =>
      import("../dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: `${MODULE_ADDRESS.INSTRUCTOR_PANEL}`, canActivate: [AuthGuard],
    loadChildren: () => import("../instructor/instructor.module").then(m => m.InstructorModule)
  },
  {
    path: `${MODULE_ADDRESS.SETTINGS}`,
    loadChildren: () =>
      import("../settings/settings.module").then(m => m.SettingsModule)
  },
  {
    path: `${MODULE_ADDRESS.ABOUT_US}`,
    component: AboutUsComponent
  },
  {
    path: `${MODULE_ADDRESS.AUTHENTICATION}`,
    loadChildren: () => import("../authentication/authentication.module").then(m => m.AuthenticationModule)
  },
  {
    path: `${MODULE_ADDRESS.BOOKING}`,
    loadChildren: () =>
      import("../booking/booking.module").then(m => m.BookingModule)
  },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
