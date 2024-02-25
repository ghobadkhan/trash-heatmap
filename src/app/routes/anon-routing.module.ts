import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { TestSocketComponent } from '../test-socket/test-socket.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'test-socket', component: TestSocketComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AnonRoutingModule { }
