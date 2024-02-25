import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from '../map/map.component';
import { ReportLitterComponent } from '../report-litter/report-litter.component';
import { AuthInterceptor } from '../auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  {path:'map', component:MapComponent},
  {path: 'form', component: ReportLitterComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [RouterModule]
})
export class GuardRoutingModule { }
