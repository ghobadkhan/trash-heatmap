import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { ReportLitterComponent } from './report-litter/report-litter.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'map', component:MapComponent},
  {path: 'form', component: ReportLitterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
